import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {ethers} from "ethers";
import {BaseLayout} from '@catacombs-libs/uikit';
import {rugMarketListingById, account} from 'redux/get'
import {useTranslation} from 'contexts/Localization';
import numeral from 'numeral';
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
    const zmbeContract = useZombie();
    console.log(listing.owner, '  < === listing owner')
    console.log(wallet, '  < === wallet')

    const tokenImage = (token: Token) => {
        return `images/tokens/${token.symbol}.png`
    }

    useEffect(() => {
        zmbeContract.methods.allowance(wallet, getRugMarketAddress()).call()
            .then(res => {
                if (parseInt(res.toString()) !== 0) {
                    setIsApproved(true);
                } else {
                    setIsApproved(false);
                }
            });
    });

    const handleApprove = () => {
        console.log(' handle approve')
        zmbeContract.methods.approve(getRugMarketAddress(), ethers.constants.MaxUint256).send({from: wallet})
            .then(() => {
                    toastSuccess(t(`Approved ZMBE`));
                    setIsApproved(true);
                }
            );
    }

    const handleBuy = () => {
        rugMarketContract.methods.buy(id).send({'from': wallet})
            .then(res => {
                toastSuccess(t(`Swap successfull`));
            })
    }

    const handleCancel = () => {
        rugMarketContract.methods.cancel(id).send({'from': wallet})
            .then(res => {
                toastSuccess(t(`Listing Cancelled`));
            });
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
                        {
                            isOwner ? <button onClick={handleCancel}
                                              style={{marginRight: '10px', color: 'white', border: '2px solid white'}}
                                              className="btn w-100" type="button">Cancel listing
                            </button> : null
                        }
                    </DisplayFlex>
                </td>
                <td className='barrack-td-width-10'>
                    <DisplayFlex>
                        {
                            !isApproved ? <button onClick={handleApprove}
                                                  style={{
                                                      marginRight: '15%',
                                                      color: 'white',
                                                      border: '2px solid white'
                                                  }}
                                                  className="btn w-100" type="button">Approve ZMBE
                            </button> : <button onClick={handleBuy}
                                                style={{marginRight: '15%', color: 'white', border: '2px solid white'}}
                                                className="btn w-100" type="button">Swap
                            </button>
                        }
                    </DisplayFlex>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default TableList;