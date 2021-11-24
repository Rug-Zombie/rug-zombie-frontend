import React, { useState, useEffect } from 'react';
import { account, sharkPoolById } from 'redux/get';
import { useModal } from '@rug-zombie-libs/uikit';
import { useERC20 } from 'hooks/useContract';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import { getAddress } from 'utils/addressHelpers';
import { BIG_TEN } from 'utils/bigNumber';
import DepositModal from './DepositModal';

interface DepositPanelProps {
    id: number,
    updateResult: any
}

const DepositPanel: React.FC<DepositPanelProps> = ({ id, updateResult }) => {
    const pool = sharkPoolById(id);

    const [isApproved, setIsApproved] = useState(false);

    const wallet = account();
    const { toastSuccess } = useToast();
    const { t } = useTranslation();    
    const tokenContract = useERC20(getAddress(pool.depositToken.address));

    useEffect(() => {        
        if (pool.poolInfo.requiresDeposit) {            
            tokenContract.methods.allowance(wallet, getAddress(pool.address)).call()
                .then(res => {
                    if (parseInt(res.toString()) !== 0) {
                        setIsApproved(true);
                    } else {
                        setIsApproved(false);
                    }
                });
        }
    }, [ pool, tokenContract, wallet, setIsApproved ]);

    const handleApprove = () => {
        if(wallet) {
            if (pool.poolInfo.requiresDeposit) {
                tokenContract.methods.approve(getAddress(pool.address), BIG_TEN.pow(18).toString()).send({ from: wallet })
                    .then(() => {
                        toastSuccess(t(`Approved ${pool.depositToken.symbol}`));
                        setIsApproved(true);
                    });
            }
        }
    }

    const [handleDeposit] = useModal(
        <DepositModal id={id} updateResult={updateResult} />
    );

    const renderButtons = () => {
        if (!wallet) {
            return (<span className="total-earned text-shadow">Connect Wallet</span>);
        }

        // Using toString() here because, well, doing !pool.poolInfo.requiresDeposit doesn't work for some weird ass reason
        if (pool.poolInfo.requiresDeposit.toString() === "false") {
            return (<span className="total-earned text-shadow">Not required!</span>);
        }

        if (!isApproved && !pool.userInfo.paidDeposit) {
            return (<button onClick={handleApprove} className="btn btn-disabled w-100" type="button">APPROVE</button>);
        }

        if (!pool.userInfo.paidDeposit) {
            return (<button onClick={handleDeposit} className="btn btn-disabled w-100" type="button">DEPOSIT</button>);
        }

        return(<button className="btn w-100" type="button">DEPOSITED</button>);
    }

    return(
        <div className='frank-card'>            
            <div className='small-text'>
                <span className='white-color'>
                    {pool.poolInfo.requiresDeposit 
                        ? <>DEPOSIT 1 {pool.depositToken.symbol}</>
                        : <>NO DEPOSIT REQUIRED</>
                    }
                </span>
            </div>
            <div className='space-between'>
                {renderButtons()}
            </div>
        </div>
    )
}

export default DepositPanel;