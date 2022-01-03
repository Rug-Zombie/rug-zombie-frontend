import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { bnbPriceUsd, graveByPid, zombiePriceUsd } from '../../../../../../../../redux/get'
import { getBalanceAmount, getDecimalAmount } from '../../../../../../../../utils/formatBalance'

export enum GraveItemType {
  Number,
  Money,
  Percentage,
  Duration,
}

interface TableDetailsProps {
  pid: number;
}

const ItemText = styled.text`
  text-align: left;
  font: normal normal normal 12px/24px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
`

const Container = styled.div`
  display: grid;
  grid-column-gap: 50px;
  grid-row-gap: 50px;

`

const NftImage = styled.img`
  max-width: 220px;
  max-height: 220px;
  border-radius: 10px;
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 1;
`

const HeaderText = styled.text`
  text-align: left;
  font: normal normal normal 20px/36px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
`

const SubHeaderText = styled.text`
  text-align: left;
  font: normal normal normal 16px/30px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
`

const Text = styled.text`
  text-align: left;
  font: normal normal normal 16px/30px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
`

const TableDetails: React.FC<TableDetailsProps> = ({ pid }) => {
  const { path, subtitle, withdrawalCooldown, nftRevivalTime, poolInfo: { allocPoint, totalStakingTokenStaked, minimumStake } } = graveByPid(pid)
  const tvl = getBalanceAmount(totalStakingTokenStaked.times(zombiePriceUsd()))
  const unlockFeeInBnb = 0.01
  const unlockFeeUsd = unlockFeeInBnb * bnbPriceUsd()
  return <Container>
    <NftImage src={path} />
    <div style={{gridRowStart: 1, gridRowEnd: 3, gridColumnStart: 2, maxWidth: '200px'}}>
      <HeaderText>{subtitle}</HeaderText>
      <div>
        <SubHeaderText>Weight: </SubHeaderText><Text>{allocPoint / 100}X</Text>
      </div>
      <div>
        <SubHeaderText>Grave TVL: </SubHeaderText><Text>{numeral(tvl.toString()).format('$ (0.00 a)')}</Text>
      </div>
    </div>
    <div style={{gridRowStart: 1, gridRowEnd: 3, gridColumnStart: 3, width: '100%'}}>
      <HeaderText>Unlock Fees: {unlockFeeInBnb} BNB (~ {unlockFeeUsd.toFixed(2)}) </HeaderText>
      <div>
        <SubHeaderText>Early Withdraw Fee: </SubHeaderText><Text>5%</Text>
      </div>
      <div>
        <SubHeaderText>Withdrawal Cooldown: </SubHeaderText><Text>{withdrawalCooldown}</Text>
      </div>
      <div>
        <SubHeaderText>NFT Minting Time: </SubHeaderText><Text>{nftRevivalTime}</Text>
      </div>
      <div>
        <SubHeaderText>Minimum Stake: </SubHeaderText><Text>{getBalanceAmount(minimumStake).toString()} ZMBE</Text>
      </div>
    </div>

  </Container>
}

export default TableDetails