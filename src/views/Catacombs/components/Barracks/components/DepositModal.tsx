import React, {useState} from 'react';
import {BalanceInput, Button, Flex, Image, Modal, Text} from '@catacombs-libs/uikit';
import {BigNumber} from 'bignumber.js';
import {useBarracksContract} from 'hooks/useContract';
import {account, barrackById} from 'redux/get';
import useToast from 'hooks/useToast';
import {useTranslation} from 'contexts/Localization';
import {getFullDisplayBalance} from "../../../../../utils/formatBalance";

interface DepositModalProps {
    id: number,
    updateResult: any,
    onDismiss?: () => void,
}

const DepositModalBNB: React.FC<DepositModalProps> = ({id, updateResult, onDismiss}) => {
    const [depositAmount, setDepositAmount] = useState('0');

    const barrack = barrackById(id);
    const barracksContract = useBarracksContract();
    const wallet = account();
    const {toastSuccess} = useToast();
    const {t} = useTranslation();

    const handleDeposit = () => {
        barracksContract.methods.deposit(account(), id, new BigNumber(depositAmount)).send({from: wallet})
            .then(() => {
                updateResult(id);
                toastSuccess(t(`${depositAmount} ${barrack.token.symbol} DEPOSITED`));
                onDismiss();
            });
    };

    const handleDepositInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value || '0'
        setDepositAmount(inputValue);
    }

    return (
        <Modal onDismiss={onDismiss} title={`Deposit ${barrack.token.symbol}`} className="color-white"
               style={{background: 'black', border: '1px solid white', borderBottom: '1px solid white', color: 'white'}}>
            <Flex alignItems="center" justifyContent="space-between" mb="8px">
                <Flex alignItems="center" minWidth="70px">
                    <Image src={`/images/tokens/${barrack.token.symbol}.png`} width={24} height={24}
                           alt={`${barrack.token.symbol}`}/>
                    <Text ml="4px" style={{color: 'white'}} bold>{barrack.token.symbol}</Text>
                </Flex>
            </Flex>
            <Text mt="8px" ml="auto" bold color="tertiary" fontSize="14px" mb="8px" style={{color: 'white'}}>
                To enter this pool, you must stake some {barrack.token.symbol} token as part of the unlock process.
                Max {getFullDisplayBalance(barrack.barrackInfo.maxStake, 18, 2)} can be staked.
            </Text>
            <input style={{
                background: 'white',
                fontWeight: 'bolder',
                margin: '2%',
                textAlign: 'right',
                borderRadius: '8px',
                height: '40px',
                fontSize: 'larger',
            }}
                   value={depositAmount}
                   type="number"
                   placeholder="Enter amount here."
                   onChange={handleDepositInputChange}
            />
            <Button onClick={handleDeposit} mt="8px" as="a" variant="secondary" disabled={parseFloat(depositAmount) <= 0}
                    style={{color: 'white', border: '2px solid white'}}>
                DEPOSIT {barrack.token.symbol}
            </Button>
        </Modal>
    );
}

export default DepositModalBNB;