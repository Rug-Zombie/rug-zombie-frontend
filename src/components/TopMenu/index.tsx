import React from 'react'
import styled from 'styled-components'
import logo from 'images/menu/Logo.svg'
import more from 'images/menu/More.png'
import zombiehead from 'images/menu/ZombieHead.svg'
import './TopMenu.Styles.css'
import config from './config'
import { zombiePriceUsd } from '../../redux/get'
import { PrimaryButton, SecondaryButton } from '../Buttons'

const BarDiv = styled.header`
  width: 100%;
  height: 100px;
  background: #010202 0% 0% no-repeat padding-box;
  opacity: 1;
  z-index: 0;
`

const Logo = styled.img`
  position: absolute;
  top: 31.99px;
  left: 50px;
  height: 36px;
  background: transparent url('images/menu/Logo.svg') 0% 0% no-repeat padding-box;
  opacity: 1;
`

const MenuText = styled.a`
  text-align: center;
  font: normal normal normal 16px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
  white-space: nowrap;
  &:hover { text-shadow: 0 0 5px white; }
`

const ConnectText = styled(MenuText)`
  color: black;
  &:hover { text-shadow: 0 0 5px limegreen; };
  font-weight: bold;
`

const MenuDiv = styled.div`
  padding-right: 23px;
  flex-grow: 0;
  flex-shrink: 0;
`

const MenuFlex = styled.div`
  position: absolute;
  top: 38px;
  left: 520px;
  width: 803px;
  height: 41px;
  display: flex;
  justify-content: right;
`

const TokenButton = styled(SecondaryButton)`
  position: absolute;
  top: 25px;
  right: 210px;
`

const ConnectButton = styled(PrimaryButton)`
  position: absolute;
  top: 25px;
  right: 50px;
`

const TopMenu = (props) => {
  const { children } = props
  return <div>
    <BarDiv>
      <Logo src={logo} alt='RugZombie Logo' />
      <MenuFlex>
        {config.map(i => <MenuDiv>
            <MenuText href={i.href}>{i.label}</MenuText>
          </MenuDiv>,
        )}
        <img src={more} alt='More Icon' style={{width: '24px', height: '24px'}} />
      </MenuFlex>
      <TokenButton style={{flexDirection: 'row'}}>
        <img src={zombiehead} alt='Zombie Icon' style={{height: '70%', paddingRight: '20px'}}/>
        <MenuText style={{fontWeight: 'bold'}}>${zombiePriceUsd().toPrecision(1)}</MenuText>
      </TokenButton>
      <ConnectButton>
        <ConnectText>Connect</ConnectText>
      </ConnectButton>
    </BarDiv>
    {children}
  </div>
}

export default TopMenu
