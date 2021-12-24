/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import header from 'images/GraveyardHeader.jpg'
import TopMenu from '../../components/TopMenu'
import './Graveyard.Styles.css'
import Page from '../../components/layout/Page'
import Filter from './components/Filter'
import CollectionCard from './components/CollectionCard'
import Collections from './components/Collections'
import Footer from '../../components/Footer'
import Nfts from './components/Nfts'
import { nftUserInfo } from '../../redux/fetch'
import { useNftOwnership } from '../../hooks/useContract'

const Banner = styled.img`
  min-width: 1280px;
`

const Title = styled.text`
  text-align: center;
  font: normal normal 600 36px/72px Poppins;
  letter-spacing: 1.8px;
  color: #FFFFFF;
  opacity: 1;
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SubTextBox = styled.div`
  width: 45%;
  text-align: center;
  font: normal normal 300 20px/30px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
  opacity: 1;
`

const Line = styled.div`
  border-radius: 3px;
  opacity: 1;
  margin-right: auto;
  margin-left: auto;
  height: 5px;
`


const Graveyard: React.FC = () => {
  const contract = useNftOwnership()
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    nftUserInfo(contract).then(() => {
      setUpdate(!update)
    })
    // eslint-disable-next-line
  }, [contract])
  return <>
      <Banner src={header} alt="Banner" />
      <div style={{paddingTop: '100px'}}/>

      <TitleSection>
        <Title>Explore the Graveyard</Title>
        <div style={{paddingTop: '20px'}}/>
        <Line style={{
          width: '30px',
          background: '#B8C00D 0% 0% no-repeat padding-box',
        }} />
        <div style={{paddingTop: '30px'}}/>
        <SubTextBox>
          View our NFT collection powering the RugZombie gaming ecosystem… Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        </SubTextBox>
        <div className="section-end"/>
      </TitleSection>
      <Collections />
      <Nfts top='-100px' />
      <Footer />
    </>
}

export default Graveyard
