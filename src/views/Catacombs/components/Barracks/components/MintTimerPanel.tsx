import React from 'react';
import { Button } from '@rug-zombie-libs/uikit';
import {account, barrackById, sharkPoolById} from 'redux/get';
import { formatDuration } from 'utils/timerHelpers';
import { BIG_ZERO } from 'utils/bigNumber';
import {useBarracksContract, useSharkpool} from 'hooks/useContract';
import { useTranslation } from 'contexts/Localization';
import useToast from 'hooks/useToast';

interface MintTimerPanelProps {
    id: number,
    updateResult: any
}

const MintTimerPanel: React.FC<MintTimerPanelProps> = ({ id, updateResult }) => {
    // const wallet = account();
    // const barrack = barrackById(id);
    // const barracksContract = useBarracksContract();
    // const { toastSuccess } = useToast();
    // const { t } = useTranslation();
    //
    // const currentDate = Math.floor(Date.now() / 1000);
    // let nftMintDateFixed = barrack.barrackInfo.nftMintDate;
    //
    // if(pool.userInfo.nftMintDate < 0) {
    //     nftMintDateFixed = currentDate;
    // }
    //
    // const initialNftTime = nftMintDateFixed - currentDate;
    //
    // const onMintNft = () => {
    //     useBarracksContract().methods.claimNft(0).send({ from: wallet })
    //         .then(() => {
    //             updateResult(id);
    //             toastSuccess(t('Minted NFT'));
    //         });
    // }
    //
    // const renderPanel = () => {
    //     if (!wallet) {
    //         return (<span className="total-earned white-color">Connect Wallet</span>);
    //     }
    //
    //     if (!pool.userInfo.paidUnlock) {
    //         return(<span className="total-earned white-color">Locked</span>)
    //     }
    //
    //     if (pool.userInfo.stakedAmount.eq(BIG_ZERO)){
    //         return (<span className="total-earned white-color">Unlocked</span>)
    //     }
    //
    //     if (currentDate >= pool.userInfo.nftMintDate) {
    //         return (<Button className='btn w-100' onClick={onMintNft}>Mint NFT</Button>)
    //     }
    //
    //     return (
    //         <div>
    //             <div className="small-text">
    //                 <span className="white-color">NFT Timer</span>
    //             </div>
    //             <span className="total-earned text-shadow" style={{fontSize: "20px"}}>{formatDuration(initialNftTime)}</span>
    //         </div>
    //     )
    // }
    //
    // return(
    //     <div className="barracks-frank-card">
    //         {renderPanel()}
    //     </div>
    // )

    return(
        <div className="barracks-frank-card">
            <span className="total-earned white-color">Threshold not met yet.</span>
        </div>
    )
}

export default MintTimerPanel;