import React from 'react'
import styled from 'styled-components'
import uppointer from 'images/tombs/Hide_Dropdown.svg'
import downpointer from 'images/tombs/Dropdown_icon.svg'
import { bnbPriceUsd, zombiePriceUsd } from 'redux/get'
import { Token } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { Tomb } from '../../../../../../state/types'
import { getBalanceNumber, getDecimalAmount } from '../../../../../../utils/formatBalance'
import { getGraveTombApr } from '../../../../../../utils/apr'
import { DEXS } from '../../../../../../config'
import CardItem, { CardItemValueType, NftTimerCardItem } from '../../../../../../components/CardItem'

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
  border: 2px solid #B8C00D;
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
  height: 30px;
  padding: 5px;
  border: 2px solid #6B7682;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 527px) {
    margin: 5px 0;
  }
`

const GreenTabText = styled.text`
  font: normal normal normal 12px/30px Poppins;
  color: #FFFFFF;
`

const GreyTabText = styled.text`
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
    dex,
    poolInfo: { allocPoint, tokenAmount, weight, lpPriceBnb },
    userInfo: { pendingZombie, nftMintTime, tokenWithdrawalDate, amount, isMinting, randomNumber },
  } = tomb
  const toggleOpen = () => setOpen(!open)
  const tokenImage = (token: Token) => {
    return token.tokenLogo ? token.tokenLogo : `images/tokens/${token.symbol}.png`
  }
  const bigTvl = tokenAmount.times(lpPriceBnb).times(bnbPriceUsd())
  const tvl = getBalanceNumber(bigTvl)
  const bigZombiePrice = getDecimalAmount(new BigNumber(zombiePriceUsd()))
  const yearly = getGraveTombApr(weight, bigZombiePrice, bigTvl)
  const daily = yearly / 365
  const now = Math.floor(Date.now() / 1000)
  const mintingReady = randomNumber.gt(0)

  const cooldownTime = () => {
    if (amount.isZero()) {
      return <CardItem label='Withdrawal Timer' value='N/A' valueType={CardItemValueType.Text} />
    }
    const remainingCooldownTime = tokenWithdrawalDate.toNumber() - now
    if (remainingCooldownTime <= 0) {
      return <CardItem label='Withdrawal Timer' value='None' valueType={CardItemValueType.Text} />
    }
    return <CardItem label='Withdrawal Timer' value={remainingCooldownTime} valueType={CardItemValueType.Duration} />
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
          <GreyTab><GreyTabText>{DEXS[dex]}</GreyTabText></GreyTab>
          {isNew ? <GreenTab><GreenTabText>NEW</GreenTabText></GreenTab> : null}
        </TabFlex>
      </TombHeaderRow>
      <TombSubRow>
        <Amounts>
          <CardItem label='Earned' highlightable unit='ZMBE' value={getBalanceNumber(pendingZombie)}
                    isHighlighted={(value) => !!value} valueType={CardItemValueType.Number} />
          <CardItem label='Yearly' value={yearly} valueType={CardItemValueType.Percentage} />
          <CardItem label='Daily' value={daily} valueType={CardItemValueType.Percentage} />
          <CardItem label='TVL' value={tvl} valueType={CardItemValueType.Money} />
        </Amounts>
        <Percentages>
          <NftTimerCardItem mintDate={nftMintTime} amountStaked={amount} mintingReady={mintingReady}
                            isMinting={isMinting} secondsUntilMintable={nftMintTime.toNumber()} />
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