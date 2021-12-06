import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Modal, Text } from '@rug-zombie-libs/uikit'
import { useDrBurnenstein, useERC721, useNftOwnership } from '../../../../hooks/useContract'
import { account, burnGraveById, nftById } from '../../../../redux/get'
import useToast from '../../../../hooks/useToast'
import { useTranslation } from '../../../../contexts/Localization'
import { getAddress, getDrBurnensteinAddress, getNftSwapperAddress } from '../../../../utils/addressHelpers'
import { BIG_ZERO } from '../../../../utils/bigNumber'

export interface DepositNftModalProps {
  id: number,
  updateResult: any,
  onDismiss?: () => void
}

const DepositNftModal:React.FC<DepositNftModalProps> = ({ id, updateResult, onDismiss }) => {
  const [nftBalance, setNftBalance] = useState(BIG_ZERO);
  const [ids, setIds] = useState([])
  const [selected, setSelected] = useState(null)
  const [approved, setApproved] = useState(false)

  const drburn = useDrBurnenstein()
  const grave = burnGraveById(id)
  const nft = nftById(grave.depositNftId)

  const wallet = account()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()

  const nftOwnershipContract = useNftOwnership()
  const nftContract = useERC721(getAddress(nft.address))

  useEffect(() => {
    if (selected && wallet) {
      nftContract.methods.getApproved(selected).call().then(res => {
        setApproved(res === getNftSwapperAddress())
      })
    }
  }, [selected, wallet, nftContract.methods])

  useEffect(() => {
    if (wallet) {
      nftContract.methods.balanceOf(wallet).call().then(res => {
        setNftBalance(new BigNumber(res));
      })
    }
  }, [nftContract.methods, wallet])

  useEffect(() => {
    if (wallet) {
      nftOwnershipContract.methods.checkOwnership(wallet, getAddress(nft.address)).call()
        .then(res => {
          setIds(res);
      })
    }
  }, [nft.address, nftOwnershipContract.methods, wallet])

  function handleDeposit() {
    if (wallet && approved) {
      drburn.methods.deposit(id, 0, selected).send({ from: wallet }).then(() => {
        toastSuccess(t(`Deposited ${nft.symbol}`))
        updateResult(id)
        onDismiss()
      });
    }
  }

  const handleApprove = () => {
    if (wallet && !approved) {
      nftContract.methods.approve(getDrBurnensteinAddress(), selected).send({ from: wallet })
        .then(() => {
          setApproved(true);
      });
    }
  }

  const approveButton = selected && !approved;
  const depositButton = selected && approved;

  return (
    <Modal onDismiss={onDismiss} title={`Deposit ${nft.symbol}`}>
      <Flex alignItems='center' justifyContent='space-between' mb='8px'>
        <Text bold>Select ID of NFT:</Text>
        <Flex alignItems='center' minWidth='70px'>
          <Text ml='4px' bold>{nft.symbol}</Text>
        </Flex>
      </Flex>
      <Flex justifyContent='center'>
        {nft.type === 'image' ? (
          <img src={nft.path} alt='NFT' style={{ maxWidth: '10%' }} className='sc-cxNHIi bjMxQn' />
        ) : (
          <video autoPlay loop className='sc-cxNHIi bjMxQn'>
            <source src={nft.path} type='video/webm' />
          </video>
        )}
      </Flex>
      <Text mt='8px' color='textSubtle' fontSize='12px' mb='8px' style={{ width: '100%' }}>
        Balance: {nftBalance.toString()}
        {nftBalance.isZero()
          ? <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
            Must have {nft.symbol} NFT before you can deposit
          </Text>
          : <Text bold>IDS in your wallet:</Text>}
      </Text>
      <Flex justifyContent='center'>
        {ids.map(currentId => {
          return <div id={currentId} key={currentId} style={{ padding: '10px' }}><Button onClick={() => {
            setSelected(currentId)
          }} variant={currentId === selected ? 'secondary' : 'primary'}>{currentId}</Button></div>
        })}
      </Flex>
      <Flex justifyContent='center'>
        <Button onClick={() => {if (selected) { handleApprove() }}} disabled={!approveButton} mt='8px' as='a' variant={selected ? 'secondary' : 'primary'}>
          APPROVE {nft.symbol}
        </Button>
        <Text mt='8px' color='textSubtle' fontSize='12px' mb='8px' style={{ width: '10%' }} />
        <Button onClick={() => {if (selected) { handleDeposit() }}} disabled={!depositButton} mt='8px' as='a' variant={selected ? 'secondary' : 'primary'}>
          DEPOSIT {nft.symbol}
        </Button>
      </Flex>
    </Modal>
  )
}

export default DepositNftModal;