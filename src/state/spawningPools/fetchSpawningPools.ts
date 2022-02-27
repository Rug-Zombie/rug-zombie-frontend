import BigNumber from 'bignumber.js'
import { BigNumber as EthersBigNumber } from 'ethers'

import { chunk } from 'lodash'
import bep20Abi from 'config/abi/erc20.json'
import spawningPool from 'config/abi/spawningPool.json'
import pancakePair from 'config/abi/pancakePairAbi.json'
import pancakeFactoryAbi from 'config/abi/pancakeFactoryAbi.json'
import multicall from 'utils/multicall'
import {
  getAddress,
  getApeswapFactoryAddress,
  getPancakeFactoryAddress,
  getWbnbAddress,
  getZombieAddress,
} from 'utils/addressHelpers'
import { Dex, SpawningPoolConfig } from 'config/constants/types'
import { equalAddresses } from '../../utils'
import { getBalanceAmount } from '../../utils/formatBalance'

interface Stats {
  rewardPerBlock: number
  unlockFee: number
  minimumStake: number
  minimumStakingTime: number
  nftMintTime: number
}

interface LpInfo {
  reserves: EthersBigNumber[]
  token0: string
}

const getRouterAddress = (dex: Dex): string => {
  switch (dex) {
    case Dex.PCS_V2:
      return getPancakeFactoryAddress()
    case Dex.APESWAP:
      return getApeswapFactoryAddress()
    default:
      return getPancakeFactoryAddress()
  }
}

const getStats = async (spawningPoolAddresses: string[]): Promise<Stats[]> => {
  const calls = spawningPoolAddresses.flatMap((address) =>
    ['rewardPerBlock', 'unlockFeeInBnb', 'minimumStake', 'minimumStakingTime', 'nftRevivalTime'].map((method) => ({
      address,
      name: method,
      params: [],
    })),
  )

  const results: number[] = await multicall(spawningPool, calls)
  return chunk(results, 5).map(
    ([rewardPerBlock, unlockFeeInBnb, minimumStake, minimumStakingTime, nftIntervalTime]) => ({
      rewardPerBlock,
      unlockFee: unlockFeeInBnb,
      minimumStake,
      minimumStakingTime,
      nftMintTime: nftIntervalTime,
    }),
  )
}

const getLpAddresses = async (spawningPoolConfigs: SpawningPoolConfig[]): Promise<string[]> => {
  const wbnbAddress = getWbnbAddress()
  const calls = spawningPoolConfigs.map(({ dex, rewardToken }) => ({
    address: getRouterAddress(dex),
    name: 'getPair',
    params: [wbnbAddress, getAddress(rewardToken.address)],
  }))

  const rawLpAddresses = await multicall(pancakeFactoryAbi, calls)
  return rawLpAddresses.map(([address]) => address)
}

const getLpInfo = async (lpAddresses: string[]): Promise<LpInfo[]> => {
  const lpReserveCalls = lpAddresses.flatMap((address) => [
    { address, name: 'getReserves' },
    { address, name: 'token0' },
  ])

  const rawResults: [[EthersBigNumber, EthersBigNumber] | [string]][] = await multicall(pancakePair, lpReserveCalls)
  const chunks: [[EthersBigNumber, EthersBigNumber], [string]][] = chunk(rawResults, 2) as any[]

  return chunks.map(([reserves, [token0]]) => ({ reserves, token0 }))
}

const getTotalAmounts = (spawningPoolAddresses: string[]): Promise<number[]> => {
  const zombieAddress = getZombieAddress()
  const calls = spawningPoolAddresses.map((address) => ({
    address: zombieAddress,
    name: 'balanceOf',
    params: [address],
  }))

  return multicall(bep20Abi, calls)
}

const fetchSpawningPools = async (spawningPoolsToFetch: SpawningPoolConfig[]) => {
  const spawningPoolAddresses = spawningPoolsToFetch.map(({ address }) => getAddress(address))

  const [stats, lpAddresses, totalAmounts] = await Promise.all([
    getStats(spawningPoolAddresses),
    getLpAddresses(spawningPoolsToFetch),
    getTotalAmounts(spawningPoolAddresses),
  ])

  const lpReserves = await getLpInfo(lpAddresses)

  return spawningPoolsToFetch.map((spawningPoolConfig, i) => {
    const { rewardPerBlock, unlockFee, minimumStake, minimumStakingTime, nftMintTime } = stats[i]
    const totalAmount = totalAmounts[i]
    const { reserves, token0 } = lpReserves[i]

    const wbnbAddress = getWbnbAddress()
    const bnbReserve = reserves[equalAddresses(token0, wbnbAddress) ? 0 : 1]
    const rewardTokenReserve = reserves[equalAddresses(token0, wbnbAddress) ? 1 : 0]
    const rewardTokenPriceBnb = getBalanceAmount(new BigNumber(bnbReserve._hex)).div(
      getBalanceAmount(new BigNumber(rewardTokenReserve._hex), spawningPoolConfig.rewardToken.decimals),
    )
    return {
      ...spawningPoolConfig,
      poolInfo: {
        rewardPerBlock: new BigNumber(rewardPerBlock),
        unlockFee: new BigNumber(unlockFee),
        minimumStake: new BigNumber(minimumStake),
        withdrawCooldown: new BigNumber(minimumStakingTime),
        nftMintTime: new BigNumber(nftMintTime),
        totalAmount: new BigNumber(totalAmount),
        rewardTokenPriceBnb,
      },
    }
  })
}

export default fetchSpawningPools
