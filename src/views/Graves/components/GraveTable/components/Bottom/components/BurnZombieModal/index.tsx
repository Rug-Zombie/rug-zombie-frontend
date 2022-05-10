import React, { useCallback, useState } from 'react'
import { Button, Flex, Image, Modal, Text } from '@rug-zombie-libs/uikit'

import { useDrFrankenstein } from 'hooks/useContract'
import { AUTOSHARK_EXCHANGE_URL } from 'config'
import { getZombieAddress } from 'utils/addressHelpers'
import { BigNumber } from 'bignumber.js'
import { zombieBalance } from '../../../../../../../../redux/get'
import tokens from '../../../../../../../../config/constants/tokens'
import { useDepositRug } from '../../../../../../../../hooks/useGrave'
import { getDecimalAmount } from '../../../../../../../../utils/formatBalance'

interface BurnZombieModalProps {
  pid: number
  onDismiss?: () => void
}

const BurnZombieModal: React.FC<BurnZombieModalProps> = ({ pid, onDismiss }) => {
  const drFrankenstein = useDrFrankenstein()
  const { onDepositRug } = useDepositRug(drFrankenstein, pid, getDecimalAmount(new BigNumber(1)))
  const [burning, setBurning] = useState(false)
  const handleBurnZombie = useCallback(async () => {
    setBurning(true)
    onDepositRug()
      .then(() => {
        onDismiss()
        setBurning(false)
      })
      .catch(() => {
        setBurning(false)
      })
  }, [onDepositRug, onDismiss])

  return (
    <Modal onDismiss={onDismiss} title="Sacrifice ZMBE">
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Flex alignItems="center" minWidth="70px">
          <Image src={`/images/tokens/${tokens.zmbe.symbol}.png`} width={24} height={24} alt="ZMBE" />
          <Text ml="4px" bold>
            {tokens.zmbe.symbol}
          </Text>
        </Flex>
      </Flex>
      <Text mt="8px" ml="auto" bold color="tertiary" fontSize="14px" mb="8px">
        Your journey begins here. Burn a zombie and start staking to receive it as an NFT in 7 days.
        <br />
        Don&apos;t worry, he&apos;s already dead so he won&apos;t feel it.
      </Text>
      {zombieBalance().isZero() ? (
        <Button
          mt="8px"
          as="a"
          href={`${AUTOSHARK_EXCHANGE_URL}/swap?outputCurrency=${getZombieAddress()}`}
          variant="secondary"
        >
          Get ZMBE
        </Button>
      ) : (
        <Button onClick={handleBurnZombie} mt="8px" as="a" variant="secondary">
          {burning ? 'Burning...' : 'Burn 1 ZMBE'}
        </Button>
      )}
    </Modal>
  )
}

export default BurnZombieModal
