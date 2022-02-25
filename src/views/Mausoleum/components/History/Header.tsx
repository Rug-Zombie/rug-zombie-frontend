import React from 'react'
import { ArrowForwardIcon, Box, Button, Flex, Heading, Text } from '@rug-zombie-libs/uikit'
import { useAppDispatch } from 'state'
import { setHistoryPaneState } from 'state/predictions'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { getBubbleGumBackground } from '../../helpers'

const Filter = styled.label`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  margin-right: 16px;
`

const StyledHeader = styled(Box)`
  background: ${({ theme }) => getBubbleGumBackground(theme)};
  flex: none;
  padding: 16px;
`

const Header = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(setHistoryPaneState(false))
  }

  return (
    <StyledHeader>
      <Flex alignItems="center" justifyContent="space-between" mb="16px">
        <Heading as="h3" size="md">
          {t('Your History')}
        </Heading>
        <Button onClick={handleClick} variant="text" endIcon={<ArrowForwardIcon color="primary" />} px="0">
          {t('Close')}
        </Button>
      </Flex>
      <Text color="textSubtle" fontSize="12px" mb="8px">
        {t('Filter')}
      </Text>
      <Flex alignItems="center">
        <Filter>
          <Text ml="4px">{t('Uncollected')}</Text>
        </Filter>
      </Flex>
    </StyledHeader>
  )
}

export default Header
