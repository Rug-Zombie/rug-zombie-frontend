import BigNumber from 'bignumber.js'
import { BigNumber as EthersBigNumber } from 'ethers'
import { chunk, zipWith } from 'lodash'

import drFrankenstein from 'config/abi/drFrankenstein.json'
import lpPair from 'config/abi/pancakePairAbi.json'
import bep20Abi from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getAddress, getDrFrankensteinAddress, getWbnbAddress } from 'utils/addressHelpers'
import { TombConfig } from 'config/constants/types'
import { getId } from '../../utils'

interface LpInfo {
  reserves: [EthersBigNumber, EthersBigNumber]
  totalSupply: number
  token0: string
  tokenAmount: number
}

const getLpInfo = async (tombConfigs: TombConfig[]): Promise<LpInfo[]> => {
  const drFrankensteinAddress = getDrFrankensteinAddress()
  const addresses = tombConfigs.map(({ lpAddress }) => getAddress(lpAddress))

  const infoCalls = addresses.flatMap((address) => [
    {
      address,
      name: 'getReserves',
      params: [],
    },
    {
      address,
      name: 'totalSupply',
      params: [],
    },
    {
      address,
      name: 'token0',
    },
  ])
  const amountCalls = addresses.map((address) => ({
    address,
    name: 'balanceOf',
    params: [drFrankensteinAddress],
  }))

  const [infoResults, amountResults]: [any[], number[]] = await Promise.all([
    multicall(lpPair, infoCalls),
    multicall(bep20Abi, amountCalls),
  ])

  return zipWith(
    chunk(infoResults, 3) as [[EthersBigNumber, EthersBigNumber], number, string][],
    amountResults as number[],
    ([reserves, totalSupply, token0], tokenAmount) => ({
      reserves,
      totalSupply,
      token0,
      tokenAmount,
    }),
  )
}

const getTombInfo = async (
  tombConfigs: TombConfig[],
): Promise<
  {
    info: {
      allocPoint: EthersBigNumber
      lpToken: string
      minimumStakingTime: EthersBigNumber
    }
    totalAllocPoint: number
  }[]
> => {
  const address = getDrFrankensteinAddress()
  const calls = tombConfigs.flatMap(({ pid }) => [
    {
      address,
      name: 'poolInfo',
      params: [getId(pid)],
    },
    {
      address,
      name: 'totalAllocPoint',
    },
  ])

  const results = await multicall(drFrankenstein, calls)
  return (chunk(results, 2) as [any, number][]).map(([info, totalAllocPoint]) => ({
    info,
    totalAllocPoint,
  }))
}

const fetchTombs = async (tombsToFetch: TombConfig[]) => {
  const wbnbAddress = getWbnbAddress()

  const [lpInfos, tombInfos] = await Promise.all([getLpInfo(tombsToFetch), getTombInfo(tombsToFetch)])

  return zipWith(tombsToFetch, lpInfos, tombInfos, (tombConfig, lpInfo, tombInfo) => {
    const { reserves, totalSupply, token0, tokenAmount } = lpInfo
    const { info, totalAllocPoint } = tombInfo

    const bnbReserve = reserves[token0 === wbnbAddress ? 0 : 1]
    const tokenReserve = reserves[token0 === getWbnbAddress() ? 1 : 0]
    const tokenPriceBnb = new BigNumber(bnbReserve._hex).div(tokenReserve._hex)
    const lpPriceBnb = tokenPriceBnb.times(tokenReserve._hex).plus(bnbReserve._hex).div(totalSupply)

    const allocPoint = new BigNumber(info.allocPoint._hex)
    const weight = allocPoint.div(new BigNumber(totalAllocPoint))

    return {
      ...tombConfig,
      poolInfo: {
        lpReserves: [new BigNumber(reserves[0]._hex), new BigNumber(reserves[1]._hex)],
        lpTotalSupply: new BigNumber(totalSupply),
        withdrawCooldown: new BigNumber(info.minimumStakingTime._hex),
        lpPriceBnb,
        tokenAmount: new BigNumber(tokenAmount),
        allocPoint,
        weight,
      },
    }
  })
}

export default fetchTombs
