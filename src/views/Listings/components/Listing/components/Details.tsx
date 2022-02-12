/* eslint-disable no-param-reassign */
import React, {useState} from 'react'
import styled from 'styled-components'
import {Text, Heading} from "@rug-zombie-libs/uikit";
import UserOutlineIcon from "../../../../../images/icons/Icon feather-user-check.svg"
import "../../../MarketPlace.Styles.css"
import BadgeIcon from "../../../../../images/icons/Icon feather-award.svg"
import TimeIcon from "../../../../../images/icons/Icon feather-clock.svg"
import HeartFilledIcon from "../../../../../images/icons/Icon closed-heart.svg"
import EthIcon from "../../../../../images/icons/Icon awesome-ethereum.svg"

const NftNumber = styled(Heading)`
    color: white;
    font-size: 30px;
`

const Details: React.FC = () => {

    const nftNumber = "20432"
    const likedBy = '3'
    const owner = "Jack Dorsey or Michael Saylor"
    const collectionName = "BoredZombiesAwesomeClub"
    const saleTime = "22 Feb 2022 at 05:32 am EET"
    const price = "45"
    const priceUSD = "2342"
    const symbol = "token symbol"

    return (
        <>
            <div className="details-container">
                <div className="flex-container">
                    <h1 className="nft-number">#{nftNumber}</h1>
                    <button type="button" className="liked-by">
                        <img src={HeartFilledIcon} alt="heart-filled-icon" style={{verticalAlign: "inherit"}}/>
                        &nbsp;&nbsp;&nbsp;
                        <text className="liked-by-text">
                            {likedBy}
                        </text>
                    </button>
                </div>
                <div className="owner-details">
                    <div className="flex-container items-center margin-bottom-3">
                        <img src={UserOutlineIcon} className="user-icon" alt="user-icon"/>&nbsp;
                        <text className="owner">Owned by &nbsp;</text>
                        <text className="owner-name">{owner}</text>
                    </div>
                    <div className="flex-container items-center margin-bottom-5">
                        <img src={BadgeIcon} className="user-icon" alt="user-icon"/>&nbsp;
                        <text className="verified-collection">Verified collection &nbsp;</text>
                        <text className="verified-collection-name">{collectionName}</text>
                    </div>
                </div>
                <div className="sale-details">
                    <div className="sale-time-container">
                        <img src={TimeIcon} alt="time-icon" className="time-icon"/>&nbsp;&nbsp;&nbsp;
                        <text className="sale-time">Sale ends {saleTime}</text>
                    </div>
                    <div className="sale-time-container">
                        <img src={EthIcon} alt="coin-icon" className="coin-icon"/>&nbsp;&nbsp;
                        <text className="sale-price-coin">{price}</text>&nbsp;
                        <text className="sale-price"> (${priceUSD})</text>
                    </div>
                    <div className="sale-time-container">
                        <button type="button" className="place-bid-btn">Place bid</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Details
