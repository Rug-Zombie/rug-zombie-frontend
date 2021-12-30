import React from 'react'
import './Home.Styles.css'
import styled from 'styled-components'
import TopMenu from '../../components/TopMenu'

interface HomeProps {
  modalObj: {modal: boolean, setModal: any};
}

const TitleTextBox = styled.div`
  position: absolute;
  top: 270px;
  left: 315px;
  width: 740px;
  height: 156px;
  text-align: left;
  font: normal normal 600 60px/72px Poppins, SemiBold;
  letter-spacing: 0px;
  color: #FFFFFF;
`

const SubTextBox = styled.div`
  position: absolute;
  top: 470px;
  left: 315px;
  width: 630px;
  height: 100px;
  text-align: left;
  font: normal normal 300 20px/36px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
`

const Home: React.FC<HomeProps> = ({ modalObj }) => {

  return (
    <>
      <TopMenu>
        <div id='home-section-1'>
          <TitleTextBox>
            Resurrect Your Dead Tokens
          </TitleTextBox>
          <SubTextBox>
            The Future of GameFi and E-Commerce
          </SubTextBox>
        </div>
      </TopMenu>
    </>
  )
}

export default Home
