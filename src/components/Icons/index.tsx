import React from 'react'
import styled from 'styled-components'

const HorizontalLine = styled.div`
  width: 20px;
  height: 0px;
  border: 1px solid #B8C00D;
  opacity: 1;
`

const VerticalLine = styled.div`
  width: 0px;
  height: 21px;
  border: 1px solid #B8C00D;
  opacity: 1;
`

export const PlusIcon = () => {
  return <div>
    <VerticalLine style={{ position: 'relative', left: '9px'}}/>
    <HorizontalLine style={{position: 'relative', bottom: '11px'}}/>
  </div>
}

export const MinusIcon = () => {
  return <HorizontalLine/>
}