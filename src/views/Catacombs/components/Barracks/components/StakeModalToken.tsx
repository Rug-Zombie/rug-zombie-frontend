import React, {useEffect, useState} from 'react';
import {Flex, Image, Modal, Text} from '@catacombs-libs/uikit';
import {BigNumber} from 'bignumber.js';
import {useBarracksContract} from 'hooks/useContract';
import {account, barrackById} from 'redux/get';
import useToast from 'hooks/useToast';
import {useTranslation} from 'contexts/Localization';
import {ethers} from "ethers";
import {getDecimalAmount, getFullDisplayBalance} from "../../../../../utils/formatBalance";
import {getAddress, getBarracksAddress} from "../../../../../utils/addressHelpers";
import {getBep20Contract,} from "../../../../../utils/contractHelpers";
import useTokenBalance from "../../../../../hooks/useTokenBalance";
import {BarrackModalProps} from "../modalProps";


const StakeModalToken: React.FC<BarrackModalProps> = ({id, updateResult, onDismiss}) => {
    const barrack = barrackById(id);
    const [isApproved, setIsApproved] = useState(false);
    const [approveButtonDisabled, setApproveButtonDisabled] = useState(false);
    const [depositAmount, setDepositAmount] = useState(new BigNumber(0));
    const [buttonDisabled, setbuttonDisabled] = useState(true);
    const [buttonText, setButtonText] = useState(`Approve ${barrack.token.symbol} first`);
    const barracksContract = useBarracksContract();
    const wallet = account();
    const {toastSuccess} = useToast();
    const {t} = useTranslation();
    const minStake = getFullDisplayBalance(barrack.barrackInfo.minStake, 18, 2);
    const tokenContract = getBep20Contract(getAddress(barrack.token.address));
    const tokenBalance = useTokenBalance(getAddress(barrack.token.address));


    useEffect(() => {
        tokenContract.methods.allowance(wallet, getBarracksAddress()).call()
            .then(res => {
                if (parseInt(res.toString()) !== 0) {
                    setIsApproved(true);
                    setApproveButtonDisabled(true);
                    setbuttonDisabled(false);
                    setButtonText(`Amount should be more than minimum.`);
                } else {
                    setIsApproved(false);
                    setApproveButtonDisabled(false);
                    setbuttonDisabled(true);
                    setButtonText(`Approve ${barrack.token.symbol} first`);
                }
            });
    });

    const handleDeposit = () => {
        if (isApproved) {
            barracksContract.methods.depositToken(getAddress(barrack.token.address), id, depositAmount).send({
                from: wallet
            })
                .then(() => {
                    updateResult(id);
                    toastSuccess(t(`${depositAmount} ${barrack.token.symbol} STAKED`));
                    onDismiss();
                });
        } else {
            toastSuccess(t(`Approve ${depositAmount} ${barrack.token.symbol} First`));
        }
    };

    const handleApprove = () => {
        tokenContract.methods.approve(getBarracksAddress(), ethers.constants.MaxUint256).send({from: wallet})
            .then(() => {
                    toastSuccess(t(`Approved ${barrack.token.symbol}`));
                    setIsApproved(true);
                    setApproveButtonDisabled(true);
                    setButtonText('Amount should be more than minimum.');
                }
            );
    }

    const handleDepositInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value || '0'
        if (Number(inputValue) < Number(minStake)) {
            setButtonText('Amount should be more than minimum.');
            setbuttonDisabled(true)
        } else {
            setbuttonDisabled(false)
            setButtonText(`Stake ${barrack.token.symbol}`);
            setDepositAmount(getDecimalAmount(new BigNumber(inputValue)));
        }
    }

    return (
        <Modal onDismiss={onDismiss} title={`Stake ${barrack.token.symbol}`} className="color-white">
            <Flex alignItems="center" justifyContent="space-between" mb="8px">
                <Flex alignItems="center" minWidth="70px">
                    <Image src={`/images/tokens/${barrack.token.symbol}.png`} width={24} height={24}
                           alt={`${barrack.token.symbol}`}/>
                    <Text ml="4px" style={{color: 'white'}} bold>{barrack.token.symbol}</Text>
                </Flex>
            </Flex>
            <Text mt="8px" ml="auto" bold color="tertiary" fontSize="14px" mb="8px" style={{color: 'white'}}>
                To enter this barrack, you must stake a minimum
                of {minStake} {barrack.token.symbol} as part of
                the unlock process.
            </Text>
            {
                Number(tokenBalance) > 0 ?
                    <div>
                        <button type="button" className="barracks-deposit-button" onClick={handleApprove}
                                disabled={approveButtonDisabled}>
                            APPROVE {barrack.token.symbol}
                        </button>
                        <input className="barracks-deposit-input" type="number" placeholder="Enter amount here."
                               disabled={buttonDisabled}
                               onChange={handleDepositInputChange}/>
                        <button type="button" className="barracks-deposit-button" onClick={handleDeposit}
                                disabled={buttonDisabled}>
                            {buttonText}
                        </button>
                    </div> : <a href="https://swap.rugzombie.io/" type="button" className="barracks-deposit-button">Get {barrack.token.symbol}</a>
            }
        </Modal>
    );
}

export default StakeModalToken;