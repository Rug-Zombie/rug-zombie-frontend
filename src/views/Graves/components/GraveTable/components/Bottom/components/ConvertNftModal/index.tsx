import React, { useCallback, useEffect, useState } from 'react'
import { Button, Flex, Modal, Text } from '@rug-zombie-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { useERC721, useNftConverter } from '../../../../../../../../hooks/useContract'
import { getAddress, getNftConverterAddress } from '../../../../../../../../utils/addressHelpers'
import { equalAddresses } from '../../../../../../../../utils'
import { useAppDispatch } from '../../../../../../../../state'
import { fetchNftUserDataAsync } from '../../../../../../../../state/nfts'
import { useGetNftById } from '../../../../../../../../state/hooks'
import { useConvertNft } from '../../../../../../../../hooks/useNftConverter'

export interface ConvertNftModalProps {
  depositNftId: number
  nftConverterPid: number
  onDismiss?: () => void
}

const ConvertNftModal: React.FC<ConvertNftModalProps> = ({ depositNftId, nftConverterPid, onDismiss }) => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { symbol, type, path, address, userInfo: { ownedIds } } = useGetNftById(depositNftId)
  const nftContract = useERC721(getAddress(address))
  const nftConverterContract = useNftConverter()
  const [selected, setSelected] = useState(null)
  const [approved, setApproved] = useState(false)
  const [converting, setConverting] = useState(false)
  const [approving, setApproving] = useState(false)
  const { onNftConvert } = useConvertNft(nftConverterContract, nftConverterPid, selected)
  const nftBalance = ownedIds.length

  useEffect(() => {
    dispatch(fetchNftUserDataAsync(account))
  }, [account, dispatch])

  useEffect(() => {
    if (selected && account) {
      nftContract.methods.getApproved(selected).call().then(res => {
        setApproved(equalAddresses(res, getNftConverterAddress()))
      })
    }
  }, [selected, nftContract.methods, account])

  const handleConvert = useCallback(async () => {
    setConverting(true)
    onNftConvert()
      .then(() => {
        setConverting(false)
        onDismiss()
      })
      .catch(() => {
        setConverting(false)
      })
  }, [onDismiss, onNftConvert])

  const handleApprove = () => {
    if (account && !approved) {
      setApproving(true)
      nftContract.methods.approve(getNftConverterAddress(), selected).send({ from: account })
        .then(() => {
          setApproved(true)
          setApproving(false)
        })
        .catch(() => {
          setApproving(false)
        })
    }
  }

  const approveButton = selected && !approved
  const depositButton = selected && approved

  return (
    <Modal onDismiss={onDismiss} title={`Convert ${symbol}`} headerBackground='black'>
      <Flex alignItems='center' justifyContent='space-between' mb='8px'>
        <Text bold>Select ID of NFT:</Text>
        <Flex alignItems='center' minWidth='70px'>
          <Text ml='4px' bold>{symbol}</Text>
        </Flex>
      </Flex>
      <Flex justifyContent='center' style={{ maxHeight: '200px', maxWidth: '400px' }}>
        {type === 'image' ? (
          <img
            src={path} alt='test'
            style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain' }} />
        ) : (
          <video autoPlay loop className='sc-cxNHIi bjMxQn'>
            <source src={path} type='video/webm' />
          </video>
        )}
      </Flex>
      <Text mt='8px' color='textSubtle' fontSize='12px' mb='8px' style={{ width: '100%' }}>
        Balance: {nftBalance.toString()}
        {nftBalance === 0
          ? <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
            Must have {symbol} NFT before you can deposit
          </Text>
          : <Text bold>IDS in your wallet:</Text>}
      </Text>
      <Flex justifyContent='center'>
        {ownedIds.map(currentId => {
          return <div id={currentId.toString()} key={currentId} style={{ padding: '10px' }}><Button onClick={() => {
            setSelected(currentId)
          }} variant={currentId === selected ? 'secondary' : 'primary'}>{currentId}</Button></div>
        })}
      </Flex>
      <Flex justifyContent='center'>
        <Button onClick={() => {
          if (selected) {
            handleApprove()
          }
        }} disabled={!approveButton} mt='8px' as='a' variant={selected ? 'secondary' : 'primary'}>
          {approving ? 'Approving...' : 'Approve NFT'}
        </Button>
        <Text mt='8px' color='textSubtle' fontSize='12px' mb='8px' style={{ width: '10%' }} />
        <Button onClick={async () => {
          if (selected) {
            await handleConvert()
          }
        }} disabled={!depositButton} mt='8px' as='a' variant={selected ? 'secondary' : 'primary'}>
          {converting ? 'Converting...' : `Convert ${symbol}`}
        </Button>
      </Flex>
    </Modal>
  )
}

export default ConvertNftModal