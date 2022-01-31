import BigNumber from 'bignumber.js'
import drFrankenstein from 'config/abi/drFrankenstein.json'
import multicall from 'utils/multicall'
import { getDrFrankensteinAddress, getTombOverlayAddress } from 'utils/addressHelpers'
import { TombConfig } from 'config/constants/types'
import { getId } from '../../utils'
import { getBep20Contract } from '../../utils/contractHelpers'

const fetchTombOverlays = async (tombsToFetch: TombConfig[]) => {
  const data = await Promise.all(
    tombsToFetch.map(async (tombConfig) => {
      const calls = [
        {
          address: getTombOverlayAddress(),
          name: 'poolInfo',
          params: [getId(tombConfig.overlayId)],
        },
        {
          address: getDrFrankensteinAddress(),
          name: 'mintingFee',
        },
      ]

      const [
        info,
        fee
      ] = await multicall(drFrankenstein, calls)
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
