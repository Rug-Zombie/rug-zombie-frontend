import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import drFrankenstein from 'config/abi/drFrankenstein.json'
import multicall from 'utils/multicall'
import { getAddress, getDrFrankensteinAddress, getZombieAddress } from 'utils/addressHelpers'
import { GraveConfig } from 'config/constants/types'
import { getId } from '../../utils'

export const fetchGraveUserInfo = async (account: string, gravesToFetch: GraveConfig[]) => {
  const drFrankensteinAddress = getDrFrankensteinAddress()

  const calls = gravesToFetch.map((grave) => {
    return {
      address: drFrankensteinAddress,
      name: 'userInfo',
      params: [getId(grave.pid), account],
    }
  })

  return multicall(drFrankenstein, calls)
}

export const fetchGraveUserEarnings = async (account: string, gravesToFetch: GraveConfig[]) => {
  const drFrankensteinAddress = getDrFrankensteinAddress()

  const calls = gravesToFetch.map((grave) => {
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

export const fetchGraveUserTokenInfo = async (account: string, gravesToFetch: GraveConfig[]) => {
  const calls = gravesToFetch.reduce((rugInfos, graveConfig) => {
    return rugInfos.concat([
      {
        address: getAddress(graveConfig.rug.address),
        name: 'allowance',
        params: [account, getDrFrankensteinAddress()],
      },
      {
        address: getAddress(graveConfig.rug.address),
        name: 'balanceOf',
        params: [account],
      },
      {
        // Separate in the future
        address: getZombieAddress(),
        name: 'allowance',
        params: [account, getDrFrankensteinAddress()],
      },
    ])
  }, [])

  const tokenInfos = await multicall(erc20ABI, calls)
  const pairedRugInfos = []
  for (let i = 0; i < tokenInfos.length; i += 3) {
    pairedRugInfos.push({
      allowance: tokenInfos[i],
      balance: tokenInfos[i + 1],
      zombieAllowance: tokenInfos[i + 2],
    })
  }
  return pairedRugInfos
}
