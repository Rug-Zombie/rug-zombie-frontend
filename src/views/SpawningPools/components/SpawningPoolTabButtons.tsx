import React, { useState } from 'react'
import styled from 'styled-components'
import {
  ButtonMenu,
  ButtonMenuItem,
  Button,
  HelpIcon,
  Toggle,
  Text,
  Flex,
  NotificationDot,
  Link as UiKitLink, useMatchBreakpoints,
} from '@rug-zombie-libs/uikit'
import { useTranslation } from 'contexts/Localization'

const ButtonText = styled(Text)`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
  }
`

const StyledButton = styled(Button)`
  flex-grow: 1;
  margin-right: 15px;
`

const StyledLink = styled(UiKitLink)`
  width: 100%;
`
const FILTERS = ['Live', 'Ended']

const SpawningPoolTabButtons = ({ setFilter, stakedOnly, setStakedOnly }) => {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const { isLg, isXl, isMd } = useMatchBreakpoints()
  const isDesktop = isLg || isXl || isMd

  const toggleButtonMenu = (i) => {
    setFilter(i)
    setIndex(i)
  }

  const nextFilter = () => {
    if(index === 1) {
      toggleButtonMenu(0)
    } else {
      toggleButtonMenu(index + 1)
    }
  }

  return (
    <Flex alignItems='center' justifyContent='center' mb='32px'>
      <Wrapper>
        {isDesktop ? <ButtonMenu onItemClick={toggleButtonMenu} activeIndex={index} scale='sm'>
          <ButtonMenuItem>
            <Text color="tertiary" bold>
            {t('Live')}
            </Text>
          </ButtonMenuItem>
          <NotificationDot>
            <ButtonMenuItem>
              <Text color="tertiary" bold>
              {t('Ended')}
              </Text>
            </ButtonMenuItem>
          </NotificationDot>
        </ButtonMenu> :
          <StyledButton onClick={nextFilter} className="total-earned text-shadow">
            <Text color="tertiary" bold>
              {t('Showing:')} {t(FILTERS[index])}
            </Text>
          </StyledButton>}
      </Wrapper>
         <Flex mt={['4px', null, 0, null]} ml={[0, null, '24px', null]} justifyContent='center' alignItems='center'>
          <Toggle scale='sm' checked={stakedOnly} onChange={() => {
            setStakedOnly(!stakedOnly)
          }} />
          <Text ml='8px'>{t('Staked only')}</Text>
         </Flex>
    </Flex>
  )
}

export default SpawningPoolTabButtons


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding-left: 12px;
    padding-right: 12px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 16px;
  }
`
