import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BalanceInput, Button, Flex, Image, Modal, Slider, Text } from '@rug-zombie-libs/uikit';
import useTheme from 'hooks/useTheme';
import { account, coingeckoPrice, sharkPoolById } from 'redux/get';
import { getBalanceAmount, getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import { useSharkpool } from 'hooks/useContract';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber';

const StyledButton = styled(Button)`
    flex-grow: 1;
`

interface DecreaseStakeModalProps {
    id: number,
    updateResult: any,
    onDismiss?: () => void
}

const DecreaseStakeModal: React.FC<DecreaseStakeModalProps> = ({ id, updateResult, onDismiss }) => {
    const pool = sharkPoolById(id);
    const [stakeAmount, setStakeAmount] = useState(new BigNumber(pool.poolInfo.minStake));
    const [percent, setPercent] = useState(0);
    const [stakeTokenPrice, setStakeTokenPrice] = useState(0);

    const wallet = account();
    const { theme } = useTheme();
    const poolContract = useSharkpool(id);
    const { toastDefault } = useToast();
    const { t } = useTranslation();

    useEffect(() => {
        if (pool.geckoId) {
            coingeckoPrice(pool.geckoId).then(res => {
                setStakeTokenPrice(res.data[pool.geckoId].usd);
            });
        }
    }, [ pool, setStakeTokenPrice ]);

    let withdrawalDetails = <div />;
    let isDisabled = false;
    const remainingAmount = new BigNumber(pool.userInfo.stakedAmount).minus(stakeAmount);
    const maxPartialAmount = new BigNumber(pool.userInfo.stakedAmount).minus(pool.poolInfo.minStake);

    const handleStakeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ether = BIG_TEN.pow(18);
        const inputValue = event.target.value || '0';
        let bigInputValue = getDecimalAmount(new BigNumber(inputValue));
        const distanceFromPartialMax = Math.abs(maxPartialAmount.minus(bigInputValue).toNumber());
        const distanceFromMax = Math.abs(bigInputValue.minus(pool.userInfo.stakedAmount).toNumber());
    
        if (distanceFromPartialMax < ether.toNumber()) {
          bigInputValue = maxPartialAmount;
        }
    
        if (distanceFromMax < ether.toNumber()) {
          bigInputValue = new BigNumber(pool.userInfo.stakedAmount);
        }

        setStakeAmount(bigInputValue);
    }

    const staked = new BigNumber(pool.userInfo.stakedAmount);

    const handleChangePercent = (sliderPercent: number) => {
        const percentageOfStakingMax = staked.dividedBy(100).multipliedBy(sliderPercent);
        let amountToStake;

        if (sliderPercent !== 100) {
            if (staked.minus(percentageOfStakingMax).lt(pool.poolInfo.minStake)) {
                amountToStake = staked.minus(pool.poolInfo.minStake);
            } else {
                amountToStake = percentageOfStakingMax;
            }
        } else {
            amountToStake = new BigNumber(staked);
        }

        setStakeAmount(amountToStake);
        setPercent(sliderPercent);
    }

    const handleWithdraw = () => {
        let formattedAmount = stakeAmount.toString();
        const index = stakeAmount.toString().indexOf('.');

        if (index >= 0) {
            formattedAmount = formattedAmount.substring(0, index);
        }
    
        poolContract.methods.withdraw(formattedAmount).send({ from: wallet })
            .then(() => {
                updateResult(id);
                toastDefault(t(`Withdrew ${pool.stakeToken.symbol}`));
                onDismiss();
            });
    }

    if (stakeAmount.gt(pool.userInfo.stakedAmount)) {
        isDisabled = true
        withdrawalDetails = (
            <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
                Invalid Withdrawal: Insufficient {pool.stakeToken.symbol} Staked
            </Text>)
    } else if (remainingAmount.lt(pool.poolInfo.minStake) && !remainingAmount.eq(BIG_ZERO)) {
        isDisabled = true
        withdrawalDetails = (
            <>
                <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
                    Invalid Withdrawal: Remaining balance
                </Text>
                <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
                    {`must be a minimum of ${getBalanceAmount(pool.poolInfo.minStake).toString()} ${pool.stakeToken.symbol}`}
                </Text>
            </>)
    }

    return(
        <Modal onDismiss={onDismiss} title={`Withdraw ${pool.stakeToken.symbol}`} headerBackground={theme.colors.gradients.cardHeader}>
            <Flex alignItems='center' justifyContent='space-between' mb='8px'>
                <Text bold>Decrease Stake</Text>
                <Flex alignItems='center' minWidth='70px'>
                    <Image src={`/images/tokens/${pool.depositToken.symbol}.png`} width={24} height={24} alt={pool.stakeToken.symbol} />
                    <Text ml='4px' bold>{pool.stakeToken.symbol}</Text>
                </Flex>
            </Flex>
            <BalanceInput
                value={Math.round(getBalanceAmount(stakeAmount).times(100).toNumber()) / 100}
                onChange={handleStakeInputChange}
                currencyValue={`${Math.round(getBalanceAmount(stakeAmount).times(stakeTokenPrice).times(100).toNumber()) / 100} USD`}
            />
            <Text mt='8px' ml='auto' color='textSubtle' fontSize='12px' mb='8px'>
                Balance: {getFullDisplayBalance(pool.userInfo.stakedAmount, pool.stakeToken.decimals, 2)}
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
                Withdraw {pool.stakeToken.symbol}
            </Button>
        </Modal>
    )
}

export default DecreaseStakeModal;