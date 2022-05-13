import BigNumber from 'bignumber.js'
import { BigNumber as EthersBigNumber } from 'ethers'
import { chunk, zipWith } from 'lodash'

import tombOverlay from 'config/abi/tombOverlay.json'
import multicall from 'utils/multicall'
import { getTombOverlayAddress } from 'utils/addressHelpers'
import { TombConfig } from 'config/constants/types'
import { getId } from '../../utils'

interface TombPoolInfo {
  isEnabled: boolean
  mintingTime: EthersBigNumber
}

const fetchTombOverlays = async (tombsToFetch: TombConfig[]) => {
  const tombOverlayAddress = getTombOverlayAddress()
  const calls = tombsToFetch.flatMap((tomb) => [
    { address: tombOverlayAddress, name: 'poolInfo', params: [getId(tomb.overlay.pid)] },
    { address: tombOverlayAddress, name: 'mintingFeeInBnb', params: [] },
    { address: tombOverlayAddress, name: 'bracketBStart', params: [] },
    { address: tombOverlayAddress, name: 'bracketCStart', params: [] },
  ])

  const responses = await multicall(tombOverlay, calls)

  return zipWith(tombsToFetch, chunk(responses, 4) as [TombPoolInfo, number, number, number][], (tomb, [info, fee, bStart, cStart]) => ({
    ...tomb,
    poolInfo: {
      mintingIsEnabled: info.isEnabled,
      nftMintTime: new BigNumber(info.mintingTime._hex),
      mintingFee: new BigNumber(fee),
      bracketBStart: Number(bStart),
      bracketCStart: Number(cStart)
    },
  }))
}

export default fetchTombOverlays
