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
  right: 0px;
  z-index: 1;
`;

export const DropdownItem = styled.div`
  &:hover {
    cursor: pointer;
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
  padding: 0 5px 0 5px;
`;

export const ConnectText = styled(Text)`
  color: black;
  &:hover { text-shadow: 0 0 5px limegreen; };
  font-weight: bold;
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

export const ConnectButton = styled(PrimaryButton)`
  padding: 0 25px 0 25px;
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
`;