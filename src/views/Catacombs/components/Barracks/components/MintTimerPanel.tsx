import React from 'react';
import { Button } from '@rug-zombie-libs/uikit';
import {account, barrackById} from 'redux/get';
import { formatDuration } from 'utils/timerHelpers';
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
    // today
    const currentDate = Math.floor(Date.now() / 1000);
    // time when barrack was locked
    const barrackLockTime = Number(barrack.barrackInfo.timeLocked);
    // time required after which user can claim nft, barrack will remain locked during this time
    const timeTillBarrackLocked = Number(barrack.barrackInfo.lockTime);
    // time when nft can be claimed.
    const nftCanBeMintedAfter = barrackLockTime + timeTillBarrackLocked;
    // remaining time if barrack is locked but the time required to mint an nft has not passed yet
    const nftTimeRemaining = nftCanBeMintedAfter - currentDate;

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
            if (Number(barrack.barrackUserInfo.depositedAmount) === 0) {
                return(<span className="total-earned white-color">You didn&apos;t stake anything.</span>)
            }
            // if user deposited then has the time to mint nft came
            if (currentDate > nftCanBeMintedAfter) {
                return (<Button className='btn w-100' onClick={onMintNft}>Mint NFT</Button>)
            }
            // else show time left to mint the nft
            return (
                <div>
                    <div className="small-text">
                        <span className="white-color">NFT Timer</span>
                    </div>
                    <span className="total-earned white-color" style={{fontSize: "20px"}}>{formatDuration(nftTimeRemaining)}</span>
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