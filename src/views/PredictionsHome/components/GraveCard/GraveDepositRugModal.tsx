import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal, Text, Flex, Image, Button, Slider, BalanceInput, AutoRenewIcon } from '@rug-zombie-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance, formatNumber, getDecimalAmount } from 'utils/formatBalance'
import Web3 from 'web3'
import FeeSummary from './FeeSummary'
import { GraveConfig } from '../../../../config/constants/types'
import { BIG_ZERO } from '../../../../utils/bigNumber'

interface VaultStakeModalProps {
  grave: GraveConfig
  stakingMax: BigNumber
  stakingTokenPrice: BigNumber
  account: string
  userData: any
  isRemovingStake?: boolean
  pricePerFullShare?: BigNumber
  onDismiss?: () => void
  web3: Web3
}

const StyledButton = styled(Button)`
  flex-grow: 1;
`
const GraveDepositRugModal: React.FC<VaultStakeModalProps> = ({
  grave,
  stakingMax,
  stakingTokenPrice,
  userData,
  isRemovingStake = false,
  onDismiss,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [pendingTx, setPendingTx] = useState(false)
  const [stakeAmount, setStakeAmount] = useState('')
  const [percent, setPercent] = useState(0)
  const { withdrawalDate } = userData
  const now = Date.now() / 1000
  const hasUnstakingFee = withdrawalDate > now
  const usdValueStaked = stakeAmount && formatNumber(new BigNumber(stakeAmount).times(stakingTokenPrice).toNumber())
  const handleStakeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value || '0'
    const convertedInput = BIG_ZERO
    const percentage = Math.floor(convertedInput.dividedBy(stakingMax).multipliedBy(100).toNumber())
    setStakeAmount(inputValue)
    setPercent(percentage > 100 ? 100 : percentage)
  }

  const handleChangePercent = (sliderPercent: number) => {
    const percentageOfStakingMax = stakingMax.dividedBy(100).multipliedBy(sliderPercent)
    const amountToStake = '0'
    setStakeAmount(amountToStake)
    setPercent(sliderPercent)
  }

  // const handleDeposit = async () => {
    // restorationChefContract.methods
    //   .depositRug(grave.gid, convertedStakeAmount.toString())
    //   // .toString() being called to fix a BigNumber error in prod
    //   // as suggested here https://github.com/ChainSafe/web3.js/issues/2077
    //   .send({ from: account })
    //   .on('sending', () => {
    //     setPendingTx(true)
    //   })
    //   .on('receipt', () => {
    //     toastSuccess(t('Rugged token deposited!'), t('Your funds have been deposited in the pool'))
    //     setPendingTx(false)
    //     onDismiss()
    //   })
    //   .on('error', (error) => {
    //     console.error(error)
    //     // Remove message from toast before prod
    //     toastError(t('Error'), t(`${error.message} - Please try again.`))
    //     setPendingTx(false)
    //   })
  // }

  const handleConfirmClick = async () => {
    // const convertedStakeAmount = getDecimalAmount(new BigNumber(stakeAmount), grave.ruggedToken.decimals)
    setPendingTx(true)
    // handleDeposit(convertedStakeAmount)
  }

  return (
    <Modal
      title={`Deposit `}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <Flex alignItems='center' justifyContent='space-between' mb='8px'>
        <Text bold>Deposit:</Text>
        <Flex alignItems='center' minWidth='70px'>
          <Text ml='4px' bold>
            na
          </Text>
        </Flex>
      </Flex>
      <BalanceInput
        value={stakeAmount}
        onChange={handleStakeInputChange}
        currencyValue={`~${usdValueStaked || 0} USD`}
      />

      <Slider
        min={0}
        max={100}
        value={percent}
        onValueChanged={handleChangePercent}
        name='deposit'
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
        <StyledButton scale='xs' mx='2px' p='4px 16px' variant='tertiary' onClick={() => handleChangePercent(100)}>
          MAX
        </StyledButton>
      </Flex>
      <Button
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color='currentColor' /> : null}
        onClick={handleConfirmClick}
        disabled={!stakeAmount || parseFloat(stakeAmount) === 0}
        mt='24px'
      >
        {pendingTx ? t('Confirming') : t('Confirm')}
      </Button>
    </Modal>
  )
}

export default GraveDepositRugModal
