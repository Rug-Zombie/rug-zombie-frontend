import React, { useState } from 'react'
import styled from 'styled-components'
import Page from '../../../../components/layout/Page'
import Filter from '../Filter'
import CollectionCard from '../CollectionCard'
import config from './config'
import Nfts from '../Nfts'
import { account } from '../../../../redux/get'

const CollectionSection = styled.div`
  background-color: #010202;
  position: relative;
  top: -210px;
`

const CollectionFlex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CollectionGrid = styled.div`
  display: grid;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
`

const Title = styled.text`
  text-align: center;
  font: normal normal 600 36px/72px Poppins;
  letter-spacing: 1.8px;
  color: #FFFFFF;
  opacity: 1;
`

const Line = styled.div`
  border-radius: 3px;
  opacity: 1;
  margin-right: auto;
  margin-left: auto;
  height: 5px;
`

const RarityText = styled.div`
  text-align: left;
  font: normal normal normal 14px/30px Poppins;
  letter-spacing: 0px;
  color: #30C00D;
  padding-right: 30px;
  padding-left: 30px;
`

const Collections: React.FC = () => {
  const filters = ['Browse', 'In Wallet']
  const [selected, setSelected] = useState(0)
  const [collection, setCollection] = useState('None')
  const showCollections = selected === 0 && collection === 'None'

  return <CollectionSection>
    <Page>
      <CollectionFlex>
        <Title>The RugZombie Collection</Title>
        <div style={{ paddingTop: '20px' }} />
        <Line style={{
          width: '30px',
          background: '#B8C00D 0% 0% no-repeat padding-box',
        }} />
        <div style={{ paddingTop: '45px' }} />
        <Filter filters={filters} selected={selected} setSelected={setSelected} />
        <div style={{ paddingTop: '50px' }} />
        { collection !== 'None' ? <div style={{alignSelf: 'flex-start'}}>
          <RarityText style={{color: 'white'}} onClick={() => {setCollection('None')}}>{'< Back'}</RarityText>
          <RarityText>Showing: {collection}</RarityText></div> : null}
        <CollectionGrid>
          {showCollections ? config.map(({ title, description, nftId }) => {
            return <CollectionCard onClick={() => {setCollection(title)}} key={title} title={title} description={description} id={nftId} />
          }) : <Nfts filter={collection} inWallet={selected === 1} /> }
        </CollectionGrid>
      </CollectionFlex>
    </Page>
  </CollectionSection>
}

export default Collections