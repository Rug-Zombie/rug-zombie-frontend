import React from 'react'
import styled from 'styled-components'
import uppointer from 'images/FullUpPointer.png'
import downpointer from 'images/FullDownPointer.png'
import { tombByPid, zombiePriceUsd } from 'redux/get'
import { Token } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import TombItem, { TombItemType } from './TombItem'
import { Tomb } from '../../../../../../state/types'
import { getBalanceNumber, getDecimalAmount } from '../../../../../../utils/formatBalance'
import { getGraveTombApr } from '../../../../../../utils/apr'

const TombColumn = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }
`

const TombHeaderRow = styled.div`
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

const TombTitle = styled.div`
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

const TombSubRow = styled.div`
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
  tomb: Tomb;
  open: boolean;
  setOpen: any;

}

const Top: React.FC<TopProps> = ({ tomb, open, setOpen }) => {
  const {
    isNew,
    token1,
    token2,
    poolInfo: { allocPoint, tokenAmount, weight },
    userInfo: { pendingZombie, nftMintDate, tokenWithdrawalDate, amount },
  } = tomb
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
      return <TombItem label='NFT Timer' value='N/A' type={TombItemType.Text} />
    }
    const remainingNftTime = nftMintDate.toNumber() - now
    if(remainingNftTime <= 0) {
      return <TombItem label='NFT Timer' value='NFT Ready' type={TombItemType.Text} />
    }
    return <TombItem label='NFT Timer' value={remainingNftTime} type={TombItemType.Duration} />
  }

  const cooldownTime = () => {
    if(amount.isZero()) {
      return <TombItem label='Withdrawal Timer' value='N/A' type={TombItemType.Text} />
    }
    const remainingCooldownTime = tokenWithdrawalDate.toNumber() - now
    if(remainingCooldownTime <= 0) {
      return <TombItem label='Withdrawal Timer' value='None' type={TombItemType.Text} />
    }
    return <TombItem label='Withdrawal Timer' value={remainingCooldownTime} type={TombItemType.Duration} />
  }

  const lpName = `${token2.symbol}-${token1.symbol} LP`


  return (
    <TombColumn onClick={toggleOpen}>
      <TombHeaderRow>
        <TokenFlex>
          <img src={tokenImage(token1)} style={{ width: '30px', height: '30px' }} alt='Token1 icon' />
          <img src={tokenImage(token2)} style={{ width: '30px', height: '30px' }} alt='Token2 icon' />
        </TokenFlex>
        <TombTitle>
          {lpName}
        </TombTitle>
        <TabFlex>
          <GreenTab><GreenTabText>{allocPoint.div(100).toString()}X</GreenTabText></GreenTab>
          <GreyTab><GreyTabText>ZMBE</GreyTabText></GreyTab>
          {isNew ? <GreenTab><GreenTabText>NEW</GreenTabText></GreenTab> : null}
        </TabFlex>
      </TombHeaderRow>
      <TombSubRow>
        <Amounts>
          <TombItem label='Earned' unit='ZMBE' value={getBalanceNumber(pendingZombie)} type={TombItemType.Number} />
          <TombItem label='Yearly' value={yearly} type={TombItemType.Percentage} />
          <TombItem label='Daily' value={daily} type={TombItemType.Percentage} />
          <TombItem label='TVL' value={tvl} type={TombItemType.Money} />
        </Amounts>
        <Percentages>
          {nftTime()}
          {cooldownTime()}
          {
            open
              ? <img src={uppointer} alt='Close Tomb' style={{ width: '35px', height: '35px' }} />
              : <img src={downpointer} alt='Open Tomb' style={{ width: '35px', height: '35px' }} />
          }
        </Percentages>
      </TombSubRow>
    </TombColumn>
  )
}

export default Top