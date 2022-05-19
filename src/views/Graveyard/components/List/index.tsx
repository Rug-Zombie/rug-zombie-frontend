/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ListLines from './components/ListLines'
import { useGetNfts } from '../../../../state/nfts/hooks'

const NftsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-width: 1000px;
  padding-bottom: 30px;
`

interface NftsProps {
    filter?: string
    inWallet?: boolean
}

const List: React.FC<NftsProps> = ({ filter, inWallet }) => {
    const [items, setItems] = useState([])
    const nfts = useGetNfts().data.slice().reverse()
    useEffect(() => {
        if (filter === 'All') setItems(nfts)
        else setItems(nfts.filter((nft) => nft.rarity === filter))

        if (inWallet) setItems((prev) => prev.filter((nft) => nft.userInfo.ownedIds.length > 0))
    }, [filter, inWallet, nfts])

    const ListLinesCard = items.map((nft) => <ListLines showTotalSupply key={nft.id} id={nft.id} />)

    return <NftsContainer>{ListLinesCard}</NftsContainer>
}

export default List