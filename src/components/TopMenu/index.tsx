import React from 'react'
import styled from 'styled-components'
import logo from 'images/menu/Logo.svg'
import Flex from '../layout/Flex'

const BarDiv = styled.header`
  width: 1920px;
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

const MenuText = styled.text`
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/25px var(--unnamed-font-family-poppins) !important;
  letter-spacing: var(--unnamed-character-spacing-0) !important;
  color: var(--unnamed-color-ffffff) !important;
  text-align: left;
  font: normal normal normal 16px/25px Poppins !important;
  letter-spacing: 0px !important;
  color: #FFFFFF;
  opacity: 1;
`

const TopMenu = (props) => {
  const { children } = props
  return <div>
    <BarDiv>
        <Logo src={logo} alt='RugZombie Logo'/>
      <Flex style={{
        position: 'absolute',
        top: '31.99px',
        width: '100%',
        height: '41px'}}>
        <MenuText>yoo</MenuText>
      </Flex>
    </BarDiv>
    {children}
  </div>
}

export default TopMenu;
