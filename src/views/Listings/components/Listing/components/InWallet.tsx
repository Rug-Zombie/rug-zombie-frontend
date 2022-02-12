/* eslint-disable no-param-reassign */
import React, {useState} from 'react'
import styled from 'styled-components'
import ArrowUpIcon from "../../../../../images/Group 2121.png";
import ArrowDownIcon from "../../../../../images/Group 188.png";


const InWallet: React.FC = () => {

    const [show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    const inWalletNfts = [
        {
            image_src: 'https://ipfs.io/ipfs/QmWBgfBhyVmHNhBfEQ7p1P4Mpn7pm5b8KgSab2caELnTuV',
            tokenID: 123
        },
        {
            image_src: 'https://ipfs.io/ipfs/QmRsJLrg27GQ1ZWyrXZFuJFdU5bapfzsyBfm3CAX1V1bw6',
            tokenID: 846
        },
        {
            image_src: 'https://ipfs.io/ipfs/QmXEqPbvM4aq1SQSXN8DSuEcSo5SseYW1izYQbsGB8yn9x',
            tokenID: 548
        }
    ]

    return (
        <>
            <div className="in-wallet-container">
                <div className="description-heading">
                    <h2 className="width-90">In Wallet</h2>
                    <button type="button" onClick={toggleShow} className="arrow-icon">
                        <img src={show ? ArrowUpIcon : ArrowDownIcon} alt="arrow-icon"/>
                    </button>
                </div>
                {
                    show ?
                        (
                            <div className="in-wallet-details-container">
                                <text className="in-wallet-center-text">You have {inWalletNfts.length} variants of this
                                    NFT
                                </text>
                                <div className="in-wallet-nfts-container">
                                    {
                                        inWalletNfts.map((nft) => {
                                            return (
                                                <div className="in-wallet-nft-images">
                                                    <img src={nft.image_src} alt="not-found" className="in-wallet-nft-image"/>
                                                    <text className="text-highlighted margin-top-10">{nft.tokenID}</text>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ) : null
                }
            </div>
        </>
    )

}

export default InWallet
