import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text } from '@rug-zombie-libs/uikit'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  box-shadow: rgb(204 246 108) 0px 0px 20px;
`
const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const TotalValueLockedCard: React.FC = () => {

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size='lg' mb='24px'>
          Dev Notes
        </Heading>
        <>
          <Row>
            <Text fontSize='14px'>1. Happy Holidays! Thanks to everyone who joined us over the past 5 months, stay tuned for our AMA on the 29th outlining some of our plans over the next year.</Text>
          </Row>
          <Row>
            <Text fontSize='14px'>2. Patient Zero Private Beta is live. Public Beta in the new year!</Text>
          </Row>
          <Row>
            <Text fontSize='14px'>3. Minereum grave is live! Minereum holders (pretty much everyone on bsc) can claim zMinereum in the Victim Pools and gain access the grave.</Text>
          </Row>
          <Row>
            <Text fontSize='14px'>4. Pancake NFTomb is live! Now earn ZMBE and NFTs staking PancakeSwap LP.</Text>
          </Row>
          <Row>
            <Text fontSize='14px'>5. Send a message in our telegram if you find bugs, might even send you some zmbe if theyre good ones ;).</Text>
          </Row>
        </>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
