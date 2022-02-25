import BigNumber from 'bignumber.js'
import tombOverlay from 'config/abi/tombOverlay.json'
import drFrankenstein from 'config/abi/drFrankenstein.json'
import multicall from 'utils/multicall'
import { getDrFrankensteinAddress, getTombOverlayAddress } from 'utils/addressHelpers'
import { TombConfig } from 'config/constants/types'
import { getId } from '../../utils'

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
    const overlayId = getId(tombConfig.overlay.pid).toString()
    return userInfos.concat([
      {
        address: getTombOverlayAddress(),
        name: 'userInfo',
        params: [overlayId, account],
      },
      {
        address: getTombOverlayAddress(),
        name: 'nftMintTime',
        params: [overlayId, account],
      },
    ])
  }, [])

  const userInfos = await multicall(tombOverlay, calls)

  const pairedUserInfos = []
  for (let i = 0; i < userInfos.length; i += 2) {
    pairedUserInfos.push({
      nextNftMintDate: userInfos[i].nextNftMintDate,
      isMinting: userInfos[i].isMinting,
      randomNumber: userInfos[i].randomNumber,
      nftMintTime: userInfos[i + 1],
    })
  }
  return pairedUserInfos
}
