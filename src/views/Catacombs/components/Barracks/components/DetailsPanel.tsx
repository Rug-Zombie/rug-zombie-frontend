import React from 'react';
import { LinkExternal } from '@catacombs-libs/uikit';
import {nftById, barrackById} from 'redux/get';
import { getFullDisplayBalance } from 'utils/formatBalance';
import numeral from 'numeral';
import BigNumber from "bignumber.js";
// import {formatDuration} from "../../../../../utils/timerHelpers";
// import getTimePeriods from "../../../../../utils/getTimePeriods";
// import {useBarracksContract} from "../../../../../hooks/useContract";

interface DetailsPanelProps {
    id: number
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ id }) => {

    const barrack = barrackById(id);
    // const barracksContract = useBarracksContract();
    // const [maxStake, setMaxStake] = useState(0);
    // const [depositFee, setDepositFee] = useState(0);
    // const [unlockThreshold, setUnlockThreshold] = useState(0);
    // // time required to mint nft , barracks reaches threshold amount and is locked during this time.
    // const [lockTime, setLockTime] = useState(0);
    // const [locked, setLocked] = useState(false);

    // useEffect(() => {
    //     barracksContract.methods.barrackInfo(id).call()
    //         .then((res) => {
    //             setMaxStake(parseFloat(getFullDisplayBalance(new BigNumber(res.maximum), 18, 2)));
    //             setDepositFee(numeral(res.feePercentage).format('( 0.00 a)'));
    //             setUnlockThreshold(parseFloat(getFullDisplayBalance(new BigNumber(res.lockAmount), 18, 2)));
    //             setLocked(res.locked);
    //         })
    // })

    const nft = nftById(barrack.nft);

    return(
        <div className="rug-indetails">
            <div className="direction-column imageColumn">
                <div className="sc-iwajpm dcRUtg">
                    {nft.type === 'image' 
                        ? <img src={nft.path} alt="NFT" className="sc-cxNHIi bjMxQn" />
                        : <video width="100%" autoPlay loop>
                            <source src={nft.path} type="video/mp4"/>
                          </video>}
                </div>
            </div>
            <div className="direction-column">
                <span className="indetails-type" style={{ textAlign: 'initial'}}>{nft.description}</span>
                <span className="barracks-indetails-title">
                    <LinkExternal bold={false} small href={nft.artist.twitter ? nft.artist.twitter : nft.artist.instagram}>
                        View NFT Artist
                    </LinkExternal>
                </span>
                <br/>
                <span className="barracks-indetails-title">{barrack.name}</span>
                <br/>
                <span className="barracks-indetails-value">{barrack.description}</span>

                <br/>
            </div>
            <div className="direction-column">
                <span className="barracks-indetails-title">Unlock Threshold:<span className="indetails-value">{parseFloat(getFullDisplayBalance(barrack.barrackInfo.lockThreshold, 18, 2))} {barrack.token.symbol}</span></span>
                <span className="barracks-indetails-title">Maximum Stake:<span className="indetails-value">{parseFloat(getFullDisplayBalance(barrack.barrackInfo.maxStake, 18, 2))} {barrack.token.symbol}</span></span>
                <span className="barracks-indetails-title">Deposit Fee:<span className="indetails-value">{numeral(barrack.barrackInfo.depositFeePercentage).format('( 0.00 a)')}%</span></span>
                <span className="barracks-indetails-title">NFT Minting Time:<span className="indetails-value">{barrack.nftMintingTime}%</span></span>
                <span className="barracks-indetails-value">Please Note: These pools are subject to a tax on the deposited amount.</span>
            </div>
        </div>
    );
}

export default DetailsPanel;