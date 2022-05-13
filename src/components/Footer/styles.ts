import styled from 'styled-components'
import backgroundImage from 'images/home/Footer.svg'

export const FooterContainer = styled.footer`
  height: 175px;
  max-width: 1920px;
  background-color: #010202;
`

export const FooterImage = styled.div`
  position: relative;
  top: -310px;
  height: 354px;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`

export const FooterContent = styled.div`
  position: relative;
  top: -310px;
  padding: 0 0 20px 0;
  margin: 0 auto;
  width: 90vw;
  max-width: 1920px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

export const Zmbe = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`

export const CopyrightText = styled.p`
  text-align: center;
  font: normal normal 300 12px/30px Poppins;
  color: #6b7682;
  padding-top: 10px;
`

export const FooterLists = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

export const FooterList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

export const FooterListItem = styled.li`
  list-style-type: none;
  font: normal normal 300 16px/20px Poppins;
  color: #ffffff;
  &:hover {
    cursor: pointer;
    text-shadow: 0 0 5px white;
  }
`

export const FooterIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export const FooterIconLink = styled.a`
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: 25px;
`

export const FooterIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  border: 1px solid #b8c00d;
`

export const DiscordFooterIcon = styled.img`
  width: 40px;
  height: 40px;
  transform: scale(1.15);
  
`
