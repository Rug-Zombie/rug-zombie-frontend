import tombOverlay from 'config/abi/tombOverlay.json'
import multicall from 'utils/multicall'
import { getTombOverlayAddress } from 'utils/addressHelpers'
import { TombConfig } from 'config/constants/types'
import { getId } from '../../utils'

const fetchTombOverlayUserInfo = async (account: string, tombOverlaysToFetch: TombConfig[]) => {
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

export default fetchTombOverlayUserInfo
