import { chunk, zipWith } from 'lodash'

import { getAddress } from '../../utils/addressHelpers'
import { Nft, NftUserInfo } from '../types'
import { getNftOwnership } from '../../utils/contractHelpers'

const FETCH_BATCH_SIZE = 16

export interface NftIdAndUserInfo {
  id: number
  userInfo: NftUserInfo
}

const toNoAccountUserInfo = (nft: Nft): NftIdAndUserInfo => ({
  id: nft.id,
  userInfo: {
    ownedIds: [],
  },
})

const getOwnedIds = async (account: string, nfts: Nft[]): Promise<number[][]> => {
  const nftOwnershipContract = getNftOwnership()
  const addressBatches: string[][] = chunk(nfts.map(({ address }) => getAddress(address), FETCH_BATCH_SIZE))
  const resultBatches: number[][][] = await Promise.all(
    addressBatches.map((addresses) => nftOwnershipContract.methods.massCheckOwnership(account, addresses).call()),
  )

  return resultBatches.flat()
}

const fetchNftsUser = async (account: string, nftsToFetch: Nft[]): Promise<NftIdAndUserInfo[]> => {
  if (!account) {
    return nftsToFetch.map(toNoAccountUserInfo)
  }

  const ownerships: number[][] = await getOwnedIds(account, nftsToFetch)
  return zipWith(nftsToFetch, ownerships, ({ id }, ownedIds) => ({ id, userInfo: { ownedIds } }))
}

export default fetchNftsUser
