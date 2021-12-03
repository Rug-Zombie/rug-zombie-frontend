import React, {useState} from 'react';
import {Flex, Image, Modal, Text} from '@catacombs-libs/uikit';
import {BigNumber} from 'bignumber.js';
import {useBarracksContract} from 'hooks/useContract';
import {account, barrackById} from 'redux/get';
import useToast from 'hooks/useToast';
import {useTranslation} from 'contexts/Localization';
import {
    getBalanceAmount,
    getDecimalAmount,
} from "../../../../../utils/formatBalance";

interface DepositModalProps {
    id: number,
    updateResult: any,
    onDismiss?: () => void,
}

const DepositModalToken: React.FC<DepositModalProps> = ({id, updateResult, onDismiss}) => {
    const barrack = barrackById(id);
    const [depositAmount, setDepositAmount] = useState(new BigNumber(0));
    const [buttonDisabled, setbuttonDisabled] = useState(true);
    const [buttonText, setButtonText] = useState(`Approve ${barrack.token.symbol} first`);
    const barracksContract = useBarracksContract();
    const wallet = account();
    const {toastSuccess} = useToast();
    const {t} = useTranslation();
    const maxWithdrawable = Number(getBalanceAmount(barrack.barrackUserInfo.depositedAmount)) - Number(getBalanceAmount(barrack.barrackInfo.minStake));

    const handleDecreaseStake = () => {
        barracksContract.methods.refundEarlier(id, depositAmount).send({
            from: wallet
        })
            .then(() => {
                updateResult(id);
                toastSuccess(t(`${depositAmount} ${barrack.token.symbol} STAKED`));
                onDismiss();
            });
    };

    const handleDepositInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value || '0'
        if (Number(inputValue) > maxWithdrawable) {
            setButtonText(`Amount should be more than ${maxWithdrawable} ${barrack.token.symbol}`);
            setbuttonDisabled(true)
        } else {
            setbuttonDisabled(false)
            setButtonText(`Unstake ${barrack.token.symbol}`);
            setDepositAmount(getDecimalAmount(new BigNumber(inputValue)));
        }
    }

    return (
        <Modal onDismiss={onDismiss} title={`Unstake ${barrack.token.symbol}`} className="color-white">
            <Flex alignItems="center" justifyContent="space-between" mb="8px">
                <Flex alignItems="center" minWidth="70px">
                    <Image src={`/images/tokens/${barrack.token.symbol}.png`} width={24} height={24}
                           alt={`${barrack.token.symbol}`}/>
                    <Text ml="4px" style={{color: 'white'}} bold>{barrack.token.symbol}</Text>
                </Flex>
            </Flex>
            <Text mt="8px" ml="auto" bold color="tertiary" fontSize="14px" mb="8px" style={{color: 'white'}}>
                Decrease your stake here.<br/>
                Staked Amount : {getBalanceAmount(barrack.barrackUserInfo.depositedAmount)}<br/>
                Max can be unstaked : {maxWithdrawable} {barrack.token.symbol}
            </Text>
            <input className="barracks-deposit-input" type="number" placeholder="Enter amount here."
                   onChange={handleDepositInputChange}/>
            <button type="button" className="barracks-deposit-button" onClick={handleDecreaseStake}
                    disabled={buttonDisabled}>
                {buttonText}
            </button>
        </Modal>
    );
}

export default DepositModalToken;