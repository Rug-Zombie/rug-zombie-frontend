import React, { useState } from 'react'
import styled from 'styled-components'
import Filter from '../Filter'
import config from './config'
import Nfts from '../Nfts'
import SectionHeader from '../../../../components/Home/components/SectionHeader'

const CollectionSection = styled.section`
  background-color: #010202;
  position: relative;
  top: -210px;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 0;
`

const Tabs = styled.ul`
  display: flex;
  list-style-type: none;
  &:hover { cursor: pointer; }
  overflow-x: auto;
  margin: 5px;
  @media (min-width: 638px) {
    justify-content: center;
  }
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
  };

  const handleSelection = (index) => {
    setSelected(index);
  };

  const tabList = config.map(({ title }) => {
    return (
      <Tab
        key={title}
        className={isActive === title ? "active" : ""} 
        onClick={e => handleTabClick(e, title)}
      >
        {title}
      </Tab>
    );
  });

  return (
    <CollectionSection>
      <SectionHeader title="The RugZombie Collection" />
      <Filter
        filters={filters}
        selected={selected}
        handleSelection={handleSelection}
      />
      <Tabs>
        {tabList}
      </Tabs>
      <Nfts filter={collection} inWallet={selected === 1} />
    </CollectionSection>
  );
}

export default Collections