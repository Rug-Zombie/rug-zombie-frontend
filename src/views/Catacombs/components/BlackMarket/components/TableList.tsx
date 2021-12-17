import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {BaseLayout, useMatchBreakpoints} from '@catacombs-libs/uikit';
import {coingeckoPrice, barrackById} from 'redux/get'
import numeral from 'numeral';
import {getBalanceAmount, getFullDisplayBalance} from 'utils/formatBalance';
import {Token} from "../../../../../config/constants/types";

const DisplayFlex = styled(BaseLayout)`
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    grid-gap: 0px;
}`

const ArrowIcon = styled(BaseLayout)`
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease 0s;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    position: relative;
    width: 50px;
    height: 50px;
    background-color: rgb(29, 47, 59);
    margin-right: 0.3em;
`

interface TableListProps {
    id: number,
}

const TableList: React.FC<TableListProps> = ({id}) => {

    const {isLg, isXl} = useMatchBreakpoints();
    const isDesktop = isLg || isXl;

    const tokenImage = (token: Token) => {
        return `images/tokens/${token.symbol}.png`
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
                                    <img src="nothing" alt="clearicon" className="icon"/>
                                </div>
                                <div>
                                    <div className="titel">buy rugged tokens for zmbe</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="td-width-17 desktop-view"/>
                {
                    isDesktop ? <td className="barrack-td-width-35">
                        <DisplayFlex>
                            <div className="total-earned">Total Amount Committed :</div>
                        </DisplayFlex>
                    </td> : <td className="barrack-td-width-35" />
                }
                {
                    isDesktop
                        ? <td className='barrack-td-width-10'>
                            <DisplayFlex>
                                <span className='total-earned'>total earned</span>
                                <div className='earned'>token symbol here</div>
                            </DisplayFlex>
                        </td>
                        : null
                }
                {
                    isDesktop
                        ? <td className='barrack-td-width-10'>
                            <DisplayFlex>
                                <span
                                    className='total-earned'>total staked</span>
                                <div className='earned'>TVL</div>
                            </DisplayFlex>
                        </td>
                        : null
                }
            </tr>
            </tbody>
        </table>
    );
}

export default TableList;