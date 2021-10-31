import React, { useState } from 'react';
import styled from 'styled-components';
import { BalanceInput, Button, Flex, Image, Modal, Slider, Text } from '@rug-zombie-libs/uikit';
import useTheme from 'hooks/useTheme';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import { account } from 'redux/get';
import { getBalanceAmount, getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import { BASE_EXCHANGE_URL } from 'config';
import setup, { useSharkpool } from './SharkSetup';

const StyledButton = styled(Button)`
  flex-grow: 1;
`

interface IncreaseStakeModalProps {
    balance: BigNumber,
    minimumStake: BigNumber,
    updateResult?: any,
    jawsPrice: number,
    jawsBalance: BigNumber,
    onDismiss?: () => void
}

const IncreaseStakeModal: React.FC<IncreaseStakeModalProps> = ({ balance, minimumStake, jawsPrice, jawsBalance, updateResult, onDismiss }) => {
    const { theme } = useTheme();    
    const sharkpoolContract = useSharkpool();
    const wallet = account();
    const { toastSuccess } = useToast();
    const { t } = useTranslation();

    const [stakeAmount, setStakeAmount] = useState(new BigNumber(minimumStake));
    const [percent, setPercent] = useState(0);

    let stakingDetails = '';
    let isDisabled = false;
    const bigStakeAmount = new BigNumber(stakeAmount);

    if (bigStakeAmount.gt(jawsBalance)) {
        isDisabled = true;
        stakingDetails = 'Invalid Stake: Insufficient JAWS Balance';
    } else if (bigStakeAmount.plus(balance).lt(minimumStake)) {
        isDisabled = true;
        stakingDetails = `Invalid Stake: Minimum ${getBalanceAmount(minimumStake).toString()} JAWS`;
    }

    const handleStakeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value || '0';
        setStakeAmount(getDecimalAmount(new BigNumber(inputValue)));
    }

    const handleChangePercent = (sliderPercent: number) => {
        let percentageOfStakingMax;
        let amountToStake;

        if (balance.toString() === '0') {
          percentageOfStakingMax = jawsBalance.minus(minimumStake).dividedBy(100).multipliedBy(sliderPercent);
          amountToStake = percentageOfStakingMax.plus(minimumStake).toString();
        } else {
          percentageOfStakingMax = jawsBalance.multipliedBy(sliderPercent).dividedBy(100);
          amountToStake = percentageOfStakingMax.toString();
        }
    
        setStakeAmount(amountToStake);
        setPercent(sliderPercent);
    }

    const handleStake = () => {
        if (wallet) {
            let formattedAmount = stakeAmount.toString();
            const index = stakeAmount.toString().indexOf('.');
            if (index >= 0) {
                formattedAmount = formattedAmount.substring(0, index);
            }

            sharkpoolContract.methods.deposit(formattedAmount).send({ from: wallet })
                .then(() => {
                    updateResult();
                    toastSuccess(t('Staked JAWS'));
                    onDismiss();
                });
        }       
    }

    return(
        <Modal onDismiss={onDismiss} title='Stake JAWS' headerBackground={theme.colors.gradients.cardHeader}>
            <Flex alignItems='center' justifyContent='space-between' mb='8px'>
                <Text bold>Increase Stake</Text>
                <Flex alignItems='center' minWidth='70px'>
                    <Image src='/images/tokens/jaws.png' width={24} height={24} alt='JAWS' />
                    <Text ml='4px' bold>JAWS</Text>
                </Flex>
            </Flex>
            <BalanceInput
                value={Math.round(getBalanceAmount(stakeAmount).times(100).toNumber()) / 100}
                onChange={handleStakeInputChange}
                currencyValue={`${Math.round(getBalanceAmount(stakeAmount).times(jawsPrice).times(100).toNumber()) / 100} USD`}
            />
            <Text mt='8px' ml='auto' color='textSubtle' fontSize='12px' mb='8px'>
                Balance: {getFullDisplayBalance(jawsBalance, 18, 4)}
            </Text>
            <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
                {stakingDetails}
            </Text>
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
            {jawsBalance.toString() === '0' ?
                <Button mt='8px' as='a' external
                        href={`${BASE_EXCHANGE_URL}/swap?outputCurrency=${setup.jaws}`}
                        variant='secondary'>
                    Get JAWS
                </Button> :
                <Button onClick={handleStake} disabled={isDisabled} mt='8px' as='a' variant='secondary'>
                    Deposit JAWS
                </Button>
            }
        </Modal>
    )
};

export default IncreaseStakeModal;