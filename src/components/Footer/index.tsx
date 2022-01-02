import React from 'react'
import styled from 'styled-components'
import logo from 'images/Logo.svg'
import './Footer.Styles.css'
import { useHistory } from 'react-router'
import telegram from 'images/footer/Telegram.svg'
import twitter from 'images/footer/Twitter.svg'
import config from './config'

const FooterFlex = styled.div`
  position: relative;
  top: -300px;
  width: 80%;
  height: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-top: 56px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const FooterColumn = styled.div`
  height: 100%;
  max-width: 230px;
  display: flex;
  flex-direction: column;
`

const CopyrightText = styled.text`
  text-align: center;
  font: normal normal 300 12px/30px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
  padding-top: 34px;
`

const FooterText = styled.div`
  text-align: left;
  font: normal normal 300 16px/20px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
`

const Footer: React.FC = () => {
  const history = useHistory()

  return (
    <>
      <div id='home-footer'>
        <div id='footer-img' />
        <FooterFlex>
          <FooterColumn>
            <img src={logo} alt='footer logo' />
            <CopyrightText>
              © 2022 RugZombie. All rights reserved
            </CopyrightText>
          </FooterColumn>
          <div style={{paddingLeft: '208px'}}/>
          {config.map(column => {
            return <div style={{paddingLeft: '96px'}}>
              <FooterColumn>
                {column.map(item => {
                  return <FooterText>{item.label}</FooterText>
                })}
              </FooterColumn>
            </div>
          })}
          <div style={{paddingLeft: '208px'}}/>

          <img src={telegram} style={{width: '50px', height: '50px'}} alt='Telegram icon'/>
          <div style={{paddingLeft: '20px'}}/>

          <img src={twitter} style={{width: '50px', height: '50px'}} alt='Twitter Icon'/>
          <div style={{paddingLeft: '208px'}}/>

        </FooterFlex>
      </div>
    </>
  )
}

export default Footer
