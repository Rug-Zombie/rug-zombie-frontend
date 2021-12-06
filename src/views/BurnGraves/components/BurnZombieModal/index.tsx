import React, { useState } from 'react'
import { BalanceInput, Button, Flex, Modal, Text } from '@rug-zombie-libs/uikit'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import useTheme from '../../../../hooks/useTheme'
import { getBalanceAmount, getDecimalAmount, getFullDisplayBalance } from '../../../../utils/formatBalance'
import { account, burnGraveById, zombiePriceUsd } from '../../../../redux/get'
import useTokenBalance from '../../../../hooks/useTokenBalance'
import { getAddress } from '../../../../utils/addressHelpers'
import tokens from '../../../../config/constants/tokens'
import { BIG_ZERO } from '../../../../utils/bigNumber'
import { BASE_EXCHANGE_URL } from '../../../../config'
import { useDrBurnenstein } from '../../../../hooks/useContract'
import useToast from '../../../../hooks/useToast'
import { useTranslation } from '../../../../contexts/Localization'

const StyledButton = styled(Button)`
    flex-grow: 1;
`

export interface BurnZombieModalProps {
  id: number,
  updateResult: any,
  onDismiss?: () => void
}

const BurnZombieModal:React.FC<BurnZombieModalProps> = ({ id, updateResult, onDismiss }) => {
  const grave = burnGraveById(id)

  const [burnAmount, setBurnAmount] = useState(new BigNumber(grave.poolInfo.tokensToBurn))

  const wallet = account()
  const { theme } = useTheme()
  const zombiePrice = zombiePriceUsd()
  const tokenBalance = useTokenBalance(getAddress(tokens.zmbe.address))
  const drburn = useDrBurnenstein()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()

  const handleBurnInputAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value || '0'
    setBurnAmount(getDecimalAmount(new BigNumber(inputValue)))
  }

  const handleBurnChange = (type: number) => {
    let amount;

    switch (type) {
      case 0:
        if (burnAmount.gt(grave.poolInfo.tokensToBurn)) {
          amount = burnAmount.minus(grave.poolInfo.tokensToBurn)
        } else {
          amount = BIG_ZERO
        }
        break;
      case 1:
        if (burnAmount.plus(grave.poolInfo.tokensToBurn).gt(grave.poolInfo.maxBurned)) {
          amount = grave.poolInfo.maxBurned
        } else {
          amount = burnAmount.plus(grave.poolInfo.tokensToBurn)
        }
        break;
      default:
        amount = grave.poolInfo.maxBurned.minus(grave.userInfo.burnedAmount);
        break;
    }

    setBurnAmount(amount);
  }

  const handleBurn = () => {
    let formattedAmount = burnAmount.toString()
    const index = burnAmount.toString().indexOf('.')
    if (index >= 0) {
      formattedAmount = formattedAmount.substring(0, index)
    }

    drburn.methods.burnZombie(id, formattedAmount).send({ from: wallet })
      .then(() => {
        updateResult(id)
        toastSuccess(t('Burned ZMBE'))
        onDismiss()
    })
  }

  let burnDetails = ''
  let isDisabled = false

  const bigBurnAmount = new BigNumber(burnAmount)

  if (bigBurnAmount.gt(tokenBalance)) {
    isDisabled = true
    burnDetails = 'Invalid Burn: Insufficient ZMBE Balance'
  } else if (bigBurnAmount.plus(grave.userInfo.burnedAmount).gt(grave.poolInfo.maxBurned)) {
    isDisabled = true
    burnDetails = `Invalid Stake: Maximum ${getBalanceAmount(grave.poolInfo.maxBurned).toString()} ${grave.stakingToken.symbol} burned per cycle`
  } else if (bigBurnAmount.mod(grave.poolInfo.tokensToBurn).toString() !== "0") {
    isDisabled = true
    burnDetails = `Invalid Stake: Must burn in multiples of ${getBalanceAmount(grave.poolInfo.tokensToBurn).toString()} ${grave.stakingToken.symbol}`
  }
  
  return (
    <Modal onDismiss={onDismiss} title='BURN ZOMBIE' headerBackground={theme.colors.gradients.cardHeader}>
      <Flex alignItems='center' justifyContent='space-between' mb='8px'>
        <Text bold>Burn Zombie</Text>
        <Text bold>This grave allows you to burn zombie to earn NFTs faster</Text>
      </Flex>
      <BalanceInput
        value={Math.round(getBalanceAmount(burnAmount).times(100).toNumber()) / 100}
        onChange={handleBurnInputAmount}
        currencyValue={`${Math.round(getBalanceAmount(burnAmount).times(zombiePrice).times(100).toNumber()) / 100} USD`}
      />
      <Text mt='8px' ml='auto' color='textSubtle' fontSize='12px' mb='8px'>
        Balance: {getFullDisplayBalance(tokenBalance, tokens.zmbe.decimals, 4)}
      </Text>
      <Text mt='8px' ml='auto' color='textSubtle' fontSize='12px' mb='8px'>
        Burned: {getFullDisplayBalance(grave.userInfo.burnedAmount, tokens.zmbe.decimals, 4)}
      </Text>
      <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
        {burnDetails}
      </Text>
      <Flex alignItems='center' justifyContent='space-between' mt='8px'>
        <StyledButton scale='xs' mx='2px' p='4px 16px' variant='tertiary' onClick={() => handleBurnChange(0)}>
          -
        </StyledButton>
        <StyledButton scale='xs' mx='2px' p='4px 16px' variant='tertiary' onClick={() => handleBurnChange(1)}>
          +
        </StyledButton>
        <StyledButton scale='xs' mx='2px' p='4px 16px' varian='tertiary' onClick={() => handleBurnChange(2)}>
          MAX
        </StyledButton>
      </Flex>
      {tokenBalance.toString() === '0'
        ? <Button mt='8px' as='a' external
                  href={`${BASE_EXCHANGE_URL}/swap?outputCurrency=${getAddress(tokens.zmbe.address)}`} variant='secondary'>
          Get ZMBE
        </Button>
        : <Button onClick={handleBurn} disabled={isDisabled} mt='8px' as='a' variant='secondary'>
          BURN ZMBE
        </Button>}
    </Modal>
  )
}

export default BurnZombieModal;