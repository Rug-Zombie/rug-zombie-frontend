import React from 'react'
import styled from 'styled-components'
import PreviewVideo from 'components/Video/PreviewVideo'
import { useHistory } from 'react-router'
import { useGetNftById } from '../../../../../state/nfts/hooks'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Card = styled.div`
  min-height: 410px;
  background: #151e21;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 15px;

  &:hover {
    cursor: pointer;
  }
`

const Shadow = styled.div`
  width: 90%;
  height: 40px;
  background: #30c00d 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 0.5;
  filter: blur(10px);
  position: relative;
  bottom: 50px;
  margin-bottom: -15px;
  z-index: -1;
`

const PreviewDiv = styled.div`
  height: 240px;
  min-width: 300px;
  max-width: 300px;
`

const PreviewImage = styled.img`
  height: 240px;
  min-width: 300px;
  max-width: 300px;
  border-radius: 20px 20px 0px 0px;
  object-fit: cover;
`

const PreviewVid = styled(PreviewVideo)`
  height: 240px;
  min-width: 300px;
  max-width: 300px;
  border-radius: 20px 20px 0px 0px;
  object-fit: cover;
`

const Title = styled.div`
  text-align: left;
  font: normal normal normal 20px/30px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  padding-right: 30px;
  padding-left: 30px;
`

const RarityText = styled.div`
  text-align: left;
  font: normal normal normal 14px/30px Poppins;
  letter-spacing: 0px;
  color: #30c00d;
  padding-right: 30px;
  padding-left: 30px;
`

const SubText = styled.span`
  text-align: left;
  font: normal normal normal 16px/30px Poppins;
  letter-spacing: 0px;
`

interface CollectionCardProps {
  id: number
  showOwned?: boolean
  showTotalSupply?: boolean
}

const NftCard: React.FC<CollectionCardProps> = ({ id, showOwned, showTotalSupply }) => {
  const {
    name,
    path,
    totalSupply,
    rarity,
    type,
    userInfo: { ownedIds },
  } = useGetNftById(id)
  const history = useHistory()
  return (
    <Container>
      <Card
        onClick={() => {
          history.push(`nfts/${id}`)
        }}
      >
        <PreviewDiv>
          {type === 'image' ? <PreviewImage src={path} alt={`${name} NFT`} /> : <PreviewVid path={path} />}
        </PreviewDiv>
        <div style={{ paddingTop: '20px' }} />
        <RarityText>{rarity}</RarityText>
        <div style={{ paddingTop: '10px' }} />
        <Title>{name}</Title>
        <div style={{ paddingTop: '22px' }} />
        {showTotalSupply ? (
          <p style={{ paddingLeft: '30px', paddingBottom: '10px' }}>
            <SubText style={{ color: '#6B7682' }}>Total supply:&nbsp;&nbsp;</SubText>
            <SubText style={{ color: '#FFFFFF' }}>{totalSupply.toString()}</SubText>
          </p>
        ) : null}
        {showOwned ? (
          <p style={{ paddingLeft: '30px' }}>
            <SubText style={{ color: '#6B7682' }}>Variants owned:&nbsp;&nbsp;</SubText>
            <SubText style={{ color: '#FFFFFF' }}>{ownedIds.length}</SubText>
          </p>
        ) : null}
        <div style={{ paddingBottom: '10px' }} />
      </Card>
      {ownedIds.length > 0 ? <Shadow /> : null}
    </Container>
  )
}

export default NftCard
