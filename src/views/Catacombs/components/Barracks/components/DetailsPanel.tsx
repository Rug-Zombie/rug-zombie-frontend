import React from 'react';
import { LinkExternal } from '@catacombs-libs/uikit';
import {nftById, barrackById} from 'redux/get';
import {getBalanceAmount, getFullDisplayBalance} from 'utils/formatBalance';
import numeral from 'numeral';

interface DetailsPanelProps {
    id: number
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ id }) => {

    const barrack = barrackById(id);
    const remainingStake = Number(getBalanceAmount(barrack.barrackInfo.lockThreshold)) - Number(getBalanceAmount(barrack.barrackInfo.totalStaked));
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
                <span className="barracks-indetails-title">Lock Threshold:<span className="indetails-value">{parseFloat(getFullDisplayBalance(barrack.barrackInfo.lockThreshold, 18, 2))} {barrack.token.symbol}</span></span>
                <span className="barracks-indetails-title">Minimum Stake:<span className="indetails-value">{parseFloat(getFullDisplayBalance(barrack.barrackInfo.minStake, 18, 2))} {barrack.token.symbol}</span></span>
                <span className="barracks-indetails-title">Remaining Stake:<span className="indetails-value">{remainingStake < 0 ? 0 : remainingStake.toFixed(2)} {barrack.token.symbol}</span></span>
                <span className="barracks-indetails-title">Deposit Fee:<span className="indetails-value">{numeral(barrack.barrackInfo.depositFeePercentage).format('( 0.00 a)')}%</span></span>
                <span className="barracks-indetails-title">NFT Minting Time After Barrack Is Locked:<span className="indetails-value">{barrack.nftMintingTime}</span></span>
                <span className="barracks-indetails-value">Please Note: Barracks are subject to a tax on the each deposited amount.</span>
            </div>
        </div>
    );
}

export default DetailsPanel;