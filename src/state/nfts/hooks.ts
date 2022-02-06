import { useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'

import { Nft, State } from '../types'
import { BIG_ZERO } from '../../utils/bigNumber'
import { getAddress } from '../../utils/addressHelpers'
import { equalAddresses } from '../../utils'

export const useGetNfts = () => {
  return useSelector((state: State) => state.nfts)
}

export const useGetNftById = (id: number): Nft => useGetNfts().data.find(n => n.id === id)

export const useGetNftTotalSupply = (): BigNumber => useGetNfts().data
    .map((nft) => nft.totalSupply)
    .reduce((sum, nftSupply) => sum.plus(nftSupply), BIG_ZERO)
