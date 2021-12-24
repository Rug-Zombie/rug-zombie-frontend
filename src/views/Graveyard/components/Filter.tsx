import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 2px solid #0D1417;
  border-radius: 25px;
  height: 50px;
  display: flex;
  align-items: center;
`

const Selected = styled.div`
  height: 100%;
  width: 50%;
  min-width: 160px;
  background: #30C00D 0% 0% no-repeat padding-box;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const NotSelected = styled.div`
  height: 100%;
  width: 50%;
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  font: normal normal normal 14px/30px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
`

interface FilterProps {
  filters: string[];
  selected: number;
  setSelected: any;
}

const Filter: React.FC<FilterProps> = ({ filters, selected, setSelected }) => {

  return <Container>
    {filters.map((filter, index) => {
      const Button = index === selected ? Selected : NotSelected
      return <Button onClick={() => { setSelected(index)}}>{filter}</Button>
    })}
  </Container>
}

export default Filter