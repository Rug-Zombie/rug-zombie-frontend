import React, { useEffect, useState } from 'react';
import { CardsLayout, Heading } from '@rug-zombie-libs/uikit'
import './Collectibles.Styles.css'
import { useWeb3React } from '@web3-react/core'
import CollectiblesCard from './CollectiblesCard';

import CollectibleTabButtons from '../CollectibleTabButtons'
import { getAddress } from '../../../../utils/addressHelpers'
import { useAppDispatch } from '../../../../state'
import { useGetNfts } from '../../../../state/hooks'
import { fetchNftPublicDataAsync, fetchNftUserDataAsync } from '../../../../state/nfts'

const RARITIES = ['Biblical', 'Mythic', 'Legendary', 'Rare', 'Uncommon', 'Common', 'Special']

const Collectibles: React.FC = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchNftPublicDataAsync())
    dispatch(fetchNftUserDataAsync(account))
  }, [dispatch, account])

  const [filter, setFilter] = useState(0)
  const nfts = useGetNfts().data

  let currentNfts = []
  switch (filter) {
    case 1:
      currentNfts = nfts.filter(nft => nft.userInfo.ownedIds.length > 0)
      break
    case 2:
      currentNfts = nfts.filter(nft => nft.userInfo.ownedIds.length === 0)
      break
    default:
      currentNfts = nfts
      break
  }

  const refresh = () => undefined

  return (
    <>
      <CollectibleTabButtons setFilter={setFilter}/>
      {RARITIES.map((rarity) => {
        const nftsByRarity = currentNfts.map((nft) => {
          return nft.rarity === rarity ? <CollectiblesCard nft={nft} key={`${getAddress(nft.address)}-${nft.id}`} refresh={refresh}/> : null
        })

        return <>
          <Heading className='cardHeader' size="lg" textTransform="capitalize" color='text'>
            {nftsByRarity.length !== 0 ? rarity : null}
          </Heading>
          <CardsLayout className="collectibles">
            {nftsByRarity}
          </CardsLayout>
        </>
      })}
    </>
  )
}

export default Collectibles
