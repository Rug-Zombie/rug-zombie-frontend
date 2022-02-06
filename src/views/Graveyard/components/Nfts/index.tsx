/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import NftCard from './components/NftCard'

const NftsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 480px;
`;

interface NftsProps {
  filter?: string;
  inWallet?: boolean;
}

const Nfts: React.FC<NftsProps> = ({ filter, inWallet }) => {
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    if (filter === 'All') setItems(nfts());
    else setItems(nfts().filter(nft => nft.rarity === filter));

    if (inWallet) setItems(prev => prev.filter(nft => nft.userInfo.ownedIds.length > 0));
  }, [ filter, inWallet ]);

  const NftCardList = items.map(nft => <NftCard key={nft.id} id={nft.id} />);

  return (
    <NftsContainer>
      {NftCardList}
    </NftsContainer>
  );
}

export default Nfts
