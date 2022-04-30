import React from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router'
import {Swiper, SwiperSlide} from 'swiper/react'
import whalePoolRewardNfts from "../../../../../../../../config/constants/whalePoolRewardNfts";

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

const NftImageContainer = styled.div`
  margin: 25px 0 15px 0;
  border-radius: 10px;
  max-width: 400px;
  overflow-x: scroll;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 412px) {
    flex-direction: column;
    justify-content: center;
  }
`

const NftImage = styled.img`
  min-width: 150px;
  max-width: 150px;
  height: 150px;
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
  max-width: 150px;
  height: 150px;
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

const SwiperSlideContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`

const SwiperSlideContainerText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`

interface TableDetailsProps {
    nftId: number
}

const PoolDetails: React.FC<TableDetailsProps> = ({nftId}) => {

    const history = useHistory()
    const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const source = event.target as HTMLImageElement
        source.onerror = null
        source.remove()
    }

    const linkToNft = () => {
        history.push(`/nfts/${nftId}`)
    }

    return (
        <Container>
            <NftImageContainer>
                <StyledSwiper>
                    <Swiper
                        initialSlide={1}
                        spaceBetween={75}
                        slidesPerView="auto"
                        freeMode
                        freeModeSticky
                        centeredSlides
                        mousewheel
                        keyboard
                        resizeObserver
                    >
                        {
                            whalePoolRewardNfts.map((nft, index) => {
                                if (nft.type === 'video') {
                                    return (
                                        <>
                                            <SwiperSlide>
                                                <SwiperSlideContainer>
                                                    <NftVideo key={nft.id} onClick={linkToNft} autoPlay loop muted>
                                                        <source src={nft.path} type="video/webm"/>
                                                    </NftVideo>
                                                    <SwiperSlideContainerText>
                                                        <SubHeaderText>{nft.name}</SubHeaderText><br/>
                                                        <SubHeaderText>{nft.description}</SubHeaderText>
                                                    </SwiperSlideContainerText>
                                                </SwiperSlideContainer>
                                            </SwiperSlide>
                                        </>
                                    )
                                }
                                return (
                                    <>
                                        <SwiperSlide>
                                            <SwiperSlideContainer>
                                                <NftImage key={nft.id} onClick={linkToNft} src={nft.path} onError={imageOnErrorHandler}/>
                                                <SwiperSlideContainerText>
                                                    <SubHeaderText>{nft.name}</SubHeaderText><br/>
                                                    <SubHeaderText>{nft.description}</SubHeaderText>
                                                </SwiperSlideContainerText>
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                    </>
                                )
                            })
                        }
                    </Swiper>
                </StyledSwiper>
            </NftImageContainer>
        </Container>
    )
}

export default PoolDetails
