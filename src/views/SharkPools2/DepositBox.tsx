import React from 'react';
import { useModal } from '@rug-zombie-libs/uikit';
import { account } from 'redux/get';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import { useERC20 } from 'hooks/useContract';
import { getAddress } from 'utils/addressHelpers';
import { BIG_TEN } from 'utils/bigNumber';
import sharkpools from './SharkSetup';
import DepositModal from './DepositModal';

interface DepositBoxProps {
    id: number,
    onDeposit: any
}

const DepositBox: React.FC<DepositBoxProps> = ({ id, onDeposit }) => {
    const { toastSuccess } = useToast();
    const { t } = useTranslation();
    const wallet = account();    
    const pool = sharkpools.find(a => a.id === id);
    const tokenContract = useERC20(getAddress(pool.stakeToken.address));

    const handleApprove = () => {
        if(wallet) {
            tokenContract.methods.approve(pool.address, BIG_TEN.pow(18).toString()).send({ from: wallet })
                .then(() => {
                    toastSuccess(t('Approved cJAWS'));
                    pool.approvedDeposit = true;
                });
        }
    };

    const [handleDeposit] = useModal(
        <DepositModal id={id} updateResult={onDeposit} />
    );

    const renderButtons = () => {
        if (!wallet) {
            return (<span className="total-earned text-shadow">Connect Wallet</span>);
        }

        if (!pool.requiresDeposit) {
            return (<span className="total-earned text-shadow">Not required!</span>);
        }

        if (!pool.approvedDeposit && !pool.paidDeposit) {
            return (<button onClick={handleApprove} className="btn btn-disabled w-100" type="button">APPROVE</button>);
        }

        if (!pool.paidDeposit) {
            return (<button onClick={handleDeposit} className="btn btn-disabled w-100" type="button">DEPOSIT</button>);
        }

        return(<button className="btn w-100" type="button">DEPOSITED</button>);
    };

    return (
        <div className='frank-card'>
            <div className='small-text'>
                <span className='white-color'>
                    {pool.requiresDeposit 
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
};

export default DepositBox;