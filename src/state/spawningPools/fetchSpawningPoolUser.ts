import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import spawningPoolAbi from 'config/abi/spawningPool.json'
import multicall from 'utils/multicall'
import { getAddress, getDrFrankensteinAddress, getZombieAddress } from 'utils/addressHelpers'
import { GraveConfig, SpawningPoolConfig } from 'config/constants/types'
import { getId } from '../../utils'

export const fetchSpawningPoolUserInfo = async (account: string, spawningPoolsToFetch: SpawningPoolConfig[]) => {

  const calls = spawningPoolsToFetch.map((spawningPool) => {
    return {
      address: getAddress(spawningPool.address),
      name: 'userInfo',
      params: [account],
    }
  })

  return multicall(spawningPoolAbi, calls)
}

export const fetchSpawningPoolUserEarnings = async (account: string, spawningPoolsToFetch: SpawningPoolConfig[]) => {
  const calls = spawningPoolsToFetch.map((spawningPool) => {
    return {
      address: getAddress(spawningPool.address),
      name: 'pendingReward',
      params: [account],
    }
  })

  const rawEarnings = await multicall(spawningPoolAbi, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings)
  })
  return parsedEarnings
}

export const fetchSpawningPoolUserTokenInfo = async (account: string, spawningPoolsToFetch: SpawningPoolConfig[]) => {
  const calls = spawningPoolsToFetch.reduce((tokenInfos, spawningPoolConfig) => {
    return tokenInfos.concat([{
      address: getZombieAddress(),
      name: 'allowance',
      params: [account, getDrFrankensteinAddress()],
    },
      {
        address: getZombieAddress(),
        name: 'balanceOf',
        params: [account],
      },
    ])
  }, [])

  const tokenInfos = await multicall(erc20ABI, calls)
  const pairedRugInfos = []
  for (let i = 0; i < tokenInfos.length; i += 2) {
    pairedRugInfos.push({
      allowance: tokenInfos[i],
      balance: tokenInfos[i+1],
    })
  }
  return pairedRugInfos
}
