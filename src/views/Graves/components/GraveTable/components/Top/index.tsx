import AnnouncementLink from 'components/AnnouncementLink'
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
import { now } from '../../../../../../utils/timerHelpers'

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
  align-items: center;
  column-gap: 5px;
  margin-left: 5px;
  
  @media (max-width: 527px) {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    row-gap: 5px;
  }
`

const GreyTab = styled.div`
  padding: 0 10px;
  height: 30px;
  border: 2px solid #6b7682;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  
  @media (max-width: 527px) {
    row-gap: 5px;
  }
`

const GreenTab = styled(GreyTab)`
  border: 2px solid #b8c00d;
`

const RedTab = styled(GreyTab)`
  border: 2px solid #fc0303;
`

const BlueTab = styled(GreyTab)`
  border: 2px solid #4b7bdc;
`

const PinkTab = styled(GreyTab)`
  border: 2px solid #ae32aa;
`

const GreyTabText = styled.div`
  font: normal normal normal 12px/30px Poppins;
  color: #6b7682;
`

const WhiteTabText = styled(GreyTabText)`
  color: #ffffff;
  white-space: nowrap;
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
    endDate
  } = grave
  const toggleOpen = () => setOpen(!open)
  const tokenImage = (token: Token) => {
    return token.tokenLogo ? token.tokenLogo : `images/tokens/${token.symbol}.png`
  }

  const isRetired = endDate ? now() > endDate || grave.isRetired : grave.isRetired

  const zombiePriceUsd = useGetZombiePriceUsd()
  const bigTvl = tokenAmount.times(zombiePriceUsd)
  const tvl = getBalanceNumber(bigTvl)
  const bigZombiePrice = getDecimalAmount(new BigNumber(zombiePriceUsd))
  const yearly = getGraveTombApr(weight, bigZombiePrice, bigTvl)
  const daily = yearly / 365

  const cooldownTime = () => {
    if (amount.isZero()) {
      return <CardItem label='Withdrawal Timer' value='N/A' valueType={CardItemValueType.Text} />
    }
    const remainingCooldownTime = tokenWithdrawalDate.toNumber() - now()
    if (remainingCooldownTime <= 0) {
      return <CardItem label='Withdrawal Timer' value='None' valueType={CardItemValueType.Text} />
    }
    return <CardItem label='Withdrawal Timer' value={remainingCooldownTime} valueType={CardItemValueType.Duration} />
  }

  const isNftOnly: boolean = allocPoint.isZero() && !isRetired
  const getTabs = () => {
    const tabs = []

    if (isNftOnly) {
      tabs.push(
        <BlueTab>
          <WhiteTabText>NFT-ONLY</WhiteTabText>
        </BlueTab>,
      )
    } else if (isRetired) {
      tabs.push(
        <PinkTab>
          <WhiteTabText>RETIRED</WhiteTabText>
        </PinkTab>,
      )
    } else {
      tabs.push(
        <GreenTab>
          <WhiteTabText>{allocPoint.div(100).toString()}X</WhiteTabText>
        </GreenTab>,
        <GreyTab>
          <GreyTabText>ZMBE</GreyTabText>
        </GreyTab>,
      )
    }

    if (isNew) {
      tabs.push(
        <RedTab>
          <WhiteTabText>NEW</WhiteTabText>
        </RedTab>,
      )
    }

    return (
      <TabFlex>
        {tabs}
        <AnnouncementLink key="announcement-link" subject={grave} />
      </TabFlex>
    )
  }

  return (
    <GraveColumn onClick={toggleOpen}>
      <GraveHeaderRow>
        <TokenFlex>
          <img src={tokenImage(tokens.zmbe)} style={{ width: '30px', height: '30px' }} alt='Zombie Token logo' />
          <img src={tokenImage(rug)} style={{ width: '30px', height: '30px' }} alt='Rug token logo' />
        </TokenFlex>
        <GraveTitle>{name}</GraveTitle>
        {getTabs()}
      </GraveHeaderRow>
      <GraveSubRow>
        <Amounts>
          {!isNftOnly && (
            <>
              <CardItem
                label='Earned'
                unit='ZMBE'
                value={getBalanceNumber(pendingZombie)}
                highlightable
                valueType={CardItemValueType.Number}
              />
              <CardItem label='Yearly' value={yearly} valueType={CardItemValueType.Percentage} />
              <CardItem label='Daily' value={daily} valueType={CardItemValueType.Percentage} />
            </>
          )}
          <CardItem label='TVL' value={tvl} valueType={CardItemValueType.Money} />
        </Amounts>
        <Percentages>
          <NftTimerCardItem mintDate={nftMintDate} amountStaked={amount} />
          {cooldownTime()}
          {open ? (
            <img src={uppointer} alt='Close Grave' style={{ width: '35px', height: '35px' }} />
          ) : (
            <img src={downpointer} alt='Open Grave' style={{ width: '35px', height: '35px' }} />
          )}
        </Percentages>
      </GraveSubRow>
    </GraveColumn>
  )
}

export default Top
