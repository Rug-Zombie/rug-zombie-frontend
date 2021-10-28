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
            <Text fontSize='14px'>1. NFTombs are out! Stake LP to earn a variety of NFTs. Using Chainlink VRF you can stake more LP for higher odds at receiving a Rare or Legendary NFT</Text>
          </Row>
          <Row>
            <Text fontSize='14px'>2. We are listed on CoinMarketCap and CoinGecko! Make sure you add RugZombie to your watchlist to get us trending.</Text>
          </Row>
          <Row>
            <Text fontSize='14px'>3. Go earn ChompersV2 in the Autoshark Legendary Spawning Pool.</Text>
          </Row>
          <Row>
            <Text fontSize='14px'>4. Upgraded RugZombie Common grave is out! Please migrate your funds from the legacy grave. You can still remain in the old grave until you earn your NFT.</Text>
          </Row>
          <Row>
            <Text fontSize='14px'>5. You can now view your NFTs in the Graveyard.</Text>
          </Row>
          <Row>
            <Text fontSize='14px'>6. Send a message in our telegram if you find bugs, might even send you some zmbe if theyre good ones ;).</Text>
          </Row>
        </>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
