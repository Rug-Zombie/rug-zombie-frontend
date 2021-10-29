import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@rug-zombie-libs/uikit'
import { NavLink } from 'react-router-dom'

const StyledTotalValueLockedCard = styled(Card)`
  box-shadow: rgb(204 246 108) 0px 0px 20px;
`

const CardMidContent = styled(Heading).attrs({ scale: 'xl' })`
  line-height: 44px;
`
const EarnAPRCard: React.FC = () => {
  return (
      <StyledTotalValueLockedCard>
        <NavLink exact activeClassName='active' to='/graves' id='farm-apr-cta'>
          <CardBody>
            <Heading>
              Earn ZMBE and
            </Heading>
            <CardMidContent color='primary'>
              NFTS
            </CardMidContent>
            <Flex justifyContent='space-between' style={{ width: '100%' }}>
              <Heading>
                in the Graves
              </Heading>
              <ArrowForwardIcon mt={30} color='primary' style={{ float: 'left' }} />
            </Flex>
          </CardBody>
        </NavLink>
      </StyledTotalValueLockedCard>
  )
}

export default EarnAPRCard
