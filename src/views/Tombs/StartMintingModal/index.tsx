import React, { useEffect, useState } from 'react'
import { Button, Flex, Image, Modal, Text } from '@rug-zombie-libs/uikit'
import { useTombOverlay } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { BIG_ZERO } from '../../../utils/bigNumber'

interface StartMintingModalProps {
  pid: number,
  updateOverlay: any,
  onDismiss?: () => void,
}

const StartMintingModal: React.FC<StartMintingModalProps> = ({ pid, onDismiss, updateOverlay }) => {
  const { toastSuccess } = useToast()
  const { t } = useTranslation()
  const tombOverlay = useTombOverlay()
  const { account } = useWeb3React()
  const [mintingFee, setMintingFee] = useState(BIG_ZERO)

  useEffect(() => {
    tombOverlay.methods.mintingFeeInBnb().call()
      .then(fee => {
        setMintingFee(new BigNumber(fee.toString()))
      })
  }, [tombOverlay.methods])

  const handleStartMinting = () => {
    tombOverlay.methods.mintingFeeInBnb().call()
      .then(fee => {
        tombOverlay.methods.startMinting(pid).send({ value: fee, from: account })
          .then(() => {
            toastSuccess(t('Minting has started'))
            updateOverlay()
            onDismiss()
          })
      })
  }

  return (
    <Modal onDismiss={onDismiss} title='Start Minting'>
      <Flex alignItems='center' justifyContent='space-between' mb='8px'>
        <Flex alignItems='center' minWidth='70px'>
          <Image src='/images/tokens/ZMBE.png' width={24} height={24} alt='ZMBE' />
          <Text ml='4px' bold>Start NFTombs Minting</Text>
        </Flex>
      </Flex>
      <Text mt='8px' ml='auto' bold color='tertiary' fontSize='14px' mb='8px'>
        NFTombs minting requires a small fee
        of {getFullDisplayBalance(new BigNumber(mintingFee.toString()), 18, 4)} BNB. This fee covers the cost of
        the <br />
        Verifiable Random Function that is used. This is also a two step process, as the VRF<br />
        has a delay while it generates the random number off-chain. Once this has completed<br />
        you can finish the minting process to claim your NFT!
      </Text>
      <Button onClick={handleStartMinting} mt='8px' as='a' variant='secondary'>Start Minting</Button>
    </Modal>
  )
}

export default StartMintingModal