/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Modal } from '@rug-zombie-libs/uikit'
import useTheme from 'hooks/useTheme'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components'
import ViewCard from '../ViewCard'
import { useGetNftById } from '../../../../state/hooks'

interface ViewModalProps {
  id: number;
  onDismiss?: any;
  setSwiper: any;
  refresh: () => void;
}

const StyledSwiper = styled.div`
  .swiper-wrapper {
    align-items: center;
    display: flex;
  }

  .swiper-slide {
    width: 320px;
  }
`

const ViewModal: React.FC<ViewModalProps> = ({ id, onDismiss, setSwiper, refresh }) => {
  const { userInfo: { ownedIds } } = useGetNftById(id)
  const { theme } = useTheme()
  return <Modal onDismiss={onDismiss} title='In Wallet' headerBackground={theme.colors.backgroundAlt}
                style={{ minWidth: '50%' }}>
    <StyledSwiper style={{ width: '100%' }}>
      <Swiper
        initialSlide={0.5}
        onSwiper={setSwiper}
        spaceBetween={32}
        slidesPerView='auto'
        freeMode
        freeModeSticky
        centeredSlides
        mousewheel
        keyboard
        resizeObserver
      >
        {ownedIds.map(ownedId => {
          return <SwiperSlide><ViewCard id={id} nftId={ownedId} refresh={refresh} /></SwiperSlide>
        })}
      </Swiper>
    </StyledSwiper>
  </Modal>
}

export default ViewModal
