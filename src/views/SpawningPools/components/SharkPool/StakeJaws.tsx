import React, { useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { BaseLayout, useModal } from '@rug-zombie-libs/uikit';
import { useERC20 } from 'hooks/useContract';
import useTokenBalance from 'hooks/useTokenBalance';
import { account } from 'redux/get';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import { getFullDisplayBalance } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import setup, { useSharkpool } from './SharkSetup';
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
}`

interface StakeJawsProps {
    unlocked: boolean,
    amount: BigNumber,
    allowance: BigNumber,
    jawsPrice: number,
    minimumStake: BigNumber,
    updateResult?: any
}

const StakeJaws: React.FC<StakeJawsProps> = ({ unlocked, amount, allowance, jawsPrice, minimumStake, updateResult }) => {
    const wallet = account();

    const { toastSuccess } = useToast();
    const { t } = useTranslation();

    const [isUnlocked, setUnlocked] = useState(unlocked);
    const [allowed, setAllowed] = useState(allowance);

    const jawsContract = useERC20(setup.jaws);
    const sharkpoolContract = useSharkpool();
    
    const jawsBalance = useTokenBalance(setup.jaws);

    const [handleIncreaseStake] = useModal(
        <IncreaseStakeModal balance={amount} minimumStake={minimumStake} jawsPrice={jawsPrice} jawsBalance={jawsBalance}
            updateResult={updateResult} />
    )

    const [handleDecreaseStake] = useModal(
        <DecreaseStakeModal balance={amount} minimumStake={minimumStake} jawsPrice={jawsPrice} updateResult={updateResult} />
    )

    const handleUnlock = () => {
        if (wallet) {
            sharkpoolContract.methods.unlockFeeInBnb().call()
                .then(res => {
                    sharkpoolContract.methods.unlock().send({ from: wallet, value: res })
                        .then(() => {
                            toastSuccess(t('Pool unlocked'));
                            setUnlocked(true);
                            updateResult();
                        });
                });
        }
    }

    const handleApprove = () => {
        if(wallet) {
            jawsContract.methods.approve(setup.pool, ethers.constants.MaxUint256).send({ from: wallet })
                .then(() => {
                    toastSuccess(t('Approved cJAWS'));
                    setAllowed(new BigNumber(ethers.constants.MaxUint256.toString()));
                    updateResult();
                });
        }
    };

    const renderButtons = () => {
        if (!wallet) {
            return (<span className="total-earned text-shadow">Connect Wallet</span>);
        }

        if (!isUnlocked) {
            return (<button onClick={handleUnlock} className="btn btn-disabled w-100" type="button">UNLOCK</button>);
        }

        if (new BigNumber(allowed).isZero() && !isUnlocked) {
            return (<button onClick={handleApprove} className="btn btn-disabled w-100" type="button">APPROVE</button>);
        }

        return(
            <div>
                <DisplayFlex>
                    <span style={{ paddingRight: '50px' }} className="total-earned text-shadow">{getFullDisplayBalance(new BigNumber(amount), 18, 4)}</span>
                    <button onClick={handleDecreaseStake} style={{ marginRight: '10px' }} className="btn w-100" type="button">-</button>
                    <button onClick={handleIncreaseStake} className="btn w-100" type="button">+</button>
                </DisplayFlex>
            </div>
        );
    };

    return (
        <div className="frank-card">
            <div className="small-text">
                <span className="white-color">JAWS STAKING</span>
            </div>
            <div className="space-between">
                {renderButtons()}
            </div>            
        </div>
    )
};

export default StakeJaws;