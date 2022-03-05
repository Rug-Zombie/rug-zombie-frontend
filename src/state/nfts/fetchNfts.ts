import erc721Abi from '../../config/abi/erc721.json'
import { getAddress } from '../../utils/addressHelpers'
import { Nft } from '../types'
import multicall from '../../utils/multicall'

const fetchNfts = async (nftsToFetch: Nft[]): Promise<Nft[]> => {
  const calls = nftsToFetch.map(({ address }) => ({
    address: getAddress(address),
    name: 'totalSupply',
  }))

  const totalSupplies = await multicall(erc721Abi, calls)
  return nftsToFetch.map((nft, i) => ({
    ...nft,
    totalSupply: totalSupplies[i],
  }))
}

export default fetchNfts
