import React from 'react'
import styled from 'styled-components'
import tokens from 'config/constants/tokens'
import uppointer from 'images/graves/Hide_Dropdown.svg'
import downpointer from 'images/graves/Dropdown_icon.svg'
import { Token } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { useGetZombiePriceUsd } from '../../../../../../state/hooks'
import { Grave } from '../../../../../../state/types'
import { getBalanceNumber, getDecimalAmount } from '../../../../../../utils/formatBalance'
import { getGraveTombApr } from '../../../../../../utils/apr'
import CardItem, { CardItemValueType, NftTimerCardItem } from '../../../../../../components/CardItem'

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
  color: #ffffff;
  padding-left: 20px;
  min-width: 40.5%;
  @media (max-width: 527px) {
    width: 100%;
  }
`

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
  border: 2px solid #b8c00d;
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
  border: 2px solid #6b7682;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 527px) {
    margin: 5px 0;
  }
`

const GreenTabText = styled.div`
  font: normal normal normal 12px/30px Poppins;
  color: #ffffff;
`

const GreyTabText = styled.div`
  font: normal normal normal 12px/30px Poppins;
  color: #6b7682;
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
  grave: Grave
  open: boolean
  setOpen: any
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

  const zombiePriceUsd = useGetZombiePriceUsd()
  const bigTvl = tokenAmount.times(zombiePriceUsd)
  const tvl = getBalanceNumber(bigTvl)
  const bigZombiePrice = getDecimalAmount(new BigNumber(zombiePriceUsd))
  const yearly = getGraveTombApr(weight, bigZombiePrice, bigTvl)
  const daily = yearly / 365
  const now = Math.floor(Date.now() / 1000)

  const cooldownTime = () => {
    if (amount.isZero()) {
      return <CardItem label="Withdrawal Timer" value="N/A" valueType={CardItemValueType.Text} />
    }
    const remainingCooldownTime = tokenWithdrawalDate.toNumber() - now
    if (remainingCooldownTime <= 0) {
      return <CardItem label="Withdrawal Timer" value="None" valueType={CardItemValueType.Text} />
    }
    return <CardItem label="Withdrawal Timer" value={remainingCooldownTime} valueType={CardItemValueType.Duration} />
  }

  return (
    <GraveColumn onClick={toggleOpen}>
      <GraveHeaderRow>
        <TokenFlex>
          <img src={tokenImage(tokens.zmbe)} style={{ width: '30px', height: '30px' }} alt="Zombie Token logo" />
          <img src={tokenImage(rug)} style={{ width: '30px', height: '30px' }} alt="Rug token logo" />
        </TokenFlex>
        <GraveTitle>{name}</GraveTitle>
        <TabFlex>
          <GreenTab>
            <GreenTabText>{allocPoint.div(100).toString()}X</GreenTabText>
          </GreenTab>
          <GreyTab>
            <GreyTabText>ZMBE</GreyTabText>
          </GreyTab>
          {isNew ? (
            <GreenTab>
              <GreenTabText>NEW</GreenTabText>
            </GreenTab>
          ) : null}
        </TabFlex>
      </GraveHeaderRow>
      <GraveSubRow>
        <Amounts>
          <CardItem
            label="Earned"
            unit="ZMBE"
            value={getBalanceNumber(pendingZombie)}
            highlightable
            valueType={CardItemValueType.Number}
          />
          <CardItem label="Yearly" value={yearly} valueType={CardItemValueType.Percentage} />
          <CardItem label="Daily" value={daily} valueType={CardItemValueType.Percentage} />
          <CardItem label="TVL" value={tvl} valueType={CardItemValueType.Money} />
        </Amounts>
        <Percentages>
          <NftTimerCardItem mintDate={nftMintDate} amountStaked={amount} />
          {cooldownTime()}
          {open ? (
            <img src={uppointer} alt="Close Grave" style={{ width: '35px', height: '35px' }} />
          ) : (
            <img src={downpointer} alt="Open Grave" style={{ width: '35px', height: '35px' }} />
          )}
        </Percentages>
      </GraveSubRow>
    </GraveColumn>
  )
}

export default Top
