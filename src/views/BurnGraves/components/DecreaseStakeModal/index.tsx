import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BalanceInput, Button, Flex, Image, Modal, Slider, Text } from '@rug-zombie-libs/uikit';
import useTheme from 'hooks/useTheme';
import { account, coingeckoPrice, burnGraveById } from 'redux/get'
import { getBalanceAmount, getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import { useDrBurnenstein } from 'hooks/useContract'
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber';

const StyledButton = styled(Button)`
    flex-grow: 1;
`

export interface DecreaseStakeModalProps {
  id: number,
  updateResult: any,
  onDismiss?: () => void
}

const DecreaseStakeModal:React.FC<DecreaseStakeModalProps> = ({ id, updateResult, onDismiss }) => {
  const grave = burnGraveById(id)
  const [stakeAmount, setStakeAmount] = useState(new BigNumber(grave.poolInfo.minimumStake))
  const [percent, setPercent] = useState(0)
  const [stakeTokenPrice, setStakeTokenPrice] = useState(0)

  const wallet = account()
  const { theme } = useTheme()
  const graveContract = useDrBurnenstein()
  const { toastDefault } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    if (grave.geckoId) {
      coingeckoPrice(grave.geckoId).then(res => {
        setStakeTokenPrice(res.data[grave.geckoId].usd)
      })
    }
  }, [ grave, setStakeTokenPrice ])

  let withdrawalDetails = <div />
  let isDisabled = false
  const remainingAmount = new BigNumber(grave.userInfo.stakedAmount).minus(stakeAmount)
  const maxPartialAmount = new BigNumber(grave.userInfo.stakedAmount).minus(grave.poolInfo.minimumStake)

  const handleStakeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ether = BIG_TEN.pow(18)
    const inputValue = event.target.value || '0'
    let bigInputValue = getDecimalAmount(new BigNumber(inputValue))
    const distanceFromPartialMax = Math.abs(maxPartialAmount.minus(bigInputValue).toNumber())
    const distanceFromMax = Math.abs(bigInputValue.minus(grave.userInfo.stakedAmount).toNumber())

    if (distanceFromPartialMax < ether.toNumber()) {
      bigInputValue = maxPartialAmount;
    }

    if (distanceFromMax < ether.toNumber()) {
      bigInputValue = new BigNumber(grave.userInfo.stakedAmount)
    }

    setStakeAmount(bigInputValue);
  }

  const staked = new BigNumber(grave.userInfo.stakedAmount)

  const handleChangePercent = (sliderPercent: number) => {
    const percentageOfStakingMax = staked.dividedBy(100).multipliedBy(sliderPercent)
    let amountToStake

    if (sliderPercent !== 100) {
      if (staked.minus(percentageOfStakingMax).lt(grave.poolInfo.minimumStake)) {
        amountToStake = staked.minus(grave.poolInfo.minimumStake)
      } else {
        amountToStake = percentageOfStakingMax
      }
    } else {
      amountToStake = new BigNumber(staked)
    }

    setStakeAmount(amountToStake)
    setPercent(sliderPercent)
  }

  const handleWithdraw = () => {
    let formattedAmount = stakeAmount.toString()
    const index = stakeAmount.toString().indexOf('.')

    if (index >= 0) {
      formattedAmount = formattedAmount.substring(0, index)
    }

    graveContract.methods.leaveStaking(id, formattedAmount).send({ from: wallet })
      .then(() => {
        updateResult(id)
        toastDefault(t(`Withdrew ${grave.stakingToken.symbol}`))
        onDismiss()
      })
  }

  if (stakeAmount.gt(grave.userInfo.stakedAmount)) {
    isDisabled = true
    withdrawalDetails = (
      <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
        Invalid Withdrawal: Insufficient {grave.stakingToken.symbol} Staked
      </Text>)
  } else if (remainingAmount.lt(grave.poolInfo.minimumStake) && !remainingAmount.eq(BIG_ZERO)) {
    isDisabled = true
    withdrawalDetails = (
      <>
        <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
          Invalid Withdrawal: Remaining balance
        </Text>
        <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
          {`must be a minimum of ${getBalanceAmount(grave.poolInfo.minimumStake).toString()} ${grave.stakingToken.symbol}`}
        </Text>
      </>)
  }

  return(
    <Modal onDismiss={onDismiss} title={`Withdraw ${grave.stakingToken.symbol}`} headerBackground={theme.colors.gradients.cardHeader}>
      <Flex alignItems='center' justifyContent='space-between' mb='8px'>
        <Text bold>Decrease Stake</Text>
        <Flex alignItems='center' minWidth='70px'>
          <Image src={`/images/tokens/${grave.stakingToken.symbol}.png`} width={24} height={24} alt={grave.stakingToken.symbol} />
          <Text ml='4px' bold>{grave.stakingToken.symbol}</Text>
        </Flex>
      </Flex>
      <BalanceInput
        value={Math.round(getBalanceAmount(stakeAmount).times(100).toNumber()) / 100}
        onChange={handleStakeInputChange}
        currencyValue={`${Math.round(getBalanceAmount(stakeAmount).times(stakeTokenPrice).times(100).toNumber()) / 100} USD`}
      />
      <Text mt='8px' ml='auto' color='textSubtle' fontSize='12px' mb='8px'>
        Balance: {getFullDisplayBalance(grave.userInfo.stakedAmount, grave.stakingToken.decimals, 2)}
      </Text>
      {withdrawalDetails}
      <Slider
        min={0}
        max={100}
        value={percent}
        onValueChanged={handleChangePercent}
        name='stake'
        valueLabel={`${percent}%`}
        step={1}
      />
      <Flex alignItems='center' justifyContent='space-between' mt='8px'>
        <StyledButton scale='xs' mx='2px' p='4px 16px' variant='tertiary' onClick={() => handleChangePercent(25)}>
          25%
        </StyledButton>
        <StyledButton scale='xs' mx='2px' p='4px 16px' variant='tertiary' onClick={() => handleChangePercent(50)}>
          50%
        </StyledButton>
        <StyledButton scale='xs' mx='2px' p='4px 16px' variant='tertiary' onClick={() => handleChangePercent(75)}>
          75%
        </StyledButton>
        <StyledButton scale='xs' mx='2px' p='4px 16px' varian='tertiary' onClick={() => handleChangePercent(100)}>
          MAX
        </StyledButton>
      </Flex>
      <Button mt='8px' as='a' onClick={handleWithdraw} disabled={isDisabled} variant='secondary'>
        Withdraw {grave.stakingToken.symbol}
      </Button>
    </Modal>
  )
}

export default DecreaseStakeModal;