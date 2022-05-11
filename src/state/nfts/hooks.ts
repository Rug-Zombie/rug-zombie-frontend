import { useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'

import { Nft, State } from '../types'
import { BIG_ZERO } from '../../utils/bigNumber'
import nfts from '../../config/constants/nfts'
import {getAddress} from '../../utils/addressHelpers';

export const useGetNfts = () => {
  return useSelector((state: State) => state.nfts)
}

export const useGetNftById = (id: number): Nft => useGetNfts().data.find((n) => n.id === id)
export const getNftConfigById = (id: number): Nft => nfts.find((n) => n.id === id)
export const getNftConfigByAddress = (address : string): Nft => nfts.find((n) => getAddress(n.address) === address)

export const useGetNftTotalSupply = (): BigNumber =>
  useGetNfts()
    .data.map((nft) => nft.totalSupply)
    .reduce((sum, nftSupply) => sum.plus(nftSupply), BIG_ZERO)


export default getNftConfigByAddress
