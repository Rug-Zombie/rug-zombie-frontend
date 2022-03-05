import React from 'react'
import { CardHeader, Heading, Text, Flex } from '@rug-zombie-libs/uikit'
import styled from 'styled-components'
import { auctionById } from '../../../../redux/get'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: ${({ isFinished, theme }) => (isFinished ? '#101820' : theme.colors.primary)};
`

const StyledCardHeader: React.FC<{ id: number }> = ({ id }) => {
  const { prizeSymbol, isFinished } = auctionById(id)
  const getSubHeading = () => {
    return `#${id}`
  }

  return (
    <Wrapper isFinished={isFinished} color="#101820">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={isFinished ? 'textDisabled' : 'body'} size="lg">
            {`${prizeSymbol} NFT`}
          </Heading>
          <Text color={isFinished ? 'textDisabled' : 'textSubtle'}>{getSubHeading()}</Text>
        </Flex>
        {/* <Image src={stakingTokenImageUrl} alt={earningTokenSymbol} width={64} height={64} /> */}
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
