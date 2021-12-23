import { LinkExternal } from '@rug-zombie-libs/uikit'
import tokens from 'config/constants/tokens'
import { useDrFrankenstein } from 'hooks/useContract'
import React, { useEffect, useState } from 'react'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount, getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import numeral from 'numeral'
import { registerToken } from 'utils/wallet'
import { bnbPriceUsd, grave } from '../../../../redux/get'
import { formatDuration } from '../../../../utils/timerHelpers'
import Video from '../../../../components/Video'


interface RugInDetailsProps {
  pid: number,
  bnbInBusd: number,
  zombieUsdPrice: number,
  account: string
}

const GraveBottom: React.FC<RugInDetailsProps> = ({
                                                     pid, zombieUsdPrice, account,
                                                   }) => {
  const {
    subtitle,
    rug,
    pcsVersion,
    liquidityDetails,
    path,
    type,
    endDate,
    latestEntryDate,
    isEnding,
    withdrawalCooldown,
    nftRevivalTime,
    poolInfo,
    artist,
    additionalDetails,
  } = grave(pid)
  const drFrankenstein = useDrFrankenstein()
  const [unlockFee, setUnlockFee] = useState(0)
  const isMetaMaskInScope = !!window.ethereum?.isMetaMask

  useEffect(() => {
    drFrankenstein.methods.unlockFeeInBnb(pid).call()
      .then((res) => {
        setUnlockFee(parseFloat(getFullDisplayBalance(new BigNumber(res), tokens.zmbe.decimals, 4)))
      })
  })

  let allocPoint = BIG_ZERO
  if (poolInfo.allocPoint) {
    allocPoint = new BigNumber(poolInfo.allocPoint)
  }

  let liquidity
  if (pcsVersion === 'v1') {
    liquidity = 'Pancakeswap V1'
  } else if (pcsVersion === 'v2') {
    liquidity = 'Pancakeswap V2'
  } else {
    liquidity = liquidityDetails
  }

  return (
    <div key={pid} className='rug-indetails'>
      <div className='direction-column imageColumn'>
        <div className='sc-iwajpm dcRUtg'>
          {type === 'image' ? (
            <img src={path} alt='NFT' className='sc-cxNHIi bjMxQn' />
          ) : (
            <Video path={path} />
          )}
        </div>
      </div>
      <div className='direction-column'>
        <span className='indetails-type'>{subtitle}</span>
        <span className='indetails-title'>
          Weight:
          <span className='indetails-value'>{allocPoint.div(100).toString()}X</span>
        </span>
        <span className='indetails-title'>
          Grave TVL:
          <span
            className='indetails-value'>{numeral(getBalanceAmount(poolInfo.totalStakingTokenStaked).times(zombieUsdPrice)).format('($ 0.00 a)')}</span>
        </span>
        <span className='indetails-title'>
          <LinkExternal bold={false} small href={artist.twitter}>
            View NFT Artist
        </LinkExternal>
        </span>
        <br />
        <span className='indetails-type'>{pid === 0 ? tokens.zmbe.symbol : rug.symbol}</span>
        <span className='indetails-title'>
          Liquidity:
          <span className='indetails-value'>{liquidity}</span>
        </span>
        <br />
        {additionalDetails ? additionalDetails.map(details => {
          return <>
            <LinkExternal href={details.url}>
              {details.name}
            </LinkExternal>
            <br />
          </>
        }) : null}
      </div>
      <div className='direction-column'>
        <span className='indetails-type'>Unlock Fees: {unlockFee} BNB
        ({(unlockFee * bnbPriceUsd()).toFixed(2)} in USD)</span>
        <span className='indetails-title'>
          Early Withdrawal Fee:
          <span className='indetails-value'>5%</span>
        </span>
        <span className='indetails-title'>
          Withdrawal Cooldown:
          <span className='indetails-value'>{withdrawalCooldown}</span>
        </span>
        <span className='indetails-title'>
          NFT Minting Time:
          <span className='indetails-value'>{nftRevivalTime}</span>
        </span>
        <span className='indetails-title'>
          Minimum Stake:
          <span className='indetails-value'>{getFullDisplayBalance(poolInfo.minimumStake)} ZMBE</span>
        </span>
        <br />
        <span className='indetails-title'>
          {account && isMetaMaskInScope && (
            <button
              className='btn w-auto harvest' type='button'
              onClick={() => registerToken('0x50ba8bf9e34f0f83f96a340387d1d3888ba4b3b5', 'ZMBE', 18, 'https://bscscan.com/token/images/rugzombie_32.png')}
            >Add To MetaMask</button>
          )}
        </span>
        <br />
        {isEnding ? <>
          <span className='indetails-title'>
          Latest entry date:
          <span className='indetails-value'>{latestEntryDate}</span>
        </span>
          <span className='indetails-title'>
          Grave ends in:
          <span className='indetails-value'>{formatDuration(endDate - Math.round(Date.now() / 1000))}</span>
        </span>
        </> : null}
      </div>
      {/* <div className="direction-column">
          <a href="/" target="_blank" className="indetails-link">Tutorials goes to gitbook</a>
          <a href="/" target="_blank" className="indetails-link">Fees &amp; Tokenomics goes to gitbook page</a>
          <a href="/" target="_blank" className="indetails-link">View Contract goes to BSC Scan (wait for address)</a>
        </div> */}
    </div>
  )
}

export default GraveBottom
