import React, { useState } from 'react'
import styled from 'styled-components'
import downpointer from 'images/tombs/Down_Arrow.svg'
import upPointer from 'images/tombs/Up_Arrow.svg'
import searchIcon from 'images/tombs/Search_Icon.svg'
import { TombFilter, tombFilters, RarityFilter, rarityFilters } from '../../filterConfig'

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 0 0 20px 0;
  @media (max-width: 640px) {
    flex-direction: column-reverse;
    height: auto;
    align-items: space-between;
  }
`

const Dropdowns = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
`

const Dropdown = styled.div`
  height: 60px;
  border: 2px solid #151E21;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px 0 0;
  min-width: 152px;

  &:hover {
    cursor: pointer;
  }
`

const SearchBar = styled.div`
  display: flex;
  flex: 1;
  min-height: 60px;
  @media (max-width: 640px) {
    padding: 0 0 10px 0;
    min-height: 70px;
    flex: 0;
  }
`

const Input = styled.input`
  border: 2px solid #151E21;
  border-radius: 10px;
  background: #0D1517 url(${searchIcon}) 93% no-repeat;
  caret-color: #fff;
  color: #fff;
  padding: 0 60px 0 20px;
  width: 100%;
`

const DropdownMenu = styled.div`
  display: inline-block;
  transition: all 0.5s ease;
  position: relative;
`

const DropdownContent = styled.div`
  position: absolute;
  display: block;
  top: 30px;
  background-color: #010202;
  border: 2px solid #010202;
  right: -12px;
  z-index: 1;
  border-radius: 10px;
  margin: 0 10px 0 0;
  min-width: 152px;
`

const DropdownItem = styled.div`
  &:hover {
    cursor: pointer;
    background-color: #151E21;
    border-radius: 10px;
    color: #30C00D;
  }

  padding: 0 15px 0 15px;
`

const MenuText = styled.p`
  padding: 5px;
  color: #6B7682;
  font: normal normal normal 14px/30px Poppins;

  &:hover {
    color: #4B7BDC;
  }
`

const DropdownText = styled.p`
  font: normal normal normal 14px/30px Poppins;
  color: #FFFFFF;
  padding: 0 10px 0 20px;
  margin: 0 auto 0 0;
`

const DownPointer = <div style={{ marginRight: '10px' }}>
  <img src={downpointer} alt='Dropdown menu' width='30px' />
</div>

const UpPointer = <div style={{ marginRight: '10px' }}>
  <img src={upPointer} alt='Hide Dropdown menu' width='30px' />
</div>

interface FilterProps {
  tombsList: string[];
  raritiesList: string[];
  tombFilter: { value: TombFilter, set: any };
  rarityFilter: { value: RarityFilter, set: any };
  setSearch: any;
}

const Filter: React.FC<FilterProps> = ({ tombsList, raritiesList, tombFilter, rarityFilter, setSearch }) => {
  const [showTombsMenu, setShowTombsMenu] = useState(false)
  const [showTypeMenu, setShowTypeMenu] = useState(false)

  const handleDropdownClick = (e, condition) => {
    e.preventDefault()
    if (condition === 'tombs') {
      setShowTombsMenu(prev => !prev)
      setShowTypeMenu(false)
    } else if (condition === 'types') {
      setShowTypeMenu(prev => !prev)
      setShowTombsMenu(false)
    }
  }

  const handleItemClick = (e, condition) => {
    e.preventDefault()
    if (condition === 'tombs') {
      tombFilter.set(tombFilters.findIndex(f => f.label === e.target.textContent))
    } else if (condition === 'types') {
      rarityFilter.set(rarityFilters.findIndex(f => f.label === e.target.textContent))
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return <FilterContainer>
    <Dropdowns>
      <Dropdown onClick={(e) => handleDropdownClick(e, 'tombs')}>
        <DropdownText>
          {tombFilters[tombFilter.value].label}
        </DropdownText>
        {showTombsMenu ? UpPointer : DownPointer }
        <DropdownMenu>
          {showTombsMenu ? (
            <DropdownContent>
              {tombsList.map(tomb => {
                  return (
                    <DropdownItem
                      key={tomb}
                      onClick={(e) => handleItemClick(e, 'tombs')}
                    >
                      <MenuText>{tomb}</MenuText>
                    </DropdownItem>
                  )
                },
              )}
            </DropdownContent>
          ) : null}
        </DropdownMenu>
      </Dropdown>
      <Dropdown onClick={(e) => handleDropdownClick(e, 'types')}>
        <DropdownText>
          {rarityFilters[rarityFilter.value].label}
        </DropdownText>
        {showTypeMenu ? UpPointer : DownPointer }
        <DropdownMenu>
          {showTypeMenu ? (
            <DropdownContent>
              {raritiesList.map(type => {
                  return (
                    <DropdownItem
                      key={type}
                      onClick={(e) => handleItemClick(e, 'types')}
                    >
                      <MenuText>{type}</MenuText>
                    </DropdownItem>
                  )
                },
              )}
            </DropdownContent>
          ) : null}
        </DropdownMenu>
      </Dropdown>
    </Dropdowns>
    <SearchBar>
      <Input onInput={handleSearch} placeholder='Search by name, symbol or NFT' />
    </SearchBar>
  </FilterContainer>
}

export default Filter