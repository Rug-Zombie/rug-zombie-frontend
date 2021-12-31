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
    openHandler: any
}

const TableList: React.FC<TableListProps> = ({id, openHandler}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [stakeTokenPrice, setStakeTokenPrice] = useState(0);

    const barrack = barrackById(id);

    useEffect(() => {
        coingeckoPrice(barrack.token.geckoId).then(res => {
            setStakeTokenPrice(res.data[barrack.token.geckoId].usd);
        });
    }, [barrack.token.geckoId, setStakeTokenPrice]);

    const {isLg, isXl} = useMatchBreakpoints();
    const isDesktop = isLg || isXl;

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        openHandler(!isOpen);
    };

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
                                    <img src={tokenImage(barrack.token)} alt="clearicon" className="icon"/>
                                </div>
                                <div>
                                    <div className="titel">{barrack.name}</div>
                                    <div className="small-lable">
                                        <div className="barracks-con-info">{barrack.token.symbol}</div>
                                        {
                                            barrack.isNew ?
                                                <div className='barracks-con-info'
                                                     style={{marginLeft: "4px"}}>NEW!</div> : null
                                        }
                                    </div>
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
                                <span
                                    className='total-earned'>{getFullDisplayBalance(barrack.barrackInfo.totalStaked).toString()}</span>
                                <div className='earned'>{barrack.token.symbol}</div>
                            </DisplayFlex>
                        </td>
                        : null
                }
                {
                    isDesktop
                        ? <td className='barrack-td-width-10'>
                            <DisplayFlex>
                                <span
                                    className='total-earned'>{numeral(getBalanceAmount(barrack.barrackInfo.totalStaked).times(stakeTokenPrice)).format('($ 0.00 a)')}</span>
                                <div className='earned'>TVL</div>
                            </DisplayFlex>
                        </td>
                        : null
                }
                <td className="last-td" style={{paddingRight: '0.5em'}}>
                    <ArrowIcon onClick={toggleOpen}>
                        {
                            isOpen
                                ? (<svg viewBox="0 0 24 24" width="32px" color="ActiveitemMenuNav"
                                        xmlns="http://www.w3.org/2000/svg" className="barrack-arrow-color">
                                    <path
                                        d="M8.11997 14.7101L12 10.8301L15.88 14.7101C16.27 15.1001 16.9 15.1001 17.29 14.7101C17.68 14.3201 17.68 13.6901 17.29 13.3001L12.7 8.7101C12.31 8.3201 11.68 8.3201 11.29 8.7101L6.69997 13.3001C6.30997 13.6901 6.30997 14.3201 6.69997 14.7101C7.08997 15.0901 7.72997 15.1001 8.11997 14.7101Z"/>
                                </svg>)
                                : (<svg viewBox="0 0 24 24" width="32px" color="ActiveitemMenuNav"
                                        xmlns="http://www.w3.org/2000/svg" className="barrack-arrow-color">
                                    <path
                                        d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"/>
                                </svg>)
                        }
                    </ArrowIcon>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default TableList;