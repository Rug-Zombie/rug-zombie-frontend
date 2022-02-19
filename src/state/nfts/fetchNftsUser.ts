import { chunk, flatten } from 'lodash'

import { getAddress } from '../../utils/addressHelpers'
import { getNftOwnership } from '../../utils/contractHelpers'
import { Nft, NftUserInfo } from '../types'

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

const fetchNftsUser = async (account: string, nftsToFetch: Nft[]): Promise<NftIdAndUserInfo[]> => {
  if (!account) {
    return nftsToFetch.map(toNoAccountUserInfo)
  }

  const contract = getNftOwnership()
  const resultBatches: NftIdAndUserInfo[][] = await Promise.all(
    chunk(nftsToFetch, 32).map((nftBatch) =>
      contract.methods
        .massCheckOwnership(
          account,
          nftBatch.map((nft) => getAddress(nft.address)),
        )
        .call()
        .then((ownedIdResults) =>
          nftBatch.map((nft, index) => ({
            id: nft.id,
            userInfo: {
              ownedIds: ownedIdResults[index],
            },
          })),
        ),
    ),
  )

  return flatten(resultBatches)
}

export default fetchNftsUser
