import React from 'react'
import styled from 'styled-components'
import tokens from 'config/constants/tokens'
import uppointer from 'images/FullUpPointer.png'
import downpointer from 'images/FullDownPointer.png'
import { graveByPid, zombiePriceUsd } from 'redux/get'
import { Token } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import GraveItem, { GraveItemType } from './GraveItem'
import { Grave } from '../../../../../../state/types'
import { getBalanceNumber, getDecimalAmount, getFullDisplayBalance } from '../../../../../../utils/formatBalance'
import { getGraveTombApr } from '../../../../../../utils/apr'

const GraveColumn = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }
`

const GraveHeaderRow = styled.div`
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

const GraveTitle = styled.div`
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

const GraveSubRow = styled.div`
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
  grave: Grave;
  open: boolean;
  setOpen: any;
}

const Top: React.FC<TopProps> = ({ grave, open, setOpen }) => {
  const {
    name,
    rug,
    isNew,
    poolInfo: { allocPoint, tokenAmount, weight },
    userInfo: { pendingZombie, nftMintDate, tokenWithdrawalDate, amount },
  } = grave
  const toggleOpen = () => setOpen(!open)
  const tokenImage = (token: Token) => {
    return token.tokenLogo ? token.tokenLogo : `images/tokens/${token.symbol}.png`
  }
  const bigTvl = tokenAmount.times(zombiePriceUsd())
  const tvl = getBalanceNumber(bigTvl)
  const bigZombiePrice = getDecimalAmount(new BigNumber(zombiePriceUsd()))
  const yearly = getGraveTombApr(weight, bigZombiePrice, bigTvl)
  const daily = yearly / 365
  const now = Math.floor(Date.now() / 1000)

  const nftTime = () => {
    if(amount.isZero()) {
      return <GraveItem label='NFT Timer' value='N/A' type={GraveItemType.Text} />
    }
    const remainingNftTime = nftMintDate.toNumber() - now
    if(remainingNftTime <= 0) {
      return <GraveItem label='NFT Timer' value='NFT Ready' type={GraveItemType.Text} />
    }
    return <GraveItem label='NFT Timer' value={remainingNftTime} type={GraveItemType.Duration} />
  }

  const cooldownTime = () => {
    if(amount.isZero()) {
      return <GraveItem label='Withdrawal Timer' value='N/A' type={GraveItemType.Text} />
    }
    const remainingCooldownTime = tokenWithdrawalDate.toNumber() - now
    if(remainingCooldownTime <= 0) {
      return <GraveItem label='Withdrawal Timer' value='None' type={GraveItemType.Text} />
    }
    return <GraveItem label='Withdrawal Timer' value={remainingCooldownTime} type={GraveItemType.Duration} />
  }

  return (
    <GraveColumn onClick={toggleOpen}>
      <GraveHeaderRow>
        <TokenFlex>
          <img src={tokenImage(tokens.zmbe)} style={{ width: '30px', height: '30px' }} alt='Zombie Token logo' />
          <img src={tokenImage(rug)} style={{ width: '30px', height: '30px' }} alt='Rug token logo' />
        </TokenFlex>
        <GraveTitle>
          {name}
        </GraveTitle>
        <TabFlex>
          <GreenTab><GreenTabText>{allocPoint.div(100).toString()}X</GreenTabText></GreenTab>
          <GreyTab><GreyTabText>ZMBE</GreyTabText></GreyTab>
          {isNew ? <GreenTab><GreenTabText>NEW</GreenTabText></GreenTab> : null}
        </TabFlex>
      </GraveHeaderRow>
      <GraveSubRow>
        <Amounts>
          <GraveItem label='Earned' unit='ZMBE' value={getBalanceNumber(pendingZombie)} type={GraveItemType.Number} />
          <GraveItem label='Yearly' value={yearly} type={GraveItemType.Percentage} />
          <GraveItem label='Daily' value={daily} type={GraveItemType.Percentage} />
          <GraveItem label='TVL' value={tvl} type={GraveItemType.Money} />
        </Amounts>
        <Percentages>
          {nftTime()}
          {cooldownTime()}
          {
            open
              ? <img src={uppointer} alt='Close Grave' style={{ width: '35px', height: '35px' }} />
              : <img src={downpointer} alt='Open Grave' style={{ width: '35px', height: '35px' }} />
          }
        </Percentages>
      </GraveSubRow>
    </GraveColumn>
  )
}

export default Top