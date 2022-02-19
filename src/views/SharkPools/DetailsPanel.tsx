import React, { useState, useEffect } from 'react'
import { LinkExternal } from '@rug-zombie-libs/uikit'
import { sharkPoolById, bnbPriceUsd } from 'redux/get'
import { useSharkpool } from 'hooks/useContract'
import { getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { useGetNftById } from '../../state/hooks'

interface DetailsPanelProps {
  id: number
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ id }) => {
  const [unlockFee, setUnlockFee] = useState(0)

  const pool = sharkPoolById(id)
  const nft = useGetNftById(pool.nft)

  const poolContract = useSharkpool(id)

  useEffect(() => {
    poolContract.methods
      .unlockFeeInBnb()
      .call()
      .then((res) => {
        setUnlockFee(parseFloat(getFullDisplayBalance(new BigNumber(res), 18, 4)))
      })
  })

  return (
    <div className="rug-indetails">
      <div className="direction-column imageColumn">
        <div className="sc-iwajpm dcRUtg">
          {nft.type === 'image' ? (
            <img src={nft.path} alt="NFT" className="sc-cxNHIi bjMxQn" />
          ) : (
            <video width="100%" autoPlay loop>
              <source src={nft.path} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <div className="direction-column">
        <span className="indetails-type">{nft.description}</span>
        <span className="indetails-title">
          <LinkExternal bold={false} small href={nft.artist.twitter ? nft.artist.twitter : nft.artist.instagram}>
            View NFT Artist
          </LinkExternal>
        </span>
        <br />
        <span className="indetails-title">What is {pool.project.name}?</span>
        <br />
        <span className="indetails-value">{pool.project.description}</span>

        <br />
        {pool.project.additionalDetails.map((details) => {
          return (
            <>
              <LinkExternal href={details.url}>{details.name}</LinkExternal>
              <br />
            </>
          )
        })}
      </div>
      <div className="direction-column">
        <span className="indetails-type">
          Unlock Fees: {unlockFee} BNB ({(unlockFee * bnbPriceUsd()).toFixed(2)} in USD)
        </span>
        <span className="indetails-title">
          NFT Minting Time:<span className="indetails-value">{pool.mintTime}</span>
        </span>
        <span className="indetails-title">
          Minimum Stake:
          <span className="indetails-value">
            {getFullDisplayBalance(pool.poolInfo.minStake)} {pool.stakeToken.symbol}
          </span>
        </span>
        <span className="indetails-title">
          Maximum Stake:
          <span className="indetails-value">
            {getFullDisplayBalance(pool.poolInfo.maxStake)} {pool.stakeToken.symbol}
          </span>
        </span>
        <span className="indetails-title">
          Deposit Fee:<span className="indetails-value">{pool.poolInfo.depositTaxRate.toString()}%</span>
        </span>
        <span className="indetails-value">Please Note: These pools are subject to a tax on the deposited amount</span>
      </div>
    </div>
  )
}

export default DetailsPanel
