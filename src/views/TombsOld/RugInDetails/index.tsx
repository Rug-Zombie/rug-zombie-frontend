/* eslint-disable react-hooks/rules-of-hooks */
import { Text, Flex, LinkExternal, useMatchBreakpoints } from '@rug-zombie-libs/uikit'
import tokens from 'config/constants/tokens'
import React from 'react'

import BigNumber from 'bignumber.js'
import numeral from 'numeral'
import Video from 'components/Video'
import { Carousel } from 'react-responsive-carousel'
import { tombByPid, tombOverlayByPoolId } from '../../../redux/get'
import { getAddress } from '../../../utils/addressHelpers'
import { APESWAP_ADD_LIQUIDITY_URL, AUTOSHARK_ADD_LIQUIDITY_URL, BASE_ADD_LIQUIDITY_URL } from '../../../config'
import { getId } from '../../../utils'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useGetNftById } from '../../../state/hooks'

interface RugInDetailsProps {
  pid: number,
  lpTokenPrice: BigNumber,
  tvl: BigNumber,
  bracketBStart: number,
  bracketCStart: number
}


const RugInDetails: React.FC<RugInDetailsProps> = ({ pid, tvl, bracketBStart, bracketCStart }) => {
  const tomb = tombByPid(pid)
  const { id, name, withdrawalCooldown, exchange, overlayId, userInfo: { amount }, poolInfo: { allocPoint, totalStaked } } = tomb
  const overlay = overlayId ? tombOverlayByPoolId(getId(overlayId)) : undefined
  const { isLg, isXl } = useMatchBreakpoints()
  const isDesktop = isLg || isXl
  let nftombInfoDiv = null
  let nftombMintingTimeDiv = null
  if (overlay) {
    const { commonId, uncommonId, rareId, legendaryId, mintingTime } = overlay

    const commonNft = useGetNftById(commonId)
    const uncommonNft = useGetNftById(uncommonId)
    const rareNft = useGetNftById(rareId)
    const legendaryNft = useGetNftById(legendaryId)
    const nfts = [legendaryNft, rareNft, uncommonNft, commonNft]

    const brackets = {
      'A': {
        'Common': 70,
        'Uncommon': 15,
        'Rare': 10,
        'Legendary': 5,
      },
      'B': {
        'Common': 50,
        'Uncommon': 25,
        'Rare': 15,
        'Legendary': 10,
      },
      'C': {
        'Common': 20,
        'Uncommon': 30,
        'Rare': 30,
        'Legendary': 20
      },
    }

    let bracket
    if(amount.isZero() || totalStaked.isZero()) {
      bracket = 'Not Staked'
    } else if(amount.div(totalStaked).times(100).lt(bracketBStart)) {
      bracket = 'A'
    } else if(amount.div(totalStaked).times(100).lt(bracketCStart)) {
      bracket = 'B'
    } else {
      bracket = 'C'
    }

    nftombInfoDiv = <div style={{ width: '60%' }}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        className={isDesktop ? '' : 'direction-column imageColumn'}
      >
        {nfts.map(nft => <div key={nft.id}>
          {isDesktop ? <Flex>
            <div style={{ width: '50%' }}>
              {nft.type === 'image' ? (
                <img src={nft.path} alt='NFT' />
              ) : (
                <Video path={nft.path} />
              )}
            </div>
            <Flex paddingLeft='10px' flexDirection='column' alignItems='flex-start' justifyContent='flex-start'
                  justifyItems='flex-start'>
              <Text className='indetails-type' color='white' bold>{nft.name}</Text>
              <Text color='rgb(92, 109, 120)'>Your Bracket: {bracket}</Text>
              <Text color='rgb(92, 109, 120)'>Chance: {brackets[bracket === 'Not Staked' ? 'A' : bracket][nft.rarity]}%</Text>
              <Text color='rgb(92, 109, 120)'>Stake more to increase your odds.</Text>
              <LinkExternal bold={false} small href={nft.artist ? nft.artist.twitter : ''}>
                View NFT Artist
              </LinkExternal>
            </Flex>
          </Flex> : <>
            <div>
              <span className='indetails-type'>{nft.name}</span>
              <div className='sc-iwajpm dcRUtg'>
                {nft.type === 'image' ? (
                  <img src={nft.path} alt='NFT' className='sc-cxNHIi bjMxQn' />
                ) : (
                  <Video path={nft.path} />
                )}
              </div>
            </div>
            <div className='direction-column'>
              <span className='indetails-title'>Your Bracket: {bracket}</span>
              <span className='indetails-title'>Chance: {brackets[bracket === 'Not Staked' ? 'A' : bracket][nft.rarity]}%</span>
              <span className='indetails-title'>Stake more to increase your odds.</span>
          <span className='indetails-title'>
          <LinkExternal bold={false} small href={nft.artist ? nft.artist.twitter : ''}>View NFT Artist</LinkExternal>
        </span>
            </div>
          </>}
        </div>)}
      </Carousel>
    </div>

    nftombMintingTimeDiv = <span className='indetails-title'>
          NFT Minting Time:
          <span className='indetails-value'>{mintingTime}</span>
        </span>
  }


  // eslint-disable-next-line no-nested-ternary
  const quoteTokenUrl = tomb.quoteToken === tokens.wbnb ? tomb.exchange === 'Apeswap' ? 'ETH' : 'BNB' : getAddress(tomb.quoteToken.address)

  let addLiquidityUrl

  if (tomb.exchange === 'Apeswap') {
    addLiquidityUrl = `${APESWAP_ADD_LIQUIDITY_URL}/${quoteTokenUrl}/${getAddress(tomb.token.address)}`
  } else if (tomb.exchange === 'Autoshark') {
    addLiquidityUrl = `${AUTOSHARK_ADD_LIQUIDITY_URL}/${quoteTokenUrl}/${getAddress(tomb.token.address)}`
  } else {
    addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${quoteTokenUrl}/${getAddress(tomb.token.address)}`
  }

  return (
    <div key={id} className='rug-indetails'>
      {nftombInfoDiv}
      <div className='direction-column'>
        <span className='indetails-type'>{name} Tomb</span><br />
        <span className='indetails-title'>
          Withdrawal Cooldown:
          <span className='indetails-value'>{withdrawalCooldown}</span>
        </span>
        {nftombMintingTimeDiv}
        <span className='indetails-title'>
          Weight:
          <span className='indetails-value'>{allocPoint.div(100).toString()}X</span>
        </span>
        <span className='indetails-title'>
          Tomb TVL:
          <span className='indetails-value'>{numeral(tvl).format('($ 0.00 a)')}</span>
        </span>
        <LinkExternal href={addLiquidityUrl} className='indetails-title'>
          Pair on {exchange}
        </LinkExternal>
      </div>
    </div>
  )
}

export default RugInDetails
