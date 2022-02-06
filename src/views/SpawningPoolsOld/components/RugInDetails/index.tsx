import { LinkExternal } from '@rug-zombie-libs/uikit'
import tokens from 'config/constants/tokens';

import { useSpawningPool } from 'hooks/useContract'
import React, { useEffect, useState } from 'react'
import { getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js';
import { registerToken } from 'utils/wallet'
import { bnbPriceUsd, spawningPoolById } from '../../../../redux/get'
import { formatDuration } from '../../../../utils/timerHelpers'


interface RugInDetailsProps {
  id: number,
  bnbInBusd: number,
  zombieUsdPrice: number,
  account: string
}

const RugInDetails: React.FC<RugInDetailsProps> = ({ id, account }) => {
  const { subtitle, poolInfo, project, path, type, withdrawalCooldown, nftRevivalTime, endBlock, artist, rewardToken, endDate } = spawningPoolById(id)
  const spawningPoolContract = useSpawningPool(id);

  const [unlockFee, setUnlockFee] = useState(0);
  const isMetaMaskInScope = !!window.ethereum?.isMetaMask

  useEffect(() => {
    spawningPoolContract.methods.unlockFeeInBnb().call()
      .then((res) => {
        setUnlockFee(parseFloat(getFullDisplayBalance(new BigNumber(res), tokens.zmbe.decimals, 4)));
      })
  })

  const now = Math.floor(Date.now() / 1000)

  return (
    <div key={id} className="rug-indetails">
      <div className="direction-column imageColumn">
        <div className="sc-iwajpm dcRUtg">
          {type === 'image' ? (
            <img src={path} alt="NFT" className="sc-cxNHIi bjMxQn" />
          ) : (
              <video width="100%" autoPlay loop>
                <source src={path} type="video/mp4"/>
              </video>
            )}
        </div>
      </div>
      <div className="direction-column">
        <span className="indetails-type">{subtitle}</span>
        <span className="indetails-title">
          <LinkExternal bold={false} small href={artist.twitter ? artist.twitter : artist.instagram}>
            View NFT Artist
        </LinkExternal>
        </span>
        <br/>
        <span className="indetails-title">
          What is {project.name}?
        </span>
        <br/>
        <span className="indetails-value">{project.description}</span>

        <br/>
        {project.additionalDetails.map(details => {
          return <>
            <LinkExternal href={details.url}>
              {details.name}
            </LinkExternal>
            <br/>
          </>
        })}

      </div>
      <div className="direction-column">
        <span className="indetails-type">Unlock Fees: {unlockFee} BNB
        ({(unlockFee * bnbPriceUsd()).toFixed(2)} in USD)</span>
        <span className="indetails-title">
          Early Withdrawal Fee:
          <span className="indetails-value">5%</span>
        </span>
        <span className="indetails-title">
          Withdrawal Cooldown:
          <span className="indetails-value">{withdrawalCooldown}</span>
        </span>
        <span className="indetails-title">
          NFT Minting Time:
          <span className="indetails-value">{nftRevivalTime}</span>
        </span>
        <span className="indetails-title">
          Minimum Stake:
          <span className="indetails-value">{getFullDisplayBalance(poolInfo.minimumStake)} ZMBE</span>
        </span>
        <span className="indetails-title">
          NFT Rewards End:
          <span className="indetails-value">{formatDuration(endDate - now)}</span>
        </span>
        <span className="indetails-title">
          <LinkExternal href={`https://bscscan.com/block/countdown/${endBlock}`}>
            {rewardToken.symbol} Rewards End Block
          </LinkExternal>
        </span>
        <br />
        <span className="indetails-title">
          {account && isMetaMaskInScope && (
            <button
              className='btn w-auto harvest' type='button'
              onClick={() => registerToken(rewardToken.address[56], rewardToken.symbol, rewardToken.decimals, rewardToken.tokenLogo)}
            >Add {rewardToken.symbol} To MetaMask</button>
          )}
        </span>
      </div>
    </div>
  )
}

export default RugInDetails
