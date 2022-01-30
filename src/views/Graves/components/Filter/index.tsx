import React, { useState } from 'react'
import styled from 'styled-components'
import downpointer from 'images/DownPointer.png'
import { GraveFilter, graveFilters, RarityFilter, rarityFilters } from '../../filterConfig'

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
  background: none;
  caret-color: #fff;
  color: #fff;
  padding: 0 20px;
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
  top: 60px;
  background-color: #010202;
  border: 2px solid #010202;
  right: 2px;
  z-index: 1;
  border-radius: 10px;
  margin: 0 10px 0 0;
  min-width: 152px;
  @media (max-width: 640px) {
    right: 17px;
  }
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
    color: #30C00D;
  }
`

const DropdownText = styled.p`
  font: normal normal normal 14px/30px Poppins;
  color: #FFFFFF;
  padding: 0 10px 0 20px;
`

const DownPointer = <div style={{ paddingRight: '20px' }}>
  <img src={downpointer} alt='Dropdown menu' width='20px' />
</div>

interface FilterProps {
  gravesList: string[];
  raritiesList: string[];
  graveFilter: { value: GraveFilter, set: any };
  rarityFilter: { value: RarityFilter, set: any };
  setSearch: any;
}

const Filter: React.FC<FilterProps> = ({ gravesList, raritiesList, graveFilter, rarityFilter, setSearch }) => {
  const [showGravesMenu, setShowGravesMenu] = useState(false)
  const [showTypeMenu, setShowTypeMenu] = useState(false)

  const handleDropdownClick = (e, condition) => {
    e.preventDefault()
    if (condition === 'graves') {
      setShowGravesMenu(prev => !prev)
      setShowTypeMenu(false)
    } else if (condition === 'types') {
      setShowTypeMenu(prev => !prev)
      setShowGravesMenu(false)
    }
  }

  const handleItemClick = (e, condition) => {
    e.preventDefault()
    if (condition === 'graves') {
      graveFilter.set(graveFilters.findIndex(f => f.label === e.target.textContent))
      setShowGravesMenu(false)
    } else if (condition === 'types') {
      rarityFilter.set(rarityFilters.findIndex(f => f.label === e.target.textContent))
      setShowTypeMenu(false)
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return <FilterContainer>
    <Dropdowns>
      <Dropdown onClick={(e) => handleDropdownClick(e, 'graves')}>
        <DropdownText>
          {graveFilters[graveFilter.value].label}
        </DropdownText>
        {DownPointer}
      </Dropdown>
      <DropdownMenu>
        {showGravesMenu ? (
          <DropdownContent>
            {gravesList.map(grave => {
                return (
                  <DropdownItem
                    key={grave}
                    onClick={(e) => handleItemClick(e, 'graves')}
                  >
                    <MenuText>{grave}</MenuText>
                  </DropdownItem>
                )
              },
            )}
          </DropdownContent>
        ) : null}
      </DropdownMenu>
      <Dropdown onClick={(e) => handleDropdownClick(e, 'types')}>
        <DropdownText>
          {rarityFilters[rarityFilter.value].label}
        </DropdownText>
        {DownPointer}
      </Dropdown>
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
    </Dropdowns>
    <SearchBar>
      <Input onInput={handleSearch} placeholder='Search by name, symbol or NFT' />
    </SearchBar>
  </FilterContainer>
}

export default Filter