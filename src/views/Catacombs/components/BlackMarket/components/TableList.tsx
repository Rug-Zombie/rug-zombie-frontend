import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {ethers} from "ethers";
import {BaseLayout} from '@catacombs-libs/uikit';
import {rugMarketListingById, account, markRugMarketListingSold, cancelRugMarketListing} from 'redux/get'
import {useTranslation} from 'contexts/Localization';
import useToast from 'hooks/useToast';
import {BigNumber} from "bignumber.js";
import {Token} from "../../../../../config/constants/types";
import {useRugMarket, useZombie} from "../../../../../hooks/useContract";
import {getRugMarketAddress} from "../../../../../utils/addressHelpers";
import {getFullDisplayBalance} from "../../../../../utils/formatBalance";

const DisplayFlex = styled(BaseLayout)`
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    grid-gap: 0px;
}`


interface TableListProps {
    id: number,
}

const TableList: React.FC<TableListProps> = ({id}) => {

    const {toastSuccess} = useToast();
    const {t} = useTranslation();
    const wallet = account();
    const rugMarketContract = useRugMarket();
    const listing = rugMarketListingById(id);
    const [isApproved, setIsApproved] = useState(false);
    const isOwner = listing.owner === wallet;
    const isSold = listing.state === '1';
    const cancelled = listing.state === '2';
    const zmbeContract = useZombie();

    const tokenImage = (token: Token) => {
        return `images/tokens/${token.symbol}.png`
    }

    useEffect(() => {
        if (wallet) {
            zmbeContract.methods.allowance(wallet, getRugMarketAddress()).call()
                .then(res => {
                    if (parseInt(res.toString()) !== 0) {
                        setIsApproved(true);
                    } else {
                        setIsApproved(false);
                    }
                });
        }
    });

    const handleApprove = () => {
        zmbeContract.methods.approve(getRugMarketAddress(), ethers.constants.MaxUint256).send({from: wallet})
            .then(() => {
                    toastSuccess(t(`Approved ZMBE`));
                    setIsApproved(true);
                    renderButtons()
                }
            );
    }

    const handleBuy = () => {
        rugMarketContract.methods.buy(id).send({'from': wallet})
            .then(() => {
                toastSuccess(t(`Swap successful`));
                markRugMarketListingSold(id);
            })
    }

    const handleCancel = () => {
        rugMarketContract.methods.cancel(id).send({'from': wallet})
            .then(() => {
                toastSuccess(t(`Listing Cancelled`));
                cancelRugMarketListing(id)
            });
    }

    const renderButtons = () => {

        if (cancelled) {
            return (
                <button className="rug-market-listing-buttons" type="button" disabled>Cancelled</button>
            )
        }

        if (isSold) {
            return (
                <button className="rug-market-listing-buttons" type="button" disabled>Sold</button>
            )
        }

        if (isOwner) {
            return (
                <button onClick={handleCancel} className="rug-market-listing-buttons" type="button">Cancel listing</button>
            )
        }

        if (isApproved) {
            return (
                <button onClick={handleBuy} className="rug-market-listing-buttons" type="button">Swap</button>
            )
        }

        return (
            <button onClick={handleApprove} className="rug-market-listing-buttons" type="button">Approve ZMBE</button>
        )
    }

    return (
        <table className="table">
            <tbody>
            <tr>
                <td className="td-width-26 m-width-45">
                    <div className="info-td-one">
                        <div className="into-two-td">
                            <div className="info-1">
                                <div className="info-icon">
                                    <img src={tokenImage(listing.token)} alt="clearicon" className="icon"/>
                                </div>
                                <div>
                                    <div className="titel">
                                        Swap {getFullDisplayBalance(new BigNumber(listing.quantity))} {listing.token.symbol} for {getFullDisplayBalance(new BigNumber(listing.price))} ZMBE
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="td-width-17 desktop-view"/>
                <td className='barrack-td-width-10'>
                    <DisplayFlex>
                        {renderButtons()}
                    </DisplayFlex>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default TableList;