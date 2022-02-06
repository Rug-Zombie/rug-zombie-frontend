import React, { useEffect, useState } from 'react'
import {
  Text,
  Flex,
  ArrowForwardIcon,
  Button,
  useMatchBreakpoints,
} from '@rug-zombie-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Container from '../../../components/layout/Container'
import { auctionById } from '../../../redux/get'

const NowLive = styled(Text)`
  background: -webkit-linear-gradient(#ffd800, #eb8c00);
  font-size: 24px;
  font-weight: 600;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Wrapper = styled.div`
  background-color: #101820;
  max-height: max-content;
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    max-height: 256px;
  }
`

const Inner = styled(Container)`
  display: flex;
  flex-direction: column-reverse;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const LeftWrapper = styled(Flex)`
  flex-direction: column;
  flex: 1;
  padding-bottom: 40px;
  padding-top: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 40px;
  }
`

const Over = styled(Text)`
  :empty {
    margin-right: 0;
  }
`

const NFTBanner: React.FC = () => {
  const { t } = useTranslation()
  const { isLg, isXl } = useMatchBreakpoints()
  const isDesktop = isLg || isXl
  const { end } = auctionById(1)
  const [, setRemainingTime] = useState(end - Math.floor(Date.now() / 1000))
  const [, setTimerSet] = useState(false)

  useEffect(() => {
    setInterval(() => {
      setRemainingTime(end - Math.floor(Date.now() / 1000))
      setTimerSet(true)
    },1000)
  })

  return (
    <Wrapper style={{width: "100%"}}>
      <Inner style={{width: "100%"}}>
        <LeftWrapper width="100%">
          {/* <NowLive>{t('Mausoleum End:')} {formatDuration(remainingTime, true)}</NowLive> */}
          <NowLive>{t('Mausoleum is Live!')}</NowLive>
          { isDesktop ? <Flex>
            <Over fontSize='35px' bold mr='8px' style={{ whiteSpace: 'nowrap' }}>
              {t('The final')}
            </Over>
            <Over fontSize='35px' color='primary' bold mr='8px' style={{ whiteSpace: 'nowrap' }}>
              PATIENT-ZERO
            </Over>
            <Over fontSize='35px' bold mr='8px'>
              NFT is being auctioned in the Mausoleum.
            </Over>
          </Flex> :
            <>
              <Over fontSize='40px' bold mr='8px'>
                {t('The final')}
              </Over>
              <Over fontSize='40px' color='primary' bold mr='8px'>
                PATIENT-ZERO
              </Over>
              <Over fontSize='40px' bold mr='8px'>
                NFT is being auctioned in the Mausoleum.
              </Over>
            </>
          }
          <NavLink exact activeClassName='active' to='/mausoleum/3' id='lottery-pot-banner' style={{paddingTop: "8px"}}>
            <Button>
              <Text color='white' bold fontSize='16px' mr='4px'>
                {t('Enter the Mausoleum')}
              </Text>
              <ArrowForwardIcon color='white' />
            </Button>
          </NavLink>
        </LeftWrapper>
      </Inner>

    </Wrapper>
  )
}
export default NFTBanner
