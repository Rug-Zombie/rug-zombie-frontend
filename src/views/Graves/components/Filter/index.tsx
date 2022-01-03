import React from 'react'
import styled from 'styled-components'
import downpointer from 'images/DownPointer.png'

const FilterFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 60px;
`

const Dropdown = styled.div`
  height: 60px;
  border: 2px solid #151E21;
  border-radius: 10px;
  flex-grow: 1;
`

const SearchBar = styled.input`
  border: 2px solid #151E21;
  border-radius: 10px;
  background: none;
  flex-grow: 2;
  padding-left: 20px;
`

const DropdownText = styled.text`
  font: normal normal normal 14px/30px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  padding-left: 20px;
  opacity: 1;
`

const DropdownFlex = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`


const Filter = () => {

  const DownPointer = <div style={{ paddingRight: '20px' }}>
    <img src={downpointer} alt='Dropdown menu' width='20px' />
  </div>

  return <FilterFlex>
    <Dropdown>
      <DropdownFlex>
        <DropdownText>
          Live graves
        </DropdownText>
        {DownPointer}
      </DropdownFlex>
    </Dropdown>
    <div style={{ paddingRight: '30px' }} />
    <Dropdown>
      <DropdownFlex>
        <DropdownText>
          Legendary
        </DropdownText>
        {DownPointer}
      </DropdownFlex>
    </Dropdown>
    <div style={{ paddingRight: '30px' }} />
    <SearchBar placeholder='Search by name, symbol or address'/>
  </FilterFlex>

}

export default Filter