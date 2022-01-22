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

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const NftImageContainer = styled.div`
  margin: 25px 0 0 0;
  position: relative;
  min-width: 150px;
  max-width: 150px;
  height: 150px;
  background: #0D1417;
  border-radius: 10px;
`;

const NftImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 150px;
  max-width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  padding: 25px 10px 0 10px;
  max-width: 431.39px;
`;

const GraveInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 10px
`;

const HeaderText = styled.p`
  text-align: left;
  font: normal normal normal 16px/30px Poppins;
  color: #FFFFFF;
`;

const SubHeaderText = styled.p`
  text-align: left;
  font: normal normal normal 14px/21px Poppins;
  color: #6B7682;
`;

const Text = styled.span`
  text-align: left;
  font: normal normal normal 14px/21px Poppins;
  color: #FFFFFF;
`;

const TableDetails: React.FC<TableDetailsProps> = ({ pid }) => {
  const {
    path,
    subtitle,
    withdrawalCooldown,
    nftRevivalTime,
    poolInfo: { allocPoint, totalStakingTokenStaked, minimumStake },
  } = graveByPid(pid);
  const tvl = getBalanceAmount(totalStakingTokenStaked.times(zombiePriceUsd()))
  const unlockFeeInBnb = 0.01
  const unlockFeeUsd = unlockFeeInBnb * bnbPriceUsd()

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const source = event.target as HTMLImageElement;
    source.onerror = null;
    source.remove();
  };

  return <Container>
    <NftImageContainer>
      <NftImage src={path} onError={imageOnErrorHandler} />
    </NftImageContainer>
    <Details>
      <GraveInfo>
        <HeaderText>{subtitle}</HeaderText>
        <SubHeaderText>
          Weight: <Text>{allocPoint / 100}X</Text>
        </SubHeaderText>
        <SubHeaderText>
          Grave TVL: <Text>{numeral(tvl.toString()).format('$ (0.00 a)')}</Text>
        </SubHeaderText>
      </GraveInfo>
      <GraveInfo>
        <HeaderText>Unlock Fees: {unlockFeeInBnb} BNB (~ {unlockFeeUsd.toFixed(2)})</HeaderText>
        <SubHeaderText>
          Early Withdraw Fee: <Text>5%</Text>
        </SubHeaderText>
        <SubHeaderText>
          Withdrawal Cooldown: <Text>{withdrawalCooldown}</Text>
        </SubHeaderText>
        <SubHeaderText>
          NFT Minting Time: <Text>{nftRevivalTime}</Text>
        </SubHeaderText>
        <SubHeaderText>
          Minimum Stake: <Text>{getBalanceAmount(minimumStake).toString()} ZMBE</Text>
        </SubHeaderText>
      </GraveInfo>
    </Details>
  </Container>
}

export default TableDetails