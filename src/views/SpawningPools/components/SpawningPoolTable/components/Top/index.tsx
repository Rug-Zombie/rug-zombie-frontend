import React from 'react'
import styled from 'styled-components'
import tokens from 'config/constants/tokens'
import uppointer from 'images/FullUpPointer.png'
import downpointer from 'images/FullDownPointer.png'
import { bnbPriceUsd, zombiePriceUsd } from 'redux/get'
import { Token } from 'config/constants/types'
import SpawningPoolItem, { SpawningPoolItemType } from './SpawningPoolItem'
import { SpawningPool } from '../../../../../../state/types'
import { getBalanceNumber, getFullDisplayBalance } from '../../../../../../utils/formatBalance'
import { getSpawningPoolApr } from '../../../../../../utils/apr'

const SpawningPoolColumn = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }
`

const SpawningPoolHeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding-bottom: 20px;
`

const TokenFlex = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 70px;
  justify-content: space-between;
`

const SpawningPoolTitle = styled.div`
  text-align: left;
  font: normal normal normal 20px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  padding-left: 20px;
  min-width: 40.5%;
  @media (max-width: 527px) {
    width: 100%;;
  }`

const TabFlex = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 527px) {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
`

const GreenTab = styled.div`
  width: 49px;
  height: 30px;
  border: 2px solid #30C00D;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  @media (max-width: 527px) {
    margin: 0;
  }
`

const GreyTab = styled.div`
  width: 60px;
  height: 30px;
  border: 2px solid #6B7682;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 527px) {
    margin: 5px 0;
  }
`

const GreenTabText = styled.p`
  font: normal normal normal 12px/30px Poppins;
  color: #FFFFFF;
`

const GreyTabText = styled.p`
  font: normal normal normal 12px/30px Poppins;
  color: #6B7682;
`

const SpawningPoolSubRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  @media (max-width: 527px) {
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
  }
`

const Amounts = styled.div`
  display: flex;
  flex-grow: 1;
`

const Percentages = styled.div`
  display: flex;
  flex-grow: 1;
`

interface TopProps {
  spawningPool: SpawningPool;
  open: boolean;
  setOpen: any;

}

const Top: React.FC<TopProps> = ({ spawningPool, open, setOpen }) => {
  const {
    id,
    name,
    rewardToken,
    isNew,
    poolInfo: { totalAmount, rewardTokenPriceBnb, rewardPerBlock },
    userInfo: { pendingReward, nftMintDate, tokenWithdrawalDate, amount },
  } = spawningPool
  const toggleOpen = () => setOpen(!open)
  const tokenImage = (token: Token) => {
    return token.tokenLogo ? token.tokenLogo : `images/tokens/${token.symbol}.png`
  }
  const bigTvl = totalAmount.times(zombiePriceUsd())
  const tvl = getBalanceNumber(bigTvl)

  const rewardTokenPrice = rewardTokenPriceBnb.times(bnbPriceUsd()).toNumber()
  const yearly = getSpawningPoolApr(zombiePriceUsd(), rewardTokenPrice, getBalanceNumber(totalAmount), getBalanceNumber(rewardPerBlock, rewardToken.decimals))
  const daily = yearly / 365

  const now = Math.floor(Date.now() / 1000)

  if (id === 15) {
    console.log(pendingReward.toString())

  }

  const nftTime = () => {
    if (amount.isZero()) {
      return <SpawningPoolItem label='NFT Timer' value='N/A' type={SpawningPoolItemType.Text} />
    }
    const remainingNftTime = nftMintDate.toNumber() - now
    if (remainingNftTime <= 0) {
      return <SpawningPoolItem label='NFT Timer' value='NFT Ready' type={SpawningPoolItemType.Text} />
    }
    return <SpawningPoolItem label='NFT Timer' value={remainingNftTime} type={SpawningPoolItemType.Duration} />
  }

  const cooldownTime = () => {
    if (amount.isZero()) {
      return <SpawningPoolItem label='Withdrawal Timer' value='N/A' type={SpawningPoolItemType.Text} />
    }
    const remainingCooldownTime = tokenWithdrawalDate.toNumber() - now
    if (remainingCooldownTime <= 0) {
      return <SpawningPoolItem label='Withdrawal Timer' value='None' type={SpawningPoolItemType.Text} />
    }
    return <SpawningPoolItem label='Withdrawal Timer' value={remainingCooldownTime}
                             type={SpawningPoolItemType.Duration} />
  }

  return (
    <SpawningPoolColumn onClick={toggleOpen}>
      <SpawningPoolHeaderRow>
        <TokenFlex>
          <img src={tokenImage(tokens.zmbe)} style={{ width: '30px', height: '30px' }} alt='Zombie Token logo' />
          <img src={tokenImage(rewardToken)} style={{ width: '30px', height: '30px' }} alt='Reward token logo' />
        </TokenFlex>
        <SpawningPoolTitle>
          {name}
        </SpawningPoolTitle>
        <TabFlex>
          <GreenTab><GreenTabText>{rewardToken.symbol}</GreenTabText></GreenTab>
          <GreyTab><GreyTabText>ZMBE</GreyTabText></GreyTab>
          {isNew ? <GreenTab><GreenTabText>NEW</GreenTabText></GreenTab> : null}
        </TabFlex>
      </SpawningPoolHeaderRow>
      <SpawningPoolSubRow>
        <Amounts>
          <SpawningPoolItem label='Earned' unit={`${rewardToken.symbol} ($${getFullDisplayBalance(pendingReward.times(rewardTokenPrice), rewardToken.decimals, 2)})`}
                            value={getBalanceNumber(pendingReward, rewardToken.decimals)}
                            type={SpawningPoolItemType.Number} />
          <SpawningPoolItem label='Yearly' value={yearly} type={SpawningPoolItemType.Percentage} />
          <SpawningPoolItem label='Daily' value={daily} type={SpawningPoolItemType.Percentage} />
          <SpawningPoolItem label='TVL' value={tvl} type={SpawningPoolItemType.Money} />
        </Amounts>
        <Percentages>
          {nftTime()}
          {cooldownTime()}
          {
            open
              ? <img src={uppointer} alt='Close SpawningPool' style={{ width: '35px', height: '35px' }} />
              : <img src={downpointer} alt='Open SpawningPool' style={{ width: '35px', height: '35px' }} />
          }
        </Percentages>
      </SpawningPoolSubRow>
    </SpawningPoolColumn>
  )
}

export default Top