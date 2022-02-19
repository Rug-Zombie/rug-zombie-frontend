import React from 'react'
import styled from 'styled-components'
import { Flex } from '@rug-zombie-libs/uikit'
import FlexRow from './FlexRow'
import { PricePairLabel, TimerLabel } from './Label'
import PrevNextNav from './PrevNextNav'

const SetCol = styled.div`
  flex: none;
  width: auto;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 270px;
  }
`

const TimerLabelWrapper = styled.div`
  order: 2;

  ${({ theme }) => theme.mediaQueries.lg} {
    order: 1;
  }
`

interface MenuProps {
  id: number
}

const Menu: React.FC<MenuProps> = ({ id }) => {
  return (
    <FlexRow alignItems="center" p="16px">
      <SetCol>
        <PricePairLabel />
      </SetCol>
      <FlexRow justifyContent="center">
        <PrevNextNav />
      </FlexRow>
      <SetCol>
        <Flex alignItems="center" justifyContent="flex-end">
          <TimerLabelWrapper>
            <TimerLabel id={id} />
          </TimerLabelWrapper>
        </Flex>
      </SetCol>
    </FlexRow>
  )
}

export default Menu
