import React, { useState } from 'react';
import styled from 'styled-components';
import { BalanceInput, Button, Flex, Image, Modal, Slider, Text } from '@rug-zombie-libs/uikit';
import useTheme from 'hooks/useTheme';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import { account } from 'redux/get';
import { getBalanceAmount, getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import { useSharkpool } from './SharkSetup';
import { BIG_TEN, BIG_ZERO } from '../../../../utils/bigNumber';

const StyledButton = styled(Button)`
  flex-grow: 1;
`

interface DecreaseStakeModalProps {
    balance: BigNumber,
    minimumStake: BigNumber,
    updateResult?: any,
    jawsPrice: number,
    onDismiss?: () => void
}

const DecreaseStakeModal: React.FC<DecreaseStakeModalProps> = ({ balance, minimumStake, jawsPrice, updateResult, onDismiss }) => {
    const { theme } = useTheme();    
    const sharkpoolContract = useSharkpool();
    const wallet = account();
    const { toastSuccess } = useToast();
    const { t } = useTranslation();

    const [stakeAmount, setStakeAmount] = useState(new BigNumber(minimumStake));
    const [percent, setPercent] = useState(0);

    const maxPartialAmount = new BigNumber(balance).minus(minimumStake);
    const remainingAmount = new BigNumber(balance).minus(stakeAmount);

    const handleStake = () => {
        if (wallet) {
            let formattedAmount = stakeAmount.toString()
            const index = stakeAmount.toString().indexOf('.')
            if (index >= 0) {
                formattedAmount = formattedAmount.substring(0, index)
            }

            sharkpoolContract.methods.withdraw(formattedAmount).send({ from: wallet })
                .then(() => {
                    updateResult();
                    toastSuccess(t('Unstaked JAWS'));
                    onDismiss();
                });
        }
    }

    const handleStakeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ether = BIG_TEN.pow(18);
        const inputValue = event.target.value || '0';
        let bigInputValue = getDecimalAmount(new BigNumber(inputValue));
        const distanceFromPartialMax = Math.abs(maxPartialAmount.minus(bigInputValue).toNumber());
        const distanceFromMax = Math.abs(bigInputValue.minus(balance).toNumber());
    
        if (distanceFromPartialMax < ether.toNumber()) {
          bigInputValue = maxPartialAmount;
        }
    
        if (distanceFromMax < ether.toNumber()) {
          bigInputValue = new BigNumber(balance);
        }
        setStakeAmount(bigInputValue);
    }

    const handleChangePercent = (sliderPercent: number) => {
        const percentageOfStakingMax = balance.dividedBy(100).multipliedBy(sliderPercent);
        let amountToStake;
        if (sliderPercent !== 100) {
          if (balance.minus(percentageOfStakingMax).lt(minimumStake)) {
            amountToStake = balance.minus(minimumStake);
          } else {
            amountToStake = percentageOfStakingMax;
          }
        } else {
          amountToStake = new BigNumber(balance);
        }
        setStakeAmount(amountToStake);
        setPercent(sliderPercent);
    }

    let withdrawalDetails = <div />
    let isDisabled = false

    if (stakeAmount.gt(balance)) {
        isDisabled = true
        withdrawalDetails = <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
            Invalid Withdrawal: Insufficient JAWS Staked
        </Text>
    } else if (remainingAmount.lt(minimumStake) && !remainingAmount.eq(BIG_ZERO)) {
        isDisabled = true
        withdrawalDetails = <>
            <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
                Invalid Withdrawal: Remaining balance
            </Text>
            <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
                {`must be a minimum of ${getBalanceAmount(minimumStake).toString()} JAWS`}
            </Text>
        </>
    }

    return(
        <Modal onDismiss={onDismiss} title='Withdraw JAWS' headerBackground={theme.colors.gradients.cardHeader}>
            <Flex alignItems='center' justifyContent='space-between' mb='8px'>
                <Text bold>Decrease Stake</Text>
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
                Balance: {getFullDisplayBalance(balance, 18, 4)}
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
            <Button mt='8px' as='a' onClick={handleStake} disabled={isDisabled} variant='secondary'>
                Withdraw JAWS
            </Button>
        </Modal>
    )
};

export default DecreaseStakeModal;