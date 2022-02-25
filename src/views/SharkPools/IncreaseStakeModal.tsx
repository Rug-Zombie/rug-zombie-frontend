import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BalanceInput, Button, Flex, Image, Modal, Slider, Text } from '@rug-zombie-libs/uikit'
import useTheme from 'hooks/useTheme'
import { account, coingeckoPrice, sharkPoolById } from 'redux/get'
import { getBalanceAmount, getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance'
import { getAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import useTokenBalance from 'hooks/useTokenBalance'
import { useSharkpool } from 'hooks/useContract'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { BASE_EXCHANGE_URL } from 'config'

const StyledButton = styled(Button)`
  flex-grow: 1;
`

interface IncreaseStakeModalProps {
  id: number
  updateResult: any
  onDismiss?: () => void
}

const IncreaseStakeModal: React.FC<IncreaseStakeModalProps> = ({ id, updateResult, onDismiss }) => {
  const pool = sharkPoolById(id)

  const [stakeAmount, setStakeAmount] = useState(new BigNumber(pool.poolInfo.minStake))
  const [percent, setPercent] = useState(0)
  const [stakeTokenPrice, setStakeTokenPrice] = useState(0)

  const wallet = account()
  const { theme } = useTheme()
  const tokenBalance = useTokenBalance(getAddress(pool.stakeToken.address))
  const poolContract = useSharkpool(id)
  const { toastDefault } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    if (pool.geckoId) {
      coingeckoPrice(pool.geckoId).then((res) => {
        setStakeTokenPrice(res.data[pool.geckoId].usd)
      })
    }
  }, [pool, setStakeTokenPrice])

  const handleStakeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value || '0'
    setStakeAmount(getDecimalAmount(new BigNumber(inputValue)))
  }

  const handleChangePercent = (sliderPercent: number) => {
    let percentageOfStakingMax
    let amountToStake
    if (pool.userInfo.stakedAmount.toString() === '0') {
      percentageOfStakingMax = tokenBalance.minus(pool.poolInfo.minStake).dividedBy(100).multipliedBy(sliderPercent)
      amountToStake = percentageOfStakingMax.plus(pool.poolInfo.minStake).toString()
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

    poolContract.methods
      .deposit(formattedAmount)
      .send({ from: wallet })
      .then(() => {
        updateResult(id)
        toastDefault(t(`Staked ${pool.stakeToken.symbol}`))
        onDismiss()
      })
  }

  let stakingDetails = ''
  let isDisabled = false

  const bigStakeAmount = new BigNumber(stakeAmount)

  if (bigStakeAmount.gt(tokenBalance)) {
    isDisabled = true
    stakingDetails = `Invalid Stake: Insufficient ${pool.stakeToken.symbol} Balance`
  } else if (bigStakeAmount.plus(pool.userInfo.stakedAmount).lt(pool.poolInfo.minStake)) {
    isDisabled = true
    stakingDetails = `Invalid Stake: Minimum ${getBalanceAmount(pool.poolInfo.minStake).toString()} ${
      pool.stakeToken.symbol
    }`
  } else if (bigStakeAmount.plus(pool.userInfo.stakedAmount).gt(pool.poolInfo.maxStake)) {
    isDisabled = true
    stakingDetails = `Invalid Stake: Maximum ${getBalanceAmount(pool.poolInfo.maxStake).toString()} ${
      pool.stakeToken.symbol
    }`
  }

  return (
    <Modal
      onDismiss={onDismiss}
      title={`Stake ${pool.stakeToken.symbol}`}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text bold>Increase Stake</Text>
        <Flex alignItems="center" minWidth="70px">
          <Image
            src={`/images/tokens/${pool.depositToken.symbol}.png`}
            width={24}
            height={24}
            alt={pool.stakeToken.symbol}
          />
          <Text ml="4px" bold>
            {pool.stakeToken.symbol}
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
        Balance: {getFullDisplayBalance(tokenBalance, pool.stakeToken.decimals, 4)}
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
          href={`${BASE_EXCHANGE_URL}/swap?outputCurrency=${getAddress(pool.stakeToken.address)}`}
          variant="secondary"
        >
          Get {pool.stakeToken.symbol}
        </Button>
      ) : (
        <Button onClick={handleStake} disabled={isDisabled} mt="8px" as="a" variant="secondary">
          Deposit {pool.stakeToken.symbol}
        </Button>
      )}
    </Modal>
  )
}

export default IncreaseStakeModal
