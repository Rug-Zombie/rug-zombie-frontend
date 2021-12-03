import React, {useState} from 'react';
import {Flex, Image, Modal, Text} from '@catacombs-libs/uikit';
import {account, barrackById} from 'redux/get';
import {getBalanceAmount, getDecimalAmount} from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import {useBarracksContract} from 'hooks/useContract';
import {useTranslation} from 'contexts/Localization';
import useToast from 'hooks/useToast';

interface DecreaseStakeModalProps {
    id: number,
    updateResult: any,
    onDismiss?: () => void
}

const DecreaseStakeModalBNB: React.FC<DecreaseStakeModalProps> = ({id, updateResult, onDismiss}) => {

    const barrack = barrackById(id);
    const barracksContract = useBarracksContract();
    const wallet = account();

    const [buttonDisabled, setbuttonDisabled] = useState(true);
    const [depositAmount, setDepositAmount] = useState(barrack.barrackUserInfo.depositedAmount);
    const [buttonText, setButtonText] = useState(`Unstake ${barrack.token.symbol}`);
    const maxWithdrawable = Number(getBalanceAmount(barrack.barrackUserInfo.depositedAmount)) - Number(getBalanceAmount(barrack.barrackInfo.minStake));

    const {toastSuccess} = useToast();
    const {t} = useTranslation();

    const handleDecreaseStake = () => {
        setbuttonDisabled(true)
        setButtonText('Confirming transaction...');
        barracksContract.methods.refundEarlier(id, depositAmount).send({
            from: wallet,
        })
            .then(() => {
                updateResult(id);
                toastSuccess(t(`${getBalanceAmount(depositAmount)} ${barrack.token.symbol} UNSTAKED`));
                onDismiss();
            });
        setbuttonDisabled(false)
        setButtonText(`Stake ${barrack.token.symbol}`);
    };

    const handleDepositInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value || '0'
        if (Number(inputValue) > maxWithdrawable) {
            setButtonText(`Amount should be less than ${maxWithdrawable} ${barrack.token.symbol}`);
            setbuttonDisabled(true)
        } else {
            setbuttonDisabled(false)
            setButtonText(`Decrease Stake`);
            setDepositAmount(getDecimalAmount(new BigNumber(inputValue)));
        }
    }

    return (
        <Modal onDismiss={onDismiss} title={`Unstake ${barrack.token.symbol}`}>
            <Flex alignItems="center" justifyContent="space-between" mb="8px">
                <Flex alignItems="center" minWidth="70px">
                    <Image src={`/images/tokens/${barrack.token.symbol}.png`} width={24} height={24}
                           alt={`${barrack.token.symbol}`}/>
                    <Text ml="4px" style={{color: 'white'}} bold>{barrack.token.symbol}</Text>
                </Flex>
            </Flex>
            <Text mt="8px" ml="auto" bold color="tertiary" fontSize="14px" mb="8px">
                Decrease your stake here.<br/>
                Staked Amount : {getBalanceAmount(barrack.barrackUserInfo.depositedAmount)}<br/>
                Max can be unstaked : {maxWithdrawable} {barrack.token.symbol}
            </Text>
            <input className="barracks-deposit-input" type="number" placeholder="Enter amount here." onChange={handleDepositInputChange}/>
            <button type="button" className="barracks-deposit-button" onClick={handleDecreaseStake} disabled={buttonDisabled}>
                {buttonText}
            </button>
        </Modal>
    );
}

export default DecreaseStakeModalBNB;