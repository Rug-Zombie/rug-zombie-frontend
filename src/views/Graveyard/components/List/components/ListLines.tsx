import React from 'react'
import styled from 'styled-components'
import SmallPreviewVideo from 'components/Video/PreviewVideo'
import { useHistory } from 'react-router'
import { useGetNftById } from '../../../../../state/nfts/hooks'


const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Card = styled.div`
  min-height: 80px;
  background: #151e21;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  width: 75vw;
  margin-bottom: 5px;

  &:hover {
    cursor: pointer;
  }
`

const PreviewDiv = styled.div`
  height: 80px;
  min-width: 60px;
  max-width: 60px;
`

const PreviewImage = styled.img`
  height: 100%;
  min-width: 60px;
  max-width: 60px;
  border-radius: 4px 0px 0px 4px;
  object-fit: cover;
`

const PreviewVid = styled(SmallPreviewVideo)`
  height: 100%;
  min-width: 60px;
  max-width: 60px;
  border-radius: 4px 0px 0px 4px;
  object-fit: cover;
`

const Title = styled.div`
  text-align: center;
  font: normal normal normal 20px/30px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  margin-top: 25px;
  width: 50%;
`

const RarityText = styled.div`
  text-align: left;
  font: normal normal normal 20px/30px Poppins;
  letter-spacing: 0px;
  color: #30c00d;
  margin-top: 25px;

`

const SubText = styled.span`
  text-align: right;
  font: normal normal normal 16px/30px Poppins;
  letter-spacing: 0px;
  margin-top: 25px;
  color: #6B7682;
`

interface CollectionCardProps {
    id: number
    showOwned?: boolean
    showTotalSupply?: boolean
}

const ListLines: React.FC<CollectionCardProps> = ({ id, showOwned, showTotalSupply }) => {
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
                }}>
                <PreviewDiv>
                    {type === 'image' ? <PreviewImage src={path} alt={`${name} NFT`} /> : <PreviewVid path={path} />}
                </PreviewDiv>
                <Title>{name}</Title>
                <RarityText>{rarity}</RarityText>

                {showTotalSupply ? (
                    <p style={{ marginLeft: '175px', marginTop: '25px'}}>
                        <SubText>Total supply:&nbsp;&nbsp;</SubText>
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
        </Container>
    )
}

export default ListLines
