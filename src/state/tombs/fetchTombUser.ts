import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import drFrankenstein from 'config/abi/drFrankenstein.json'
import multicall from 'utils/multicall'
import { getAddress, getDrFrankensteinAddress, getMasterChefAddress, getZombieAddress } from 'utils/addressHelpers'
import { GraveConfig, TombConfig } from 'config/constants/types'
import { getId } from '../../utils'

export const fetchTombUserInfo = async (account: string, tombsToFetch: TombConfig[]) => {
  const drFrankensteinAddress = getDrFrankensteinAddress()

  const calls = tombsToFetch.map((tomb) => {
    return {
      address: drFrankensteinAddress,
      name: 'userInfo',
      params: [getId(tomb.pid), account],
    }
  })

  return multicall(drFrankenstein, calls)
}

export const fetchTombUserEarnings = async (account: string, tombsToFetch: TombConfig[]) => {
  const drFrankensteinAddress = getDrFrankensteinAddress()

  const calls = tombsToFetch.map((grave) => {
    return {
      address: drFrankensteinAddress,
      name: 'pendingZombie',
      params: [getId(grave.pid), account],
    }
  })

  const rawEarnings = await multicall(drFrankenstein, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}

export const fetchTombUserTokenInfo = async (account: string, tombsToFetch: TombConfig[]) => {
  const calls = tombsToFetch.reduce((lpInfos, tombConfig) => {
    return lpInfos.concat([{
      address: getAddress(tombConfig.lpAddress),
      name: 'allowance',
      params: [account, getDrFrankensteinAddress()],
    },
      {
        address: getAddress(tombConfig.lpAddress),
        name: 'balanceOf',
        params: [account],
      },
    ])
  }, [])

  const tokenInfos = await multicall(erc20ABI, calls)
  const pairedLpInfos = []
  for (let i = 0; i < tokenInfos.length; i += 2) {
    pairedLpInfos.push({
      allowance: tokenInfos[i],
      balance: tokenInfos[i+1],
    })
  }
  return pairedLpInfos
}
