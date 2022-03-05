/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import header from 'images/GraveyardHeader.jpeg'
import Footer from 'components/Footer'
import { FooterImage } from 'components/Footer/styles'
import { useWeb3React } from '@web3-react/core'
import Collections from './components/Collections'
import { useAppDispatch } from '../../state'
import { fetchNftPublicDataAsync, fetchNftUserDataAsync } from '../../state/nfts'
import SectionHeader from '../../components/Home/components/SectionHeader'

const Banner = styled.div`
  max-width: 1920px;
  min-height: 350px;
  max-height: 370px;
  background-image: url(${header});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SubTextBox = styled.p`
  width: 45%;
  text-align: center;
  font: normal normal 300 20px/30px Poppins;
  color: #6b7682;
  margin: 25px 0;
  @media (max-width: 999px) {
    width: 70%;
  }
  @media (max-width: 499px) {
    width: 90%;
  }
`

const SectionEnd = styled(FooterImage)`
  top: -200px;
  width: 100%;
`

const Graveyard: React.FC = () => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  useEffect(() => {
    dispatch(fetchNftPublicDataAsync())
    if (account) {
      dispatch(fetchNftUserDataAsync(account))
    }
  }, [account, dispatch])
  return (
    <>
      <Banner />
      <TitleSection>
        <SectionHeader title="Explore the Graveyard" />
        <SubTextBox>View our NFT collection powering the RugZombie gaming ecosystem.</SubTextBox>
        <SectionEnd />
      </TitleSection>
      <Collections />
      <Footer />
    </>
  )
}

export default Graveyard
