import React from 'react'
import { Flex } from '@catacombs-libs/uikit'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@rug-zombie-libs/uikit' // requires a loader
import { Swiper, SwiperSlide } from 'swiper/react'
import Menu from '../../../../components/Catacombs/Menu'
import CatacombsBackgroundDesktopSVG from '../../../../images/CatacombsMain-1920x1080px.svg'
import CatacombsBackgroundMobileSVG from '../../../../images/CatacombsMain-414x720px.svg'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Page from '../../../../components/layout/Page'
import InstabuyCard from './InstabuyCard'
import useSwiper from '../../../Mausoleum/hooks/useSwiper'

const StyledDiv = styled.div`
  text-align: center;
  position: relative;
  color: white;
  height: 100%;
  width: 100%;
`

const Container = styled.div`
  text-align: center;
  position: absolute;
  top: 15%;
  width: 100%;
  height: calc(100vh - 64px);
  min-width: 300px;
  min-height: calc(100vh - 64px);
  overflow: hidden;
  @media (max-width: 479px) {
    height: 40%;
    top: 2%;
    width: 90%;
    left: 5%;
  }
`

const StyledSwiper = styled.div`
  .swiper-wrapper {
    height: 100%;
    align-items: center;
    display: flex;
  }

  .swiper-slide {
    width: 320px;
  }
`

interface DataLabProps {
  modalObj: { modal: boolean, setModal: any };
}

const DataLab: React.FC<DataLabProps> = ({ modalObj }) => {
  const { isLg, isXl } = useMatchBreakpoints()
  const isDesktop = isLg || isXl
  const { setSwiper } = useSwiper()

  return (
    <Menu>
      <StyledDiv>
        {isDesktop ? <img src={CatacombsBackgroundDesktopSVG} alt='catacombs-rug-zombie' /> :
          <img src={CatacombsBackgroundMobileSVG} alt='catacombs-rug-zombie' />
        }
        <Flex justifyContent='center'>
          <Container>
            <Page>
              <StyledSwiper>
                <Swiper
                  initialSlide={1}
                  onSwiper={setSwiper}
                  spaceBetween={64}
                  slidesPerView='auto'
                  freeMode
                  freeModeSticky
                  centeredSlides
                  mousewheel
                  keyboard
                  resizeObserver
                >
                  <SwiperSlide>
                    <div style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                      <InstabuyCard id={3} modalObj={modalObj} />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                      <InstabuyCard id={4} modalObj={modalObj} />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                      <InstabuyCard id={5} modalObj={modalObj} />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </StyledSwiper>
            </Page>
          </Container>
        </Flex>
      </StyledDiv>
    </Menu>
  )
}

export default DataLab
