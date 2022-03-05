import React, { useEffect, useState } from 'react'
import { Button, Flex, Image, Modal, Text } from '@rug-zombie-libs/uikit'
import { BigNumber } from 'bignumber.js'
import { useERC20, useSharkpool } from 'hooks/useContract'
import { account, sharkPoolById } from 'redux/get'
import { getAddress } from 'utils/addressHelpers'
import { APESWAP_EXCHANGE_URL } from 'config'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'

interface DepositModalProps {
  id: number
  updateResult: any
  onDismiss?: () => void
}

const DepositModal: React.FC<DepositModalProps> = ({ id, updateResult, onDismiss }) => {
  const [hasToken, setHasToken] = useState(false)

  const pool = sharkPoolById(id)
  const sharkpoolContract = useSharkpool(id)
  const token = useERC20(getAddress(pool.depositToken.address))
  const wallet = account()
  const { toastDefault } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    if (wallet) {
      token.methods
        .balanceOf(wallet)
        .call()
        .then((res) => {
          setHasToken(!new BigNumber(res).isZero())
        })
    }
  })

  const handleDeposit = () => {
    sharkpoolContract.methods
      .depositUnlock()
      .send({ from: wallet })
      .then(() => {
        updateResult(id)
        toastDefault(t(`1 ${pool.depositToken.symbol} DEPOSITED`))
        onDismiss()
      })
  }

  return (
    <Modal onDismiss={onDismiss} title={`Deposit ${pool.depositToken.symbol}`}>
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Flex alignItems="center" minWidth="70px">
          <Image
            src={`/images/tokens/${pool.depositToken.symbol}.png`}
            width={24}
            height={24}
            alt={`${pool.depositToken.symbol}`}
          />
          <Text ml="4px" bold>
            {pool.depositToken.symbol}
          </Text>
        </Flex>
      </Flex>
      <Text mt="8px" ml="auto" bold color="tertiary" fontSize="14px" mb="8px">
        To enter this pool, you must deposit 1 {pool.depositToken.symbol} token as part of the unlock process.
      </Text>
      {hasToken ? (
        <Button onClick={handleDeposit} mt="8px" as="a" variant="secondary">
          DEPOSIT {pool.depositToken.symbol}
        </Button>
      ) : (
        <Button
          mt="8px"
          as="a"
          href={`${APESWAP_EXCHANGE_URL}/swap?outputCurrency=${getAddress(pool.depositToken.address)}`}
          variant="secondary"
        >
          GET {pool.depositToken.symbol}
        </Button>
      )}
    </Modal>
  )
}

export default DepositModal
