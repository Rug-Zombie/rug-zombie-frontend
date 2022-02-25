import React, { useState } from 'react'
import styled from 'styled-components'
import downpointer from 'images/spawningPools/Down_Arrow.svg'
import upPointer from 'images/spawningPools/Up_Arrow.svg'
import searchIcon from 'images/spawningPools/Search_Icon.svg'

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
  border: 2px solid #151e21;
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
  border: 2px solid #151e21;
  border-radius: 10px;
  background: #0d1517 url(${searchIcon}) 93% no-repeat;
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
    background-color: #151e21;
    border-radius: 10px;
    color: #30c00d;
  }

  padding: 0 15px 0 15px;
`

const MenuText = styled.p`
  padding: 5px;
  color: #6b7682;
  font: normal normal normal 14px/30px Poppins;

  &:hover {
    color: #30c00d;
  }
`

const DropdownText = styled.p`
  font: normal normal normal 14px/30px Poppins;
  color: #ffffff;
  padding: 0 10px 0 20px;
  margin: 0 auto 0 0;
`

const DownPointer = (
  <div style={{ marginRight: '10px' }}>
    <img src={downpointer} alt="Dropdown menu" width="30px" />
  </div>
)

const UpPointer = (
  <div style={{ marginRight: '10px' }}>
    <img src={upPointer} alt="Hide Dropdown menu" width="30px" />
  </div>
)

interface FilterProps {
  searchValue: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFilter: (condition: string) => void
}

const POOLS_FILTER = ['All Pools', 'Staked', 'Ended']

const Filter: React.FC<FilterProps> = ({ searchValue, handleSearch, handleFilter }) => {
  const [showSpawningPoolsMenu, setShowSpawningPoolsMenu] = useState(false)
  const [poolsLabel, setPoolsLabel] = useState('All Pools')

  const handleDropdownClick = (e: any) => {
    e.preventDefault()
    setShowSpawningPoolsMenu((prev) => !prev)
  }

  const handleItemClick = (e: any) => {
    e.preventDefault()
    handleFilter(e.target.textContent)
    setPoolsLabel(e.target.textContent)
  }

  return (
    <FilterContainer>
      <Dropdowns>
        <Dropdown onClick={handleDropdownClick}>
          <DropdownText>{poolsLabel}</DropdownText>
          {showSpawningPoolsMenu ? UpPointer : DownPointer}
          <DropdownMenu>
            {showSpawningPoolsMenu ? (
              <DropdownContent>
                {POOLS_FILTER.map((spawningPool) => {
                  return (
                    <DropdownItem key={spawningPool} onClick={handleItemClick}>
                      <MenuText>{spawningPool}</MenuText>
                    </DropdownItem>
                  )
                })}
              </DropdownContent>
            ) : null}
          </DropdownMenu>
        </Dropdown>
      </Dropdowns>
      <SearchBar>
        <Input onInput={handleSearch} value={searchValue} placeholder="Search by name, symbol or NFT" />
      </SearchBar>
    </FilterContainer>
  )
}

export default Filter
