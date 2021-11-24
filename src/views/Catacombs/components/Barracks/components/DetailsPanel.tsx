import React from 'react';
import { LinkExternal } from '@catacombs-libs/uikit';
import {nftById, barrackById} from 'redux/get';
import { getFullDisplayBalance } from 'utils/formatBalance';
import {formatDuration} from "../../../../../utils/timerHelpers";
import getTimePeriods from "../../../../../utils/getTimePeriods";

interface DetailsPanelProps {
    id: number
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ id }) => {

    const barrack = barrackById(id);
    console.log(barrack.barrackInfo, ' <======================')
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
                <span className="indetails-type">{nft.description}</span>
                <span className="indetails-title">
                    <LinkExternal bold={false} small href={nft.artist.twitter ? nft.artist.twitter : nft.artist.instagram}>
                        View NFT Artist
                    </LinkExternal>
                </span>
                <br/>
                <span className="indetails-title">{barrack.name}</span>
                <br/>
                <span className="indetails-value">{barrack.description}</span>

                <br/>
            </div>
            <div className="direction-column">

                <span className="indetails-title">Maximum Stake:<span className="indetails-value">{getFullDisplayBalance(barrack.barrackInfo.maxStake)} {barrack.token.symbol}</span></span>
                <span className="indetails-title">Deposit Fee:<span className="indetails-value">{barrack.barrackInfo.depositFeePercentage}%</span></span>
                <span className="indetails-value">Please Note: These pools are subject to a tax on the deposited amount.</span>
            </div>
        </div>
    );
}

export default DetailsPanel;