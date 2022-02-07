import BigNumber from 'bignumber.js'
import tombOverlay from 'config/abi/tombOverlay.json'
import multicall from 'utils/multicall'
import { getTombOverlayAddress } from 'utils/addressHelpers'
import { TombConfig } from 'config/constants/types'
import { getId } from '../../utils'
import { tombOverlayById } from '../../redux/get'

const fetchTombOverlays = async (tombsToFetch: TombConfig[]) => {
  const data = await Promise.all(
    tombsToFetch.map(async (tombConfig) => {
      const calls = [
        {
          address: getTombOverlayAddress(),
          name: 'poolInfo',
          params: [getId(tombConfig.overlay.pid)],
        },
        {
          address: getTombOverlayAddress(),
          name: 'mintingFeeInBnb',
          params: [],
        },
      ]

      const [
        info,
        fee
      ] = await multicall(tombOverlay, calls)

      return {
        ...tombConfig,
        poolInfo: {
          mintingIsEnabled: info.isEnabled,
          nftMintTime: new BigNumber(info.mintingTime._hex),
          mintingFee: new BigNumber(fee),
        }
      }
    }),
  )
  return data
}

export default fetchTombOverlays
