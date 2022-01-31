import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import drFrankenstein from 'config/abi/drFrankenstein.json'
import multicall from 'utils/multicall'
import {
  getAddress,
  getDrFrankensteinAddress,
  getMasterChefAddress,
  getTombOverlayAddress,
  getZombieAddress,
} from 'utils/addressHelpers'
import { GraveConfig, TombConfig } from 'config/constants/types'
import { getId } from '../../utils'
import { tombOverlayByPoolId } from '../../redux/get'

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

export const fetchTombOverlayUserInfo = async (account: string, tombOverlaysToFetch: TombConfig[]) => {
  const calls = tombOverlaysToFetch.reduce((userInfos, tombConfig) => {
    return userInfos.concat([{
      address: getTombOverlayAddress(),
      name: 'userInfo',
      params: [getId(tombConfig.overlayId), account],
    },
      {
        address: getTombOverlayAddress(),
        name: 'nftMintTime',
        params: [tombOverlayByPoolId()getId(tombConfig.overlayId), account],
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
