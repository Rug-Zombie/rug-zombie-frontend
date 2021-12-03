import React from 'react';
import { Button } from '@rug-zombie-libs/uikit';
import {account, barrackById} from 'redux/get';
import { formatDuration } from 'utils/timerHelpers';
import { BIG_ZERO } from 'utils/bigNumber';
import {useBarracksContract} from 'hooks/useContract';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';

interface MintTimerPanelProps {
    id: number,
    updateResult: any
}

const MintTimerPanel: React.FC<MintTimerPanelProps> = ({ id, updateResult }) => {
    const wallet = account();
    const barrack = barrackById(id);
    const barracksContract = useBarracksContract();
    const { toastSuccess } = useToast();
    const { t } = useTranslation();

    const currentDate = Math.floor(Date.now() / 1000);
    const nftMintDateFixed = Number(barrack.barrackInfo.timeLocked) + Number(barrack.barrackInfo.lockTime);
    const initialNftTime = nftMintDateFixed - currentDate;

    const onMintNft = () => {
        barracksContract.methods.claimNftAndRefundLockedAmount(id).send({ from: wallet })
            .then(() => {
                updateResult(id);
                toastSuccess(t('Minted NFT'));
            });
    }

    const renderPanel = () => {
        if (!wallet) {
            return (<span className="total-earned white-color">Connect Wallet</span>);
        }
        // check if barrack is locked
        if (barrack.barrackInfo.locked) {
            // if barrack locked then user deposit anything?
            if (barrack.barrackUserInfo.depositedAmount.eq(BIG_ZERO)) {
                return(<span className="total-earned white-color">You didn&apos;t stake anything.</span>)
            }
            // if user deposited then has the time to mint nft came
            if (nftMintDateFixed > currentDate) {
                return (<Button className='btn w-100' onClick={onMintNft}>Mint NFT</Button>)
            }
            // else show time left to mint the nft
            return (
                <div>
                    <div className="small-text">
                        <span className="white-color">NFT Timer</span>
                    </div>
                    <span className="total-earned text-shadow" style={{fontSize: "20px"}}>{formatDuration(initialNftTime)}</span>
                </div>
            )
        }
        return(<span className="total-earned white-color">Threshold not met yet.</span>)
    }

    return(
        <div className="barracks-frank-card">
            {renderPanel()}
        </div>
    )

}

export default MintTimerPanel;