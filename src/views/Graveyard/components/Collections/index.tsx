import React, { useState } from 'react'
import styled from 'styled-components'
import ListIcon from 'images/icons/ListIcon.png'
import IconView from 'images/icons/IconView.png'
import List from 'views/Graveyard/components/List'
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
  &:hover {
    cursor: pointer;
  }
  overflow-x: auto;
  margin: 10px;
  @media (min-width: 638px) {
    justify-content: center;
  }
`

const Tab = styled.li`
  color: #ffffff;
  text-align: center;
  font: normal normal normal 16px Poppins;
  padding: 10px;
  border-bottom: 4px solid #010202;
  &:hover {
    color: #30c00d;
  }
  &.active {
    color: #30c00d;
    border-bottom: 4px solid #30c00d;
    border-radius: 4px;
  }
`

const Icons = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 10px;
  margin-left: 8px;
  background-color: black;
  &:hover {
    background-color: #30c00d;
    border-radius: 2px;
  }
`


const Collections: React.FC = () => {
    const filters = ['Browse', 'In Wallet']
    const [selected, setSelected] = useState(0)
    const [collection, setCollection] = useState('All')
    const [isActive, setIsActive] = useState('All')
    const [tabSelected, setTab] = useState(true)


  const handleTabClick = (e, title) => {
    e.preventDefault()
    setCollection(title)
    setIsActive(title)
  }

  const handleSelection = (index) => {
    setSelected(index)
  }

  const tabList = config.map(({ title }) => {
    return (
        <Tab key={title} className={isActive === title ? 'active' : ''} onClick={(e) => handleTabClick(e, title)}>
            {title}
        </Tab>
    )
  })

  return (
    <CollectionSection>
      <SectionHeader title="The RugZombie Collection" />
      <Filter filters={filters} selected={selected} handleSelection={handleSelection} />
      <Tabs>
          <Icons src = {IconView} alt = 'Icon View' onClick={() => setTab(true)}/>
          <Icons src={ListIcon} alt = 'List Icon' onClick={() => setTab(false)}/>
        {tabList}
      </Tabs>

        {tabSelected === true ? (
            <Nfts filter={collection} inWallet={selected === 1} />
        ):
            <List filter={collection} inWallet={selected === 1}  />
        }
    </CollectionSection>
  )
}

export default Collections
