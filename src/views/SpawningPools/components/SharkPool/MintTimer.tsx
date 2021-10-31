import React from 'react';
import { account } from 'redux/get';
import BigNumber from 'bignumber.js';
import { BIG_ZERO } from 'utils/bigNumber';
import { formatDuration } from 'utils/timerHelpers';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';
import { useSharkpool } from './SharkSetup';

interface MintTimerProps {
    unlocked: boolean,
    amount: BigNumber,
    mintDate: number,
    updateResult?: any
}

const MintTimer: React.FC<MintTimerProps> = ({ unlocked, amount, mintDate, updateResult }) => {
    const sharkpoolContract = useSharkpool();
    const wallet = account();
    const { toastSuccess } = useToast();
    const { t } = useTranslation();

    const currentDate = Math.floor(Date.now() / 1000);

    let nftMintDateFixed = mintDate
    if(mintDate < 0) {
        nftMintDateFixed = currentDate
    }

    const initialNftTime = nftMintDateFixed - currentDate;

    const handleMint = () => {
        if (wallet) {
            sharkpoolContract.methods.withdraw(0).send({ from: wallet })
                .then(() => {
                    updateResult();
                    toastSuccess(t('Claimed NFT'));
                });
        }
    }

    const renderPage = () => {
        if (!unlocked) {
            return (<span className="total-earned text-shadow">LOCKED</span>)
        }

        if (amount.eq(BIG_ZERO)) {
            return(<span className="total-earned text-shadow">UNLOCKED</span>)
        }

        if (currentDate >= mintDate) {
            return(<button onClick={handleMint} className="btn btn-disabled w-100" type="button">MINT NFT</button>)
        }

        return (
                <div>
                    <div className="small-text"><span className="white-color">NFT Timer</span></div>
                    <span className="total-earned text-shadow" style={{fontSize: "20px"}}>{formatDuration(initialNftTime)}</span>
                </div>
            )
    }

    return(
        <div className="frank-card">
            {renderPage()}
        </div>
    )
};

export default MintTimer;