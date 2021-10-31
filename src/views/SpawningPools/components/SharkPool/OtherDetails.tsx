import React from 'react';
import BigNumber from 'bignumber.js';
import nfts from 'redux/nfts';
import { Artist } from 'redux/types';
import { LinkExternal } from '@rug-zombie-libs/uikit';
import { bnbPriceUsd } from 'redux/get';
import { getFullDisplayBalance } from 'utils/formatBalance';

interface OtherDetailsProps {
    nftid: number,
    artist: Artist,
    unlockFee: number,
    mintTime: string,
    minimumStake: BigNumber,
    endBlock: number,
    depositFee: number
}

const OtherDetails: React.FC<OtherDetailsProps> = ({ nftid, artist, unlockFee, mintTime, minimumStake, endBlock, depositFee }) => {
    const nft = nfts.find(a => a.id === nftid);

    return(
        <div className="rug-indetails">
            <div className="direction-column imageColumn">
                <div className="sc-iwajpm dcRUtg">
                    {nft.type === 'image' ? (
                        <img src={nft.path} alt="NFT" className="sc-cxNHIi bjMxQn" />
                    ) : (
                        <video width="100%" autoPlay loop>
                            <source src={nft.path} type="video/mp4"/>
                        </video>
                    )}
                </div>
            </div>
            <div className="direction-column">
                <span className="indetails-type">{nft.description}</span>
                <span className="indetails-title">
                    <LinkExternal bold={false} small href={artist.twitter ? artist.twitter : artist.instagram}>
                        View NFT Artist
                    </LinkExternal>
                </span>
                <br/>
                <span className="indetails-title">
                    Check Out AutoShark
                </span>
                <br/>
                <span className="indetails-value">Update me with better text</span>
                <LinkExternal bold={false} small href='https://autoshark.finance/'>
                    AutoShark Finance
                </LinkExternal>
            </div>
            <div className="direction-column">
                <span className="indetails-type">
                    Unlock Fees: {unlockFee} BNB ({(unlockFee * bnbPriceUsd()).toFixed(2)} in USD)
                </span>
                <span className="indetails-title">
                    Deposit Fees:<span className="indetails-value">{depositFee}%</span><br/>
                    This amount of your deposited JAWS will be burned at the time of deposit.
                </span>
                <span className="indetails-title">
                    NFT Minting Time:<span className="indetails-value">{mintTime}</span>
                </span>
                <span className="indetails-title">
                    Minimum Stake:<span className="indetails-value">{getFullDisplayBalance(minimumStake)} JAWS</span>
                </span>
                <span className="indetails-title">
                    <LinkExternal href={`https://bscscan.com/block/countdown/${endBlock}`}>
                        NFT Minting End Block
                    </LinkExternal>
                </span>
            </div>
        </div>
    )
};

export default OtherDetails;