import React from 'react'
import { Button, useWalletModal } from '@rug-zombie-libs/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { PrimaryButton } from './Buttons'
import { Text } from './TopMenu/styles'
import { formatAddress } from '../utils'

export const ConnectButton = styled(PrimaryButton)`
  padding: 0 25px 0 25px;
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const ConnectText = styled(Text)`
  color: black;
  &:hover { text-shadow: 0 0 5px limegreen; };
  font-weight: bold;
`;

const UnlockButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  const { account } = useWeb3React()

  return (
    <ConnectButton onClick={account ? null : onPresentConnectModal} {...props}>
      <ConnectText>{account ? formatAddress(account) : t('Connect')}</ConnectText>
    </ConnectButton>
  )
}

export default UnlockButton
