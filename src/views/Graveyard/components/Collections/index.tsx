import React, { useState } from 'react'
import styled from 'styled-components'
import SectionHeader from 'views/Home/components/SectionHeader'
import Page from '../../../../components/layout/Page'
import Filter from '../Filter'
import CollectionCard from '../CollectionCard'
import config from './config'
import Nfts from '../Nfts'
import { account } from '../../../../redux/get'

const CollectionSection = styled.section`
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

const Tabs = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  &:hover { cursor: pointer; }
`;

const Tab = styled.li`
  color: #FFFFFF;
  text-align: center;
  font: normal normal normal 16px Poppins;
  padding: 10px;
  border-bottom: 4px solid #010202;
  &:hover { color: #30C00D; }
  &.active {
    color: #30C00D;
    border-bottom: 4px solid #30C00D;
    border-radius: 4px;
  }
`;

const Collections: React.FC = () => {
  const filters = ['Browse', 'In Wallet']
  const [selected, setSelected] = useState(0)
  const [collection, setCollection] = useState('All')
  const [ isActive, setIsActive ] = useState('All');

  const handleTabClick = (e, title) => {
    e.preventDefault();
    setCollection(title);
    setIsActive(title);
  }

  const tabList = config.map(({ title }) => {
    return (
      <Tab
        className={isActive === title ? "active" : ""} 
        onClick={e => handleTabClick(e, title)}
      >
        {title}
      </Tab>
    );
  });

  return (
    <CollectionSection>
      <Page>
        <CollectionFlex>
          <SectionHeader 
            title="The RugZombie Collection"
          />
          <Filter filters={filters} selected={selected} setSelected={setSelected} />
          <Tabs>
            {tabList}
          </Tabs>
          <CollectionGrid>
            <Nfts filter={collection} inWallet={selected === 1} />
          </CollectionGrid>
        </CollectionFlex>
      </Page>
    </CollectionSection>
  );
}

export default Collections