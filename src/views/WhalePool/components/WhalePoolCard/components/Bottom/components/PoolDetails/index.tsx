import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { WhalePool } from "../../../../../../../../state/types";
import { useGetNfts } from "../../../../../../../../state/hooks";
import { getAddress } from "../../../../../../../../utils/addressHelpers";
import { getHighResImage } from "../../../../../../../../utils";

const StyledSwiper = styled.div`
  .swiper-wrapper {
    height: 100%;
    align-items: center;
    display: flex;
  }

  .swiper-slide {
    width: 400px;
    margin-bottom: 20px;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  //flex-direction: column;
`

const NftSliderContainer = styled.div`
  margin: 25px 0 15px 0;
  border-radius: 10px;
  max-width: 400px;
  overflow-x: scroll;
  display: flex;
  justify-content: flex-start;
  @media only screen and (max-width: 470px) {
    max-width: 300px;
  }
`

const NftContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
`

const NftImage = styled.img`
  min-width: 150px;
  max-width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;

  @media only screen and (max-width: 412px) {
    max-width: 250px;
    align-self: center;
    margin-top: 10px;
  }
`

const NftVideo = styled.video`
  min-width: 150px;
  max-width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  @media only screen and (max-width: 412px) {
    max-width: 150px;
    align-self: center;
    margin-top: 10px;
  }
`

const SubHeaderText = styled.p`
  text-align: left;
  font: normal normal normal 14px/21px Poppins;
  color: #ffffff;
  word-break: break-all;
`

const SwiperSlideContainerText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`

interface TableDetailsProps {
  whalePool: WhalePool
}

function truncateString(str, num) {
  if(str.length > num) {
    return `${str.slice(0, num)}...`;
  }
  return str;
}

const PoolDetails: React.FC<TableDetailsProps> = ({ whalePool }) => {
  const history = useHistory()
  const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const source = event.target as HTMLImageElement
    source.onerror = null
    source.remove()
  }
  const { rewardNftIds } = whalePool

  const nfts = useGetNfts().data.filter(nft => rewardNftIds.includes(nft.id))
  nfts.reverse()
  return (
    <Container>
      <NftSliderContainer>
        {
          nfts.map((nft) => {
            if(nft.type === 'video') {
              return (
                <NftContainer>
                  <div><NftVideo key={nft.id} onClick={() => history.push(`/nfts/${nft.id}`)} autoPlay loop muted>
                    <source src={getHighResImage(nft.address)} type="video/webm"/>
                  </NftVideo>
                    <SwiperSlideContainerText>
                      <SubHeaderText>{nft.name}</SubHeaderText><br/>
                      <SubHeaderText>{truncateString(nft.description,80)}</SubHeaderText>
                    </SwiperSlideContainerText>
                  </div>
                </NftContainer>
              )
            }
            return (
              <NftContainer>
                <NftImage key={nft.id} onClick={() => history.push(`/nfts/${nft.id}`)} src={getHighResImage(nft.address)} onError={imageOnErrorHandler}/>
                <SwiperSlideContainerText>
                  <SubHeaderText>{nft.name}</SubHeaderText><br/>
                  <SubHeaderText>{truncateString(nft.description,80)}</SubHeaderText>
                </SwiperSlideContainerText>
              </NftContainer>
            )
          })
        }
      </NftSliderContainer>
    </Container>
  )
}

export default PoolDetails
