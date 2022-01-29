import React, { useState } from 'react'
import logo from 'images/Logo.svg'
import more from 'images/menu/More.png'
import zombiehead from 'images/menu/ZombieHead.svg'
import { zombiePriceUsd } from '../../redux/get'
import config from './config'

import {
  Navbar,
  NavbarContent,
  Logo,
  Links,
  MenuText,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Buttons,
  TokenButton,
  Text,
  ConnectText,
  ConnectButton,
} from './styles';

const TopMenu: React.FC = () => {
  const [ showMenu, setShowMenu ] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowMenu(prev => !prev);
  };

  return (
    <Navbar>
      <NavbarContent>
      <Logo src={logo} alt='RugZombie Logo' />
      <Links>
        {config.map(i => <MenuText key={i.label} href={i.href}>{i.label}</MenuText>)}
      </Links>
      <DropdownMenu>
        <button type="button" onClick={handleClick} style={{
          outline: "none",
          background: "transparent",
          border: "1px solid transparent",
        }}>
          <img src={more} alt='More Icon' style={{width: '24px', height: '24px'}} />
        </button>
        {showMenu ? (
            <DropdownContent>
              {config.map(i => <DropdownItem>
                  <MenuText key={i.label} href={i.href}>{i.label}</MenuText>
                </DropdownItem>,
              )}
            </DropdownContent>
        ) : null}
      </DropdownMenu>
      <Buttons>
        <TokenButton style={{flexDirection: 'row'}}>
          <img src={zombiehead} alt='Zombie Icon' style={{height: '70%', paddingRight: '20px'}}/>
          <Text style={{fontWeight: 'bold'}}>${zombiePriceUsd().toPrecision(1)}</Text>
        </TokenButton>
        <ConnectButton>
          <ConnectText>Connect</ConnectText>
        </ConnectButton>
      </Buttons>
      </NavbarContent>
    </Navbar>
  );
}

export default TopMenu;
