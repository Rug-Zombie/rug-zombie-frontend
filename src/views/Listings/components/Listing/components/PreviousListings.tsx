/* eslint-disable no-param-reassign */
import React, {useState} from 'react'
import styled from 'styled-components'
import ArrowUpIcon from "../../../../../images/Group 2121.png";
import ArrowDownIcon from "../../../../../images/Group 188.png";
import EthIcon from "../../../../../images/icons/Icon awesome-ethereum.svg";


const PreviousListing: React.FC = () => {

    const [showListings, setShowListings] = useState(false)

    const toggleShowListings = () => {
        setShowListings(!showListings)
    }

    const previousListings = [
        {
            price: 13,
            token: "BNB",
            price_usd: "578",
            expiry: 3,
            from: "DeshaeFrostNft"
        },
        {
            price: 13,
            token: "BNB",
            price_usd: "578",
            expiry: 3,
            from: "DeshaeFrostNft"
        },
        {
            price: 13,
            token: "BNB",
            price_usd: "578",
            expiry: 3,
            from: "DeshaeFrostNft"
        }
    ]

    return (
        <>
            <div className="previous-listings-container">
                <div className="description-heading">
                    <h2 className="width-90">Listings</h2>
                    <button type="button" onClick={toggleShowListings} className="arrow-icon">
                        <img src={showListings ? ArrowUpIcon : ArrowDownIcon} alt="arrow-icon"/>
                    </button>
                </div>
                {
                    showListings ?
                        (
                            <div className="previous-listings-details-container">
                                <table className="previous-listings-table">
                                    <tr style={{borderBottom: "2px solid #777BAB"}}>
                                        <th>
                                            <text className="text-bold">Price</text>
                                        </th>
                                        <th>
                                            <text className="text-bold">USD Price</text>
                                        </th>
                                        <th>
                                            <text className="text-bold">Expiration</text>
                                        </th>
                                        <th>
                                            <text className="text-bold">From</text>
                                        </th>
                                        <th>
                                            <text/>
                                        </th>
                                    </tr>
                                    {
                                        previousListings.map((listing) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <div className="flex-container items-center">
                                                            <img src={EthIcon} alt="coin-icon" className="coin-icon"/>&nbsp;
                                                            <text className="text-white font-size-15">{listing.price} {listing.token}</text>
                                                        </div>
                                                    </td>
                                                    <td><text className="text-white font-size-15">${listing.price_usd}</text></td>
                                                    <td><text className="text-white font-size-15">{listing.expiry} days</text></td>
                                                    <td><text className="text-highlighted font-size-15">{listing.from}</text></td>
                                                    <td className="listing-table-last-column">
                                                        <button type="button" className="buy-button">
                                                            <text className="text-white text-bold">Buy</text>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                            </div>
                        ) : null
                }
            </div>
        </>
    )

}

export default PreviousListing
