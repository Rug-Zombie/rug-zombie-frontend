import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { bnbPriceUsd } from '../../../../../../../../redux/get'
import { getFullDisplayBalance } from '../../../../../../../../utils/formatBalance'
import { Tomb } from '../../../../../../../../state/types'
import { formatDays } from '../../../../../../../../utils/timerHelpers'
import { useGetNftById } from '../../../../../../../../state/hooks'

export enum TombItemType {
  Number,
  Money,
  Percentage,
  Duration,
}

interface TableDetailsProps {
  tomb: Tomb;
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

const NftVideo = styled.video`
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
  padding: 25px 10px 0 10px;
`;

const TombInfo = styled.div`
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
  white-space: nowrap;
`;

const TableDetails: React.FC<TableDetailsProps> = ({ tomb }) => {
  const {
    poolInfo: { allocPoint, withdrawCooldown, nftMintTime, tokenAmount, lpPriceBnb, mintingFee },
    overlay: {legendaryId}
  } = tomb
  const { name, path, type } = useGetNftById(legendaryId)

  const tvl = tokenAmount.times(lpPriceBnb).times(bnbPriceUsd())
  const mintingFeeUsd = mintingFee.times(bnbPriceUsd())

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const source = event.target as HTMLImageElement;
    source.onerror = null;
    source.remove();
  };

  return <Container>
    <NftImageContainer>
      {type === 'video' ? <NftVideo autoPlay loop muted>
          <source src={path} type='video/webm' />
        </NftVideo> :
        <NftImage src={path} onError={imageOnErrorHandler} />

      }
    </NftImageContainer>
    <Details>
      <TombInfo>
        <HeaderText>{name}</HeaderText>
        <SubHeaderText>
          Weight: <Text>{allocPoint.div(100).toString()}X</Text>
        </SubHeaderText>
        <SubHeaderText>
          Tomb TVL: <Text>{numeral(getFullDisplayBalance(tvl)).format('$ (0.00 a)')}</Text>
        </SubHeaderText>
      </TombInfo>
      <TombInfo>
        <HeaderText>Minting Fee: {getFullDisplayBalance(mintingFee)} BNB (~ ${getFullDisplayBalance(mintingFeeUsd, 18, 2)})</HeaderText>
        {
          withdrawCooldown.gt(0) ?
          <SubHeaderText>
            Early Withdraw Fee: <Text>5%</Text>
          </SubHeaderText> : null
        }
        <SubHeaderText>
          Withdrawal Cooldown: <Text>{withdrawCooldown.gt(0) ? formatDays(withdrawCooldown.toNumber()) : 'None'}</Text>
        </SubHeaderText>
        <SubHeaderText>
          NFT Minting Time: <Text>{formatDays(nftMintTime.toNumber())}</Text>
        </SubHeaderText>
      </TombInfo>
    </Details>
  </Container>
}

export default TableDetails