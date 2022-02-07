import styled from 'styled-components'
import { PrimaryButton, SecondaryButton } from '../Buttons'

export const Navbar = styled.nav`
  width: 100%;
  background-color: #010202;
  opacity: 1;
  z-index: 0;
`;

export const NavbarContent = styled.div`
  height: 100px;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const Logo = styled.img`
  height: 36px;
  margin: 0 20px 0 20px;
  &:hover { cursor: pointer; }
`;

export const Links = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1279px) {
    display: none;
  }
`;

export const DropdownMenu = styled.div`
  visibility: hidden;
  display: none;
  opacity: 0;
  transition: all 0.5s ease;
  position: relative;
  @media (max-width: 1279px) {
    visibility: visible;
    opacity: 1;
    display: inline-block;
  }
`;

export const DropdownContent = styled.div`
  position: absolute;
  display: block;
  background-color: #010202;
  border: 2px solid #010202;
  border-radius: 10px;
  right: 0px;
  z-index: 1;
`;

export const DropdownItem = styled.div`
  &:hover {
    cursor: pointer;
    background-color: #151E21;
    border-radius: 10px;
    color: #30C00D;
  }
  padding: 0 15px 0 15px;
`; 

export const Text = styled.a`
  text-align: center;
  font: normal normal normal 16px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
  white-space: nowrap;
  &:hover { text-shadow: 0 0 5px white; }
`;

export const MenuText = styled(Text)`
  padding: 5px;
  color: #6B7682;
  font: normal normal normal 14px/30px Poppins;
  &:hover {
    color: #30C00D;
    cursor: pointer;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TokenButton = styled(SecondaryButton)`
  padding: 0 25px 0 25px;
  margin: 0 20px 0 20px;
  &:hover {
    cursor: pointer;
  }
`;



export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid green;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`
