import React, { useState } from 'react';
import { useModal } from '@rug-zombie-libs/uikit';
import { account } from 'redux/get';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import { useERC20 } from 'hooks/useContract';
import { getAddress } from 'utils/addressHelpers';
import { BIG_TEN } from 'utils/bigNumber';
import BigNumber from 'bignumber.js';
import sharkpools from './SharkSetup';
import DepositModal from './DepositModal';

interface DepositBoxProps {
    id: number,
    requiresDeposit: boolean,
    deposited: boolean,
    allowance: BigNumber,
    onDeposit: any
}

const DepositBox: React.FC<DepositBoxProps> = ({ id, requiresDeposit, deposited, allowance, onDeposit }) => {
    const [allowed, setAllowed] = useState(allowance);

    const { toastSuccess } = useToast();
    const { t } = useTranslation();
    const pool = sharkpools.find(a => a.id === id);
    const wallet = account();
    const depositContract = useERC20(getAddress(pool.depositToken.address));

    const handleApprove = () => {
        if(wallet) {
            depositContract.methods.approve(pool.pool, BIG_TEN.pow(18).toString()).send({ from: wallet })
                .then(() => {
                    toastSuccess(t('Approved cJAWS'));
                    setAllowed(new BigNumber(BIG_TEN.pow(18).toString()));
                });
        }
    };

    const [handleDeposit] = useModal(
        <DepositModal updateResult={onDeposit} id={id} />
    );

    const renderButtons = () => {
        if (!wallet) {
            return (<span className="total-earned text-shadow">Connect Wallet</span>);
        }

        if (!requiresDeposit) {
            return(<button className="btn w-100" type="button">NO DEPOSIT</button>);    
        }

        if (new BigNumber(allowed).isZero() && !deposited) {
            return (<button onClick={handleApprove} className="btn btn-disabled w-100" type="button">APPROVE</button>);
        }

        if (!deposited) {
            return (<button onClick={handleDeposit} className="btn btn-disabled w-100" type="button">DEPOSIT</button>);
        }        

        return(<button className="btn w-100" type="button">DEPOSITED</button>);
    }

    return(
        <div className='frank-card'>
            <div className='small-text'>
                {requiresDeposit
                    ? <span className='white-color'>DEPOSIT 1 {pool.depositToken.symbol}</span>
                    : <span className='white-color'>NO DEPOSIT REQUIRED</span>
                }
            </div>
            <div className='space-between'>
                {renderButtons()}
            </div>
        </div>
    );
};

export default DepositBox;