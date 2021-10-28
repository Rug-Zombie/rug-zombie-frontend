import React from 'react'
import styled from 'styled-components'
import {
  Text, Button,
  Cards, Flex,
} from '@rug-zombie-libs/uikit'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import { APESWAP_ADD_LIQUIDITY_URL } from '../../../config'
import { auctionById } from '../../../redux/get'

const ButtonNav = styled.div`
  flex: none;
`

const StyledMobileMenu = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.card.background};
  height: 64px;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`
interface MobileMenuProps {
  id: number;
  refreshMobile: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ id, refreshMobile }) => {
  const {token0, token1, version, userInfo: { bid }} = auctionById(id)
  const v3 = version === 'v3'
  const handleItemClick = () => {

    refreshMobile()
  }


  return (
    <StyledMobileMenu>
      <Flex justifyContent="space-between" pl="10px" pr="10px" alignItems="center" height="100%" width="100%">
        <Button scale="sm">
          Your Bid: {getFullDisplayBalance(bid)}
        </Button>
          <Button scale="sm" onClick={handleItemClick}>
            <Cards color="tertiary" />
            <Text color="tertiary" bold>
              &nbsp;Auction Info
            </Text>

          </Button>
      {!v3 ? <ButtonNav>
        <a href={`${APESWAP_ADD_LIQUIDITY_URL}//${token0}/${token1}`} target='_blank' rel='noreferrer'>
          <Button variant='text'>
            Get BT (Bid Tokens):
          </Button>
        </a>
      </ButtonNav> : null}
      </Flex>
    </StyledMobileMenu>
  )
}

export default MobileMenu
