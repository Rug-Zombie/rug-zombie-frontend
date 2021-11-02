import React from 'react';
import { account } from 'redux/get';
import { Button, Flex, Image, Modal, Text } from '@rug-zombie-libs/uikit';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import sharkpools, { useSharkpool } from './SharkSetup';

interface DepositModalProps {
    onDismiss?: () => void,
    updateResult: any,
    id: number
}

const DepositModal: React.FC<DepositModalProps> = ({ onDismiss, updateResult, id }) => {
    const pool = sharkpools.find(a => a.id === id);
    const wallet = account();
    const poolContract = useSharkpool(pool.pool);
    const { toastSuccess } = useToast();
    const { t } = useTranslation();

    const handleDeposit = () => {
        if (wallet) {
            poolContract.methods.depositUnlock().send({ from: wallet })
                .then(() => {
                    toastSuccess(t(`Deposited 1 ${pool.depositToken.symbol}`));
                    onDismiss();
                    updateResult();
                });
        }
    }

    return(
        <Modal onDismiss={onDismiss} title={`Deposit ${pool.depositToken.symbol}`} >
            <Flex alignItems="center" justifyContent="space-between" mb="8px">
                <Flex alignItems="center" minWidth="70px">
                    <Image src={`/images/tokens/${pool.depositToken.symbol}.png`} width={24} height={24} 
                        alt={`${pool.depositToken.symbol}`} />
                    <Text ml="4px" bold>{pool.depositToken.symbol}</Text>
                </Flex>
            </Flex>
            <Text mt="8px" ml="auto" bold color="tertiary" fontSize="14px" mb="8px">
                To gain access to this special NFT Only pool, you must deposit 1 {pool.depositToken.symbol} token.
                <br/>
                This token is burned and you will be unable to retrieve it.
            </Text>
            <Button onClick={handleDeposit} mt="8px" as="a" variant="secondary">DEPOSIT 1 {pool.depositToken.symbol}</Button>
        </Modal>
    );
};

export default DepositModal;