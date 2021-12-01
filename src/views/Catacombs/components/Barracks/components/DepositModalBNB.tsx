import React, {useEffect, useState} from 'react';
import {Flex, Image, Modal, Text} from '@catacombs-libs/uikit';
import {BigNumber} from 'bignumber.js';
import {useBarracksContract} from 'hooks/useContract';
import {account, barrackById} from 'redux/get';
import useToast from 'hooks/useToast';
import {useTranslation} from 'contexts/Localization';
import {getBalanceAmount, getDecimalAmount, getFullDisplayBalance} from "../../../../../utils/formatBalance";


interface DepositModalProps {
    id: number,
    increaseStake: boolean,
    updateResult: any,
    onDismiss?: () => void,
}

const DepositModalBNB: React.FC<DepositModalProps> = ({id, increaseStake, updateResult, onDismiss}) => {
    const [depositAmount, setDepositAmount] = useState(new BigNumber(0));
    const [buttonDisabled, setbuttonDisabled] = useState(true);
    const [buttonText, setButtonText] = useState('Amount should be more than minimum');
    const barrack = barrackById(id);
    const barracksContract = useBarracksContract();
    const wallet = account();
    const {toastSuccess} = useToast();
    const {t} = useTranslation();
    const [minStake, setMinStake] = useState(getFullDisplayBalance(barrack.barrackInfo.minStake, 18, 2))
    const [mainText, setMainText] = useState('')

    useEffect(() => {
        if (increaseStake) {
            setMinStake('0.005')
            setMainText('Feeling hungry, increase your stake here.');
            setButtonText('Amount should be more than 0.004')
        } else {
            setMainText(`To enter this barrack, you must stake a minimum
                of ${minStake} ${barrack.token.symbol} as part of
                the unlock process.`)
        }
    }, [increaseStake, minStake, barrack.token.symbol])

    const handleDeposit = () => {
        setbuttonDisabled(true)
        setButtonText('Confirming transaction...');
        barracksContract.methods.depositBNB(id).send({
            from: wallet,
            value: depositAmount
        })
            .then(() => {
                updateResult(id);
                toastSuccess(t(`${getBalanceAmount(depositAmount)} ${barrack.token.symbol} STAKED`));
                onDismiss();
            });
        setbuttonDisabled(false)
        setButtonText(`Stake ${barrack.token.symbol}`);
    };

    const handleDepositInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value || '0'
        if (Number(inputValue) < Number(minStake)) {
            if (increaseStake) {
                setButtonText('Amount should be more than 0.004');
            } else {
                setButtonText('Amount should be more than minimum.');
            }
            setbuttonDisabled(true)
        } else {
            setbuttonDisabled(false)
            if (increaseStake) {
                setButtonText(`Increase Stake`);
            } else {
                setButtonText(`Stake ${barrack.token.symbol}`);
            }
            setDepositAmount(getDecimalAmount(new BigNumber(inputValue)));
        }
    }

    return (
        <Modal onDismiss={onDismiss} title={`Stake ${barrack.token.symbol}`}>
            <Flex alignItems="center" justifyContent="space-between" mb="8px">
                <Flex alignItems="center" minWidth="70px">
                    <Image src={`/images/tokens/${barrack.token.symbol}.png`} width={24} height={24}
                           alt={`${barrack.token.symbol}`}/>
                    <Text ml="4px" style={{color: 'white'}} bold>{barrack.token.symbol}</Text>
                </Flex>
            </Flex>
            <Text mt="8px" ml="auto" bold color="tertiary" fontSize="14px" mb="8px">
                {mainText}
            </Text>
            <input className="barracks-deposit-input" type="number" placeholder="Enter amount here."
                   onChange={handleDepositInputChange}/>
            <button type="button" className="barracks-deposit-button" onClick={handleDeposit} disabled={buttonDisabled}>
                {buttonText}
            </button>
        </Modal>
    );
}

export default DepositModalBNB;