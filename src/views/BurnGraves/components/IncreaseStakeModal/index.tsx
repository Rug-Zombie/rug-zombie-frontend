import React, { useEffect, useState } from 'react'
import { BalanceInput, Button, Flex, Image, Modal, Slider, Text } from '@rug-zombie-libs/uikit'
import useTheme from 'hooks/useTheme'
import BigNumber from 'bignumber.js'
import { useDrBurnenstein } from 'hooks/useContract'
import styled from 'styled-components'
import { account, burnGraveById, coingeckoPrice } from '../../../../redux/get'
import { getBalanceAmount, getDecimalAmount, getFullDisplayBalance } from '../../../../utils/formatBalance'
import useTokenBalance from '../../../../hooks/useTokenBalance'
import { getAddress } from '../../../../utils/addressHelpers'
import useToast from '../../../../hooks/useToast'
import { useTranslation } from '../../../../contexts/Localization'
import { BASE_EXCHANGE_URL } from '../../../../config'

const StyledButton = styled(Button)`
  flex-grow: 1;
`

export interface IncreaseStakeModalProps {
  id: number
  updateResult: any
  onDismiss?: () => void
}

const IncreaseStakeModal: React.FC<IncreaseStakeModalProps> = ({ id, updateResult, onDismiss }) => {
  const grave = burnGraveById(id)

  const [stakeAmount, setStakeAmount] = useState(new BigNumber(grave.poolInfo.minimumStake))
  const [percent, setPercent] = useState(0)
  const [stakeTokenPrice, setStakeTokenPrice] = useState(0)

  const wallet = account()
  const { theme } = useTheme()
  const tokenBalance = useTokenBalance(getAddress(grave.stakingToken.address))
  const graveContract = useDrBurnenstein()
  const { toastDefault } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    if (grave.geckoId) {
      coingeckoPrice(grave.geckoId).then((res) => {
        setStakeTokenPrice(res.data[grave.geckoId].usd)
      })
    }
  }, [grave, setStakeTokenPrice])

  const handleStakeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value || '0'
    setStakeAmount(getDecimalAmount(new BigNumber(inputValue)))
  }

  const handleChangePercent = (sliderPercent: number) => {
    let percentageOfStakingMax
    let amountToStake
    if (grave.userInfo.stakedAmount.toString() === '0') {
      percentageOfStakingMax = tokenBalance
        .minus(grave.poolInfo.minimumStake)
        .dividedBy(100)
        .multipliedBy(sliderPercent)
      amountToStake = percentageOfStakingMax.plus(grave.poolInfo.minimumStake).toString()
    } else {
      percentageOfStakingMax = tokenBalance.multipliedBy(sliderPercent).dividedBy(100)
      amountToStake = percentageOfStakingMax.toString()
    }

    setStakeAmount(amountToStake)
    setPercent(sliderPercent)
  }

  const handleStake = () => {
    let formattedAmount = stakeAmount.toString()
    const index = stakeAmount.toString().indexOf('.')
    if (index >= 0) {
      formattedAmount = formattedAmount.substring(0, index)
    }

    graveContract.methods
      .enterStaking(id, formattedAmount)
      .send({ from: wallet })
      .then(() => {
        updateResult(id)
        toastDefault(t(`Staked ${grave.stakingToken.symbol}`))
        onDismiss()
      })
  }

  let stakingDetails = ''
  let isDisabled = false

  const bigStakeAmount = new BigNumber(stakeAmount)

  if (bigStakeAmount.gt(tokenBalance)) {
    isDisabled = true
    stakingDetails = `Invalid Stake: Insufficient ${grave.stakingToken.symbol} Balance`
  } else if (bigStakeAmount.plus(grave.userInfo.stakedAmount).lt(grave.poolInfo.minimumStake)) {
    isDisabled = true
    stakingDetails = `Invalid Stake: Minimum ${getBalanceAmount(grave.poolInfo.minimumStake).toString()} ${
      grave.stakingToken.symbol
    }`
  }

  return (
    <Modal
      onDismiss={onDismiss}
      title={`Stake ${grave.stakingToken.symbol}`}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text bold>Increase Stake</Text>
        <Flex alignItems="center" minWidth="70px">
          <Image
            src={`/images/tokens/${grave.stakingToken.symbol}.png`}
            width={24}
            height={24}
            alt={grave.stakingToken.symbol}
          />
          <Text ml="4px" bold>
            {grave.stakingToken.symbol}
          </Text>
        </Flex>
      </Flex>
      <BalanceInput
        value={Math.round(getBalanceAmount(stakeAmount).times(100).toNumber()) / 100}
        onChange={handleStakeInputChange}
        currencyValue={`${
          Math.round(getBalanceAmount(stakeAmount).times(stakeTokenPrice).times(100).toNumber()) / 100
        } USD`}
      />
      <Text mt="8px" ml="auto" color="textSubtle" fontSize="12px" mb="8px">
        Balance: {getFullDisplayBalance(tokenBalance, grave.stakingToken.decimals, 4)}
      </Text>
      <Text mt="8px" ml="auto" color="tertiary" fontSize="12px" mb="8px">
        {stakingDetails}
      </Text>
      <Slider
        min={0}
        max={100}
        value={percent}
        onValueChanged={handleChangePercent}
        name="stake"
        valueLabel={`${percent}%`}
        step={1}
      />
      <Flex alignItems="center" justifyContent="space-between" mt="8px">
        <StyledButton scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={() => handleChangePercent(25)}>
          25%
        </StyledButton>
        <StyledButton scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={() => handleChangePercent(50)}>
          50%
        </StyledButton>
        <StyledButton scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={() => handleChangePercent(75)}>
          75%
        </StyledButton>
        <StyledButton scale="xs" mx="2px" p="4px 16px" varian="tertiary" onClick={() => handleChangePercent(100)}>
          MAX
        </StyledButton>
      </Flex>
      {tokenBalance.toString() === '0' ? (
        <Button
          mt="8px"
          as="a"
          external
          href={`${BASE_EXCHANGE_URL}/swap?outputCurrency=${getAddress(grave.stakingToken.address)}`}
          variant="secondary"
        >
          Get {grave.stakingToken.symbol}
        </Button>
      ) : (
        <Button onClick={handleStake} disabled={isDisabled} mt="8px" as="a" variant="secondary">
          Deposit {grave.stakingToken.symbol}
        </Button>
      )}
    </Modal>
  )
}

export default IncreaseStakeModal
