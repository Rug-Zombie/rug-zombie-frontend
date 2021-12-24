/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import styled from 'styled-components'
import { account, nfts } from '../../../../redux/get'
import NftCard from './components/NftCard'
import Page from '../../../../components/layout/Page'

const NftGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
`

interface NftsProps {
  filter?: string;
  inWallet?: boolean;
  top?: string
}

const Nfts: React.FC<NftsProps> = ({ filter, top, inWallet }) => {
  let items = []
  switch (filter) {
    case 'Special': case'Common': case 'Uncommon': case 'Rare': case 'Legendary': case 'Mythic': case 'Biblical':
      items = nfts().filter(nft => nft.rarity === filter)
      break
    default:
      items = nfts()
      break
  }

  if(inWallet) {
    items = items.filter(nft => nft.userInfo.ownedIds.length > 0)
  }

  return <Page style={{ position: 'relative', top: top || '0px'}}>
    <NftGrid>
      {items.map(nft => {
        return <NftCard id={nft.id} />
      })}
    </NftGrid>
  </Page>
}

export default Nfts
