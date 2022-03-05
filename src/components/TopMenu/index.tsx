import React, { useState } from 'react'
import logo from 'images/Logo.svg'
import dropdownIcon from 'images/menu/Dropdown_icon.svg'
import hideDropdownIcon from 'images/menu/Hide_Dropdown.svg'
import zombiehead from 'images/menu/ZombieHead.svg'
import basiczombie from 'images/BasicZombie.gif'
import { useHistory } from 'react-router'
import { zombiePriceUsd } from '../../redux/get'
import config, { MenuItem } from './config'

import {
  Buttons,
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  Links,
  Logo,
  MenuText,
  Navbar,
  NavbarContent,
  Text,
  TokenButton,
  ProfileImage,
} from './styles'
import UnlockButton from '../UnlockButton'
import { routes } from '../../routes'

const TopMenu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const history = useHistory()
  const handleClick = (e) => {
    e.preventDefault()
    setShowMenu((prev) => !prev)
  }

  const handleDropdownItemClick = (e, item) => {
    e.preventDefault()
    setShowMenu(false)
    history.push(item.href)
  }

  return (
    <Navbar>
      <NavbarContent>
        <Logo src={logo} alt="RugZombie Logo" onClick={() => history.push('/')} />
        <Links>
          {config.map((i) => {
            if (i.type === MenuItem.External) {
              return (
                <MenuText key={i.label} href={i.href}>
                  {i.label}
                </MenuText>
              )
            }
            return (
              <MenuText key={i.label} onClick={() => history.push(i.href)}>
                {i.label}
              </MenuText>
            )
          })}
        </Links>
        <DropdownMenu>
          <button
            type="button"
            onClick={handleClick}
            style={{
              outline: 'none',
              background: 'transparent',
              border: '1px solid transparent',
            }}
          >
            {showMenu ? (
              <img src={hideDropdownIcon} alt="Hide Dropdown Icon" />
            ) : (
              <img src={dropdownIcon} alt="Dropdown Icon" />
            )}
          </button>
          {showMenu ? (
            <DropdownContent>
              {config.map((i) => {
                if (i.type === MenuItem.External) {
                  return (
                    <DropdownItem
                      key={i.label}
                      onClick={() => {
                        window.location.href = i.href
                      }}
                    >
                      <MenuText>{i.label}</MenuText>
                    </DropdownItem>
                  )
                }
                return (
                  <DropdownItem key={i.label} onClick={(e) => handleDropdownItemClick(e, i)}>
                    <MenuText>{i.label}</MenuText>
                  </DropdownItem>
                )
              })}
            </DropdownContent>
          ) : null}
        </DropdownMenu>
        <Buttons>
          <TokenButton style={{ flexDirection: 'row' }}>
            <img src={zombiehead} alt="Zombie Icon" style={{ height: '70%', paddingRight: '20px' }} />
            <Text style={{ fontWeight: 'bold' }}>${zombiePriceUsd().toPrecision(1)}</Text>
          </TokenButton>
          <UnlockButton />
          <ProfileImage onClick={() => history.push(routes.PROFILE)} src={basiczombie} alt="Profile Image" />
        </Buttons>
      </NavbarContent>
    </Navbar>
  )
}

export default TopMenu
