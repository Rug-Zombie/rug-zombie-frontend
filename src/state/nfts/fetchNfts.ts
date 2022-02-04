import { getErc721Contract } from '../../utils/contractHelpers'
import { getAddress } from '../../utils/addressHelpers'
import { Nft } from '../types'

const fetchNfts = (nftsToFetch: Nft[]): Promise<Nft[]> =>
    Promise.all(nftsToFetch.map((nft) => getErc721Contract(getAddress(nft.address)).methods.totalSupply().call()
        .then((totalSupply) => ({ ...nft, totalSupply }))))

export default fetchNfts
