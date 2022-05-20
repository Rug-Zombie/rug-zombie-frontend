import React from 'react'
import { LinkExternal, Modal, Text } from '@catacombs-libs/uikit'
import { formatAddress } from "../../../utils";

interface WrongPasswordModalProps {
  onDismiss?: () => void
}

const WrongPasswordModal: React.FC<WrongPasswordModalProps> = ({ onDismiss }) => {
  return (
    <Modal
      onDismiss={onDismiss}
      title="Wrong Password!"
      background="black!important"
      color="white!important"
      border="1px solid white!important"
    >
      <Text mt="8px" bold color="white" fontSize="14px" mb="8px">
        Hint : a rusty sign with the message <LinkExternal href='https://bscscan.com/address/0xE5a4f268272cA785386f5fff2c09a1bC90826532'>&quot;{formatAddress('0xE5a4f268272cA785386f5fff2c09a1bC90826532')}&quot;</LinkExternal> hangs outside the
        entrance
      </Text>
    </Modal>
  )
}

export default WrongPasswordModal
