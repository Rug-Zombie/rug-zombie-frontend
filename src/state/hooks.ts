import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { orderBy } from 'lodash'
import { getAddress } from 'utils/addressHelpers'
import axios from 'axios'
import { State } from './types'
import { getContract, getPancakePair } from '../utils/contractHelpers'
import pancakeFactoryAbi from '../config/abi/pancakeFactoryAbi.json'
import tokens from '../config/constants/tokens'
import contracts from '../config/constants/contracts'
import { getId } from '../utils'

export const getBnbPriceinBusd = () => {
  return axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BNBBUSD')
}

export const fetchZmbeBnbAddress = (): Promise<string> => {
  return getContract(pancakeFactoryAbi, getAddress(contracts.pancakeFactory)).methods.getPair(getAddress(tokens.zmbe.address), getAddress(tokens.wbnb.address)).call()
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

export const useGetGraveByPid = (pid: number) => {
  return useGetGraves().data.find(g => getId(g.pid) === pid)
}

export const useGetTombs = () => {
  return useSelector((state: State) => state.tombs)
}

export const useGetSpawningPools = () => {
  return useSelector((state: State) => state.spawningPools)
}

export const useGetUserActivities = () => {
  return useSelector((state: State) => state.userActivity)
}



export {
  useGetNfts,
  useGetNftById,
  useGetNftTotalSupply,
} from './nfts/hooks'
