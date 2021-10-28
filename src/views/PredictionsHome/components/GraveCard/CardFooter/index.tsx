import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, CardFooter, ExpandableLabel, useTooltip, Box } from '@rug-zombie-libs/uikit'
import { EndedTag, OngoingTag } from 'components/Tags'
import ExpandedFooter from './ExpandedFooter'
import { auctionById } from '../../../../../redux/get'

interface FooterProps {
  id: number
}

const ExpandableButtonWrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  button {
    padding: 0;
  }
`

const Footer: React.FC<FooterProps> = ({ id }) => {
  const { t } = useTranslation()
  const { isFinished } = auctionById(id)
  const [isExpanded, setIsExpanded] = useState(false)
  const manualTooltipText = isFinished ? "Auction has ended" : "Auction is live!"
  const { targetRef, tooltip, tooltipVisible } = useTooltip( manualTooltipText, {
    placement: 'bottom-end',
  })

  return (
    <CardFooter>
      <ExpandableButtonWrapper>
        <Flex alignItems="center">
          {tooltipVisible && tooltip}
          <Box ref={targetRef}>
            { isFinished ? <EndedTag/> : <OngoingTag/>}
          </Box>
        </Flex>
        <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? t('Hide') : t('Details')}
        </ExpandableLabel>
      </ExpandableButtonWrapper>
      {isExpanded && (
        <ExpandedFooter id={id} />
      )}
    </CardFooter>
  )
}

export default Footer
