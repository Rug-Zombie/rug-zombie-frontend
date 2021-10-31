import React from 'react';
import { account } from 'redux/get';
import { Button, Flex, Image, Modal, Text } from '@rug-zombie-libs/uikit';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import { useSharkpool } from './SharkSetup';

interface DepositcJawsModalProps {
    onDismiss?: () => void,
    updateResult: any
}

const DepositcJawsModal: React.FC<DepositcJawsModalProps> = ({ onDismiss, updateResult }) => {
    const wallet = account();
    const poolContract = useSharkpool();
    const { toastSuccess } = useToast();
    const { t } = useTranslation();

    const handleDeposit = () => {
        if (wallet) {
            poolContract.methods.depositUnlock().send({ from: wallet })
                .then(() => {
                    toastSuccess(t("1 cJAWS Burned"));
                    onDismiss();
                    updateResult();
                });
        }
    }

    return(
        <Modal onDismiss={onDismiss} title="Deposit cJAWS" >
            <Flex alignItems="center" justifyContent="space-between" mb="8px">
                <Flex alignItems="center" minWidth="70px">
                    <Image src='/images/tokens/jaws.png' width={24} height={24} alt='cJAWS' />
                    <Text ml="4px" bold>cJAWS</Text>
                </Flex>
            </Flex>
            <Text mt="8px" ml="auto" bold color="tertiary" fontSize="14px" mb="8px">
                To gain access to this special NFT Only pool, you must deposit 1 cJAWS token.
                <br/>
                This token is burned and you will be unable to retrieve it.
            </Text>
            <Button onClick={handleDeposit} mt="8px" as="a" variant="secondary">DEPOSIT 1 cJAWS</Button>
        </Modal>
    )
};

export default DepositcJawsModal;