import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useModal, BaseLayout } from '@rug-zombie-libs/uikit';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import {account, barrackById, sharkPoolById} from 'redux/get';
import {useBarracksContract, useERC20, useSharkpool} from 'hooks/useContract';
import {getAddress, getBarracksAddress} from 'utils/addressHelpers';
import { getFullDisplayBalance } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import IncreaseStakeModal from './IncreaseStakeModal';
import DecreaseStakeModal from './DecreaseStakeModal';

const DisplayFlex = styled(BaseLayout)`
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    grid-gap: 0px;    
`

interface StakePanelProps {
    id: number,
    updateResult: any
}

const StakePanelTokens: React.FC<StakePanelProps> = ({ id, updateResult }) => {
    const [isApproved, setIsApproved] = useState(false);
    const [deposited, setDeposited] = useState(0);
    const wallet = account();
    const { toastSuccess } = useToast();
    const { t } = useTranslation();
    const barrack = barrackById(id);
    const barracksContract = useBarracksContract();
    const tokenContract = useERC20(getAddress(barrack.token.address));

    useEffect(() => {
        tokenContract.methods.allowance(wallet, getBarracksAddress()).call()
            .then(res => {
                if (parseInt(res.toString()) !== 0) {
                    setIsApproved(true);
                } else {
                    setIsApproved(false);
                }
            });
    })

    useEffect(() => {
        if (wallet) {
            barracksContract.methods.checkDeposited(wallet).call()
                .then(res => {
                    console.log(res, ' <= has deposited');
                    setDeposited(res);
                })
        }
    })

    const handleDeposit = () => {
        console.log(' handle deposit called' );
    //   if(wallet) {
    //     poolContract.methods.unlockFeeInBnb().call()
    //       .then(res => {
    //         poolContract.methods.unlock().send({ from: wallet, value: res })
    //           .then(() => {
    //             toastSuccess(t('Pool unlocked'));
    //             updateResult(id);
    //           });
    //       });
    //   }
    }

    const handleApprove = () => {
        console.log('handle approve');
        // useERC20(getAddress(barrack.token.address)).methods.approve(getBarracksAddress(), ethers.constants.MaxUint256).send({ from: wallet })
        //     .then(() => {
        //         toastSuccess(t(`Approved ${barrack.token.symbol}`));
        //         setIsApproved(true);
        //     });
    }

    const [handleIncreaseStake] = useModal(
        <IncreaseStakeModal id={id} updateResult={updateResult} />
    )

    const [handleDecreaseStake] = useModal(
        <DecreaseStakeModal id={id} updateResult={updateResult} />
    )

    const RenderButtons = () => {
        if (!wallet) {
            return (<span className="total-earned text-shadow">Connect Wallet</span>);
        }

        if (deposited > 0) {
            return (
                <div>
                    <DisplayFlex>
                        <span style={{ paddingRight: '50px' }} className="total-earned text-shadow">{getFullDisplayBalance(new BigNumber(deposited), barrack.token.decimals, 4)}</span>
                        <button onClick={handleDecreaseStake} style={{ marginRight: '10px' }} className="btn w-100" type="button">-</button>
                        <button onClick={handleIncreaseStake} className="btn w-100" type="button">+</button>
                    </DisplayFlex>
                </div>
            );
        }

        if (!isApproved) {
            return (<button onClick={handleApprove} className="btn btn-disabled w-100" type="button">Approve {barrack.token.symbol}</button>)
        }

        return (
            <button onClick={handleApprove} className="btn btn-disabled w-100" type="button">Deposit {barrack.token.symbol}</button>
        )

    }

    return(
        <div className="barracks-frank-card">
            <div className="small-text">
                <span className="white-color">Deposit</span>
            </div>
            <div className="space-between">
                {RenderButtons()}
            </div>
        </div>
    )
};

export default StakePanelTokens;