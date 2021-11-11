import React, { useState, useEffect } from 'react';
import { account, burnGraveById } from 'redux/get';
import { useERC20 } from 'hooks/useContract';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import { getAddress, getDrBurnensteinAddress } from 'utils/addressHelpers';
import { BIG_TEN } from 'utils/bigNumber';

export interface DepositTokenProps {
    id: number,
    updateResult: any
}

const DepositToken: React.FC<DepositTokenProps> = ({ id, updateResult }) => {
    const [isApproved, setIsApproved] = useState(false);

    const { toastSuccess } = useToast();
    const { t } = useTranslation();    

    const wallet = account();
    const grave = burnGraveById(id);
    const tokenContract = useERC20(grave.poolInfo.depositAddress);

    useEffect(() => {        
        tokenContract.methods.allowance(wallet, getDrBurnensteinAddress()).call()
            .then(res => {
                if (parseInt(res.toString()) !== 0) {
                    setIsApproved(true);
                } else {
                    setIsApproved(false);
                }
            });
    }, [ grave, tokenContract, wallet, setIsApproved ]);

    const handleApprove = () => {
        if(wallet) {
            tokenContract.methods.approve(getDrBurnensteinAddress(), BIG_TEN.pow(18).toString()).send({ from: wallet })
                .then(() => {
                    toastSuccess(t(`Approved ${grave.depositToken.symbol}`));
                    setIsApproved(true);
                });
        }
    }

    // const [handleDeposit] = useModal(
    //     <DepositModal id={id} updateResult={updateResult} />
    // );

    const renderButton = () => {
        if (!wallet) {
            return (<span className="total-earned text-shadow">Connect Wallet</span>);
        }

        return(<button className="btn w-100" type="button">DEPOSITED</button>);
    }
    
    return (
        <div className='frank-card'>            
            <div className='small-text'>
                <span className='white-color'>
                    DEPOSIT 1 {grave.depositToken.symbol}
                </span>
            </div>
            <div className='space-between'>
                {renderButton()}
            </div>
        </div>
    );
}

export default DepositToken;