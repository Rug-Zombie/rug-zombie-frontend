import React from 'react'
import styled from 'styled-components'
import downpointer from 'images/DownPointer.png'

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
`;

const Dropdowns = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
`;

const Dropdown = styled.div`
  height: 60px;
  border: 2px solid #151E21;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px 0 0;
  min-width: 152px;
`;

const SearchBar = styled.div`
  display: flex;
  flex: 1;
  min-height: 60px;
  @media (max-width: 640px) {
    padding: 0 0 10px 0;
    min-height: 70px;
    flex: 0;
  }
`;

const Input = styled.input`
  border: 2px solid #151E21;
  border-radius: 10px;
  background: none;
  caret-color: #fff;
  color: #fff;
  padding: 0 20px;
  width: 100%;
`;

const DropdownText = styled.text`
  font: normal normal normal 14px/30px Poppins;
  color: #FFFFFF;
  padding: 0 10px 0 20px;
`;

const DownPointer = <div style={{ paddingRight: '20px' }}>
  <img src={downpointer} alt='Dropdown menu' width='20px' />
</div>

const Filter = () => {
  return <FilterContainer>
    <Dropdowns>
      <Dropdown>
        <DropdownText>
          Live graves
        </DropdownText>
        {DownPointer}
      </Dropdown>
      <Dropdown>
        <DropdownText>
          Legendary
        </DropdownText>
        {DownPointer}
      </Dropdown>
    </Dropdowns>
    <SearchBar>
     <Input placeholder='Search by name, symbol or address' />  
    </SearchBar>
  </FilterContainer>
}

export default Filter;