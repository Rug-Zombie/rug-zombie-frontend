import React from 'react'
import styled from 'styled-components'
import { CardBody, Flex } from '@rug-zombie-libs/uikit'
import UnlockButton from 'components/UnlockButton'
import StartingBid from './StartingBid'
import StyledCard from './StyledCard'
import StyledCardHeader from './StyledCardHeader'
import MinimumStakingTime from './MinimumStakingTime'
import GraveCardActions from './GraveCardActions'
import CardFooter from './CardFooter'
import { account, auctionById } from '../../../../redux/get'
import Video from '../../../../components/Video'

const StyledCardBody = styled(CardBody)<{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
`

const AuctionCard: React.FC<{ id: number }> = ({ id }) => {
  const { prize, path, type } = auctionById(id)
  const isLoading = false
  return (
    <StyledCard isStaking={false} style={{
      minWidth: '350px',
    }} >
      <StyledCardHeader id={id}/>
      <StyledCardBody isLoading={isLoading}>
        <StartingBid id={id} />
        <MinimumStakingTime period="1000" />
        <br />
        <br />
        <Flex justifyContent='center'> {prize} </Flex>
        <br/>
        <Flex justifyContent="center">
          {
            type === 'image' ?
              <img
                src={path}
                alt='auction prize'
                style={{width: "50%"}}
              /> :
              <Video path={path} />
          }
        </Flex>
        <Flex mt='24px' flexDirection='column'>
          {account() ? (
            <GraveCardActions id={id}/>
          ) : (
            <>
              <UnlockButton />
            </>
          )}
        </Flex>
      </StyledCardBody>
      <CardFooter id={id} />
    </StyledCard>
  )
}

export default AuctionCard
