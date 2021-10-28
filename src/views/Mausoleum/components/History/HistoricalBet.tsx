import React, { useState } from 'react'
import {
  Box,
  Flex,
  PlayCircleOutlineIcon,
  Text,
} from '@rug-zombie-libs/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

interface BetProps {
  bid: any
}

const StyledBet = styled(Flex).attrs({ alignItems: 'center', p: '16px' })`
  background-color: ${({ theme }) => theme.card.background};
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
  cursor: pointer;
`

const YourResult = styled(Box)`
  flex: 1;
`

const HistoricalBet: React.FC<BetProps> = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useTranslation()
  const toggleOpen = () => setIsOpen(!isOpen)

  // const getRoundColor = () => {
    // switch (result) {
    //   case Result.WIN:
  //      return 'success'
      // case Result.LOSE:
      //   return 'failure'
      // case Result.CANCELED:
      //   return 'textDisabled'
      // default:
      //   return 'text'
    // }
  // }

  const renderBetLabel = () => {
    // if (true) {
      return (
        <Flex alignItems="center">
          <PlayCircleOutlineIcon color="primary" mr="6px" width="24px" />
          <Text color="primary" bold>
            {t('Starting Soon')}
          </Text>
        </Flex>
      )
    // }

    // if (true) {
    //   return (
    //     <Flex alignItems="center">
    //       <PlayCircleOutlineIcon color="secondary" mr="6px" width="24px" />
    //       <Text color="secondary" bold>
    //         {t('Live Now')}
    //       </Text>
    //     </Flex>
    //   )
    // }
    //
    // return (
    //   <>
    //     <Text fontSize="12px" color="textSubtle">
    //       {t('Your Result')}
    //     </Text>
    //     <Text bold color={getRoundColor()} lineHeight={1}>
    //       {/* {`${resultTextPrefix}${formatBnb(payout)}`} */}
    //     </Text>
    //   </>
    // )
  }

  return (
    <>
      <StyledBet onClick={toggleOpen} role="button">
        <Box width="48px">
          <Text textAlign="center">
            <Text fontSize="12px" color="textSubtle">
              {t('Round')}
            </Text>
            <Text bold lineHeight={1}>
              {/* {round.epoch.toLocaleString()} */}
            </Text>
          </Text>
        </Box>
        <YourResult px="24px">{renderBetLabel()}</YourResult>
        {/* {roundResult === Result.WIN && !claimed && ( */}
        {/*  <CollectWinningsButton */}
        {/*    onSuccess={handleSuccess} */}
        {/*    hasClaimed={bet.claimed} */}
        {/*    epoch={bet.round.epoch} */}
        {/*    payout={payout} */}
        {/*    scale="sm" */}
        {/*    mr="8px" */}
        {/*  > */}
        {/*    {t('Collect')} */}
        {/*  </CollectWinningsButton> */}
        {/* )} */}
      {/*  {roundResult === Result.CANCELED && !claimed && ( */}
      {/*    <ReclaimPositionButton onSuccess={handleSuccess} epoch={bet.round.epoch} scale="sm" mr="8px"> */}
      {/*      {t('Reclaim')} */}
      {/*    </ReclaimPositionButton> */}
      {/*  )} */}
      {/*  {!isOpenRound && !isLiveRound && ( */}
      {/*    <IconButton variant="text" scale="sm"> */}
      {/*      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />} */}
      {/*    </IconButton> */}
      {/*  )} */}
       </StyledBet>
      {/* {isOpen && <BetDetails bid={bid} result={getRoundResult()} />} */}
    </>
  )
}

export default HistoricalBet
