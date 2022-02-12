/* eslint-disable no-param-reassign */
import React, {useState} from 'react'
import styled from 'styled-components'
import ArrowUpIcon from "../../../../../images/Group 2121.png";
import ArrowDownIcon from "../../../../../images/Group 188.png";
import EthIcon from "../../../../../images/icons/Icon awesome-ethereum.svg";


const Offers: React.FC = () => {

    const [showOffers, setShowOffers] = useState(false)

    const toggleShowOffers = () => {
        setShowOffers(!showOffers)
    }

    const offers = [
        {
            price: 13,
            token: "BNB",
            price_usd: "578",
            floor_difference: "99.9% below",
            expiry: 3,
            from: "DeshaeFrostNft"
        },
        {
            price: 13,
            token: "BNB",
            price_usd: "578",
            floor_difference: "99.9% below",
            expiry: 3,
            from: "DeshaeFrostNft"
        },
        {
            price: 13,
            token: "BNB",
            price_usd: "578",
            floor_difference: "99.9% below",
            expiry: 3,
            from: "DeshaeFrostNft"
        }
    ]

    return (
        <>
            <div className="offers-container">
                <div className="description-heading">
                    <h2 className="width-90">Offers</h2>
                    <button type="button" onClick={toggleShowOffers} className="arrow-icon">
                        <img src={showOffers ? ArrowUpIcon : ArrowDownIcon} alt="arrow-icon"/>
                    </button>
                </div>
                {
                    showOffers ?
                        (
                            <div className="offers-details-container">
                                <table className="previous-listings-table">
                                    <tr style={{borderBottom: "2px solid #777BAB"}}>
                                        <th>
                                            <text className="text-bold">Price</text>
                                        </th>
                                        <th>
                                            <text className="text-bold">USD Price</text>
                                        </th>
                                        <th>
                                            <text className="text-bold">Floor Difference</text>
                                        </th>
                                        <th>
                                            <text className="text-bold">Expiration</text>
                                        </th>
                                        <th>
                                            <text className="text-bold">From</text>
                                        </th>
                                    </tr>
                                    {
                                        offers.map((offer) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <div className="flex-container items-center">
                                                            <img src={EthIcon} alt="coin-icon" className="coin-icon"/>&nbsp;
                                                            <text className="text-white font-size-15">{offer.price} {offer.token}</text>
                                                        </div>
                                                    </td>
                                                    <td><text className="text-white font-size-15">${offer.price_usd}</text></td>
                                                    <td><text className="text-white font-size-15">${offer.floor_difference}</text></td>
                                                    <td><text className="text-white font-size-15">{offer.expiry} days</text></td>
                                                    <td><text className="text-highlighted font-size-15">{offer.from}</text></td>
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

export default Offers
