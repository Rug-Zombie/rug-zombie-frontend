import React, {useState} from 'react'
import styled from 'styled-components'
import tokens from 'config/constants/tokens'
import {Token} from 'config/constants/types'
import CardItem, {CardItemValueType, NftTimerCardItem} from 'components/CardItem'
import {BigNumber} from "bignumber.js";

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
  min-width: 40px;
  justify-content: space-between;
`

const GraveTitle = styled.div`
  text-align: left;
  font: normal normal normal 20px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  padding-left: 10px;
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
    open: boolean
    setOpen: any
    fee: number
    isStaked: boolean
    mintTime: BigNumber
    mintTimeRemaining: BigNumber
    isMinting: boolean
}

const Top: React.FC<TopProps> = (
    {
        open,
        setOpen,
        fee,
        isStaked,
        mintTime,
        mintTimeRemaining,
        isMinting,
    }) => {

    const remainingTime = Number(mintTimeRemaining)
    const toggleOpen = () => setOpen(!open)
    const tokenImage = (token: Token) => {
        return token.tokenLogo ? token.tokenLogo : `images/tokens/${token.symbol}.png`
    }

    const getTabs = () => {
        return (
            <TabFlex>
                <BlueTab>
                    <WhiteTabText>NFT-ONLY</WhiteTabText>
                </BlueTab>
                <GreenTab>
                    <WhiteTabText>NEW</WhiteTabText>
                </GreenTab>
            </TabFlex>
        )
    }

    return (
        <GraveColumn onClick={toggleOpen}>
            <GraveHeaderRow>
                <TokenFlex>
                    <img src={tokenImage(tokens.zmbe)} style={{width: '30px', height: '30px'}} alt='Zombie Token logo'/>
                </TokenFlex>
                <GraveTitle>WhalePool Season 1</GraveTitle>
                {getTabs()}
            </GraveHeaderRow>
            <GraveSubRow>
                <Amounts>
                    <CardItem label="Pool fee" value={fee} valueType={CardItemValueType.Money}/>
                    <CardItem label="NFT Minting time" value={Number(mintTime)} valueType={CardItemValueType.Duration}/>
                    {
                        isMinting ?
                            <CardItem label="Mint Requested" value="Yes" valueType={CardItemValueType.Text}/>
                            :
                            <CardItem label="Mint Requested" value="Nope" valueType={CardItemValueType.Text}/>
                    }
                </Amounts>
                <Percentages>
                    {
                        isStaked ?
                            <>
                                {
                                    remainingTime > 0 ? <NftTimerCardItem mintDate={mintTimeRemaining} amountStaked={new BigNumber(1)} secondsUntilMintable={Number(mintTimeRemaining)} />
                                    : <NftTimerCardItem mintDate={mintTimeRemaining} amountStaked={new BigNumber(1)} secondsUntilMintable={0}/>}
                            </>
                            : (<NftTimerCardItem mintDate={mintTimeRemaining} amountStaked={new BigNumber(0)}/>)
                    }
                </Percentages>
            </GraveSubRow>
        </GraveColumn>
    )
}

export default Top
