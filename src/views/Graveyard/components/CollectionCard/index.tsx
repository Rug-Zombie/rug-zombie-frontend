import React from 'react'
import styled from 'styled-components'
import { nftById } from '../../../../redux/get'

const Card = styled.div`
  min-height: 410px;
  background: #151E21 0% 0% no-repeat padding-box;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding-bottom: 37px;
`
const PreviewDiv = styled.div`
  height: 240px;
  width: 100%;
`

const Preview = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  object-fit: cover;
`

const Title = styled.div`
  text-align: left;
  font: normal normal normal 20px/30px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  padding-right: 40px;
  padding-left: 40px;
`

const Description = styled.div`
  text-align: left;
  font: normal normal normal 16px/30px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
  padding-right: 40px;
  padding-left: 40px;
`

interface CollectionCardProps {
  id: number;
  title: string;
  description: string;
  onClick: any;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ id, title, description, onClick }) => {
  const { path } = nftById(id)
  return <Card onClick={onClick}>
    <PreviewDiv>
      <Preview src={path} alt={`${title} Preview`} />
    </PreviewDiv>
    <div style={{paddingTop: '30px'}}/>
    <Title>{title}</Title>
    <div style={{paddingTop: '20px'}}/>
    <Description>{description}</Description>
  </Card>
}

export default CollectionCard