import BigNumber from 'bignumber.js'
import tombOverlay from 'config/abi/tombOverlay.json'
import multicall, { multicallv2 } from 'utils/multicall'
import { getDrFrankensteinAddress, getTombOverlayAddress } from 'utils/addressHelpers'
import { TombConfig } from 'config/constants/types'
import { getId } from '../../utils'
import { tombOverlayById } from '../../redux/get'
import { getTombOverlayContract } from '../../utils/contractHelpers'

const fetchTombOverlays = async (tombsToFetch: TombConfig[]) => {
  const data = await Promise.all(
    tombsToFetch.map(async (tombConfig) => {
      const calls = [
        {
          address: getTombOverlayAddress(),
          name: 'poolInfo',
          params: [getId(tombOverlayById(getId(tombConfig.overlayId)).pid)],
        },
        {
          address: getTombOverlayAddress(),
          name: 'mintingFee',
          params: [],
        },
      ]

      console.log(await getTombOverlayContract().methods.poolInfo(1).call()) // test on old branch
      // revert to old web3 whatever

      const [
        info,
        fee
      ] = await multicall(tombOverlay, calls)
      return {
        ...tombConfig,
        poolInfo: {
          mintingIsEnabled: info.isEnabled,
          mintingTime: new BigNumber(info.mintingTime._hex),
          mintingFee: new BigNumber(fee._hex),
        }
      }
    }),
  )
  return data
}

export default fetchTombOverlays
