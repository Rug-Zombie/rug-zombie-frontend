import { createSelector } from '@reduxjs/toolkit'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { getAddress } from 'utils/addressHelpers'
import pancakeFactoryAbi from '../config/abi/pancakeFactoryAbi.json'
import contracts from '../config/constants/contracts'
import tokens from '../config/constants/tokens'
import { getId } from '../utils'
import { getContract, getPancakePair } from '../utils/contractHelpers'
import { now } from '../utils/timerHelpers'
import { State } from './types'

export const getBnbPriceinBusd = () => {
  return axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BNBBUSD')
}

export const fetchZmbeBnbAddress = (): Promise<string> => {
  return getContract(pancakeFactoryAbi, getAddress(contracts.pancakeFactory))
    .methods.getPair(getAddress(tokens.zmbe.address), getAddress(tokens.wbnb.address))
    .call()
}

export const fetchLpReserves = (address): Promise<any> => {
  return getPancakePair(address).methods.getReserves().call()
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}

export const useGetGraves = () => {
  return useSelector((state: State) => state.graves)
}

export const useGetFilteredGraves = (filter: string[]) => {
  return useSelector((state: State) => selectFilteredGraves(state, filter))
}

const selectFilteredGraves = createSelector(
  (state: State) => state.graves,
  (state: State) => state.nfts,
  (state: State, filter: string[]) => filter,
  (graves, nfts, filter) => {
    // search parameters
    if (filter[0] !== '') {
      return graves.data.filter(({ name, rug: { symbol }, nftId }) => {
        const searchString = filter[0].toLowerCase()
        const hasNameMatch = name.toLowerCase().includes(searchString)
        const hasSymbolMatch = symbol.toLowerCase().includes(searchString)
        const hasNftNameMatch = nfts.data
          .find((n) => n.id === nftId)
          .name.toLowerCase()
          .includes(searchString)

        return hasNameMatch || hasSymbolMatch || hasNftNameMatch
      })
    }

    // filter parameters
    switch (filter[1]) {
      case 'All graves':
      case 'All types':
        return graves.data.filter((g) => !g.isRetired && g.poolInfo.allocPoint.gt(0) && (!g.endDate || g.endDate > now()))
      case 'Staked':
        return graves.data.filter((g) => g.userInfo.amount.gt(0))
      case 'NFT-only':
        return graves.data.filter((g) => !g.isRetired && g.poolInfo.allocPoint.isZero() && !g.isRetired && (!g.endDate || g.endDate > now()))
      case 'Retired':
        return graves.data.filter((g) => g.isRetired || now() > g.endDate)
      case 'Legendary':
        return graves.data.filter((g) => nfts.data.find((n) => n.id === g.nftId).rarity === 'Legendary' && !g.isRetired && (!g.endDate || g.endDate > now()))
      case 'Rare':
        return graves.data.filter((g) => nfts.data.find((n) => n.id === g.nftId).rarity === 'Rare' && !g.isRetired && (!g.endDate || g.endDate > now()))
      case 'Uncommon':
        return graves.data.filter((g) => nfts.data.find((n) => n.id === g.nftId).rarity === 'Uncommon' && !g.isRetired && (!g.endDate || g.endDate > now()))
      case 'Common':
        return graves.data.filter((g) => nfts.data.find((n) => n.id === g.nftId).rarity === 'Common' && !g.isRetired && (!g.endDate || g.endDate > now()))
      default:
        return graves.data
    }
  },
)

export const useGetGraveByPid = (pid: number) => {
  return useGetGraves().data.find((g) => getId(g.pid) === pid)
}

export const useGetSpawningPools = () => {
  return useSelector((state: State) => state.spawningPools)
}

export const useGetFilteredSpawningPools = (filter: string[]) => {
  return useSelector((state: State) => selectFilteredSpawningPools(state, filter))
}

const selectFilteredSpawningPools = createSelector(
  (state: State) => state.spawningPools,
  (state: State) => state.nfts,
  (state: State, filter: string[]) => filter,
  (spawningPools, nfts, filter) => {
    // search parameters
    if (filter[0] !== '') {
      return spawningPools.data.filter(({ name, rewardToken: { symbol }, nftId }) => {
        const searchString = filter[0].toLowerCase()
        const hasNameMatch = name.toLowerCase().includes(searchString)
        const hasSymbolMatch = symbol.toLowerCase().includes(searchString)
        const hasNftNameMatch = nfts.data
          .find((n) => n.id === nftId)
          .name.toLowerCase()
          .includes(searchString)

        return hasNameMatch || hasSymbolMatch || hasNftNameMatch
      })
    }

    // filter parameters
    switch (filter[1]) {
      case 'All Pools':
        return spawningPools.data.filter((sp) => sp.endDate > now())
      case 'Staked':
        return spawningPools.data.filter((sp) => sp.userInfo.amount.gt(0))
      case 'Ended':
        return spawningPools.data.filter((sp) => sp.endDate <= now())
      default:
        return spawningPools.data.filter((sp) => sp.endDate > now())
    }
  },
)

export const useGetUserActivities = () => {
  return useSelector((state: State) => state.userActivity)
}

export { useGetZombiePriceUsd, useGetBnbPriceUsd } from './prices/hooks'
export { useGetNfts, useGetNftById, useGetNftTotalSupply } from './nfts/hooks'
export {
  useGetTombs,
  useGetTombByPid,
  useGetZombieBnbTomb,
  useGetZombieBnbLpPriceBnb,
  useGetZombiePerZombieBnbLp,
  useGetTombsTvlBnb,
  useGetTombsTvlUsd,
  useGetUserStakedTombs,
} from './tombs/hooks'
