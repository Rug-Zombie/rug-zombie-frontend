import React, { useState } from 'react';
import { useModal } from '@rug-zombie-libs/uikit';
import { account } from 'redux/get';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import { useERC20 } from 'hooks/useContract';
import { BIG_TEN } from 'utils/bigNumber';
import setup from './SharkSetup';
import DepositcJawsModal from './DepositcJawsModal';

interface DepositcJawsProps {
    deposited: boolean,
    allowance: BigNumber,
    onDeposit: any
}

const DepositcJaws: React.FC<DepositcJawsProps> = ({ deposited, allowance, onDeposit }) => {
    const wallet = account();
    const cjawsContract = useERC20(setup.cjaws);
    const { toastSuccess } = useToast();
    const { t } = useTranslation();

    const [allowed, setAllowed] = useState(allowance);

    const handleApprove = () => {
        if(wallet) {
            cjawsContract.methods.approve(setup.pool, BIG_TEN.pow(18).toString()).send({ from: wallet })
                .then(() => {
                    toastSuccess(t('Approved cJAWS'));
                    setAllowed(new BigNumber(BIG_TEN.pow(18).toString()));
                });
        }
    };

    const [handleDeposit] = useModal(
        <DepositcJawsModal updateResult={onDeposit} />
    )

    const renderButtons = () => {
        if (!wallet) {
            return (<span className="total-earned text-shadow">Connect Wallet</span>);
        }

        if (new BigNumber(allowed).isZero() && !deposited) {
            return (<button onClick={handleApprove} className="btn btn-disabled w-100" type="button">APPROVE</button>);
        }

        if (!deposited) {
            return (<button onClick={handleDeposit} className="btn btn-disabled w-100" type="button">DEPOSIT</button>);
        }        

        return(<button className="btn w-100" type="button">DEPOSITED</button>);
    };   

    return (
        <div className='frank-card'>
            <div className='small-text'>
                <span className='white-color'>DEPOSIT 1 cJAWS</span>
            </div>
            <div className='space-between'>
                {renderButtons()}
            </div>
        </div>
    )
}

export default DepositcJaws;