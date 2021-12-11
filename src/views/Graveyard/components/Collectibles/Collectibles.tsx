import React, { useEffect, useState } from 'react';
import { CardsLayout, Heading } from '@rug-zombie-libs/uikit'
import './Collectibles.Styles.css'
import CollectiblesCard from './CollectiblesCard';
import { nftUserInfo } from '../../../../redux/fetch'

import { useNftOwnership } from '../../../../hooks/useContract'
import CollectibleTabButtons from '../CollectibleTabButtons'
import { nfts } from '../../../../redux/get'
import { getAddress } from '../../../../utils/addressHelpers'

const RARITIES = ['Biblical', 'Mythic', 'Legendary', 'Rare', 'Uncommon', 'Common', 'Special']

const Collectibles: React.FC = () => {
  const contract = useNftOwnership()
  const [update, setUpdate] = useState(false)
  const [filter, setFilter] = useState(0)

  useEffect(() => {
      nftUserInfo(contract).then(() => {
        setUpdate(!update)
      })
    // eslint-disable-next-line
  }, [contract])

  let currentNfts = []
  switch (filter) {
    case 1:
      currentNfts = nfts().filter(nft => nft.userInfo.ownedIds.length > 0)
      break
    case 2:
      currentNfts = nfts().filter(nft => nft.userInfo.ownedIds.length === 0)
      break
    default:
      currentNfts = nfts()
      break
  }

  const refresh = () => {
      nftUserInfo(contract).then(() => {
        setUpdate(!update)
      })
  }

  return (
    <>
      <CollectibleTabButtons setFilter={setFilter}/>
      {RARITIES.map((rarity) => {
        const nftsByRarity = currentNfts.map((nft) => {
          return nft.rarity === rarity ? <CollectiblesCard id={nft.id} key={`${getAddress(nft.address)}-${nft.id}`} refresh={refresh}/> : null
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
