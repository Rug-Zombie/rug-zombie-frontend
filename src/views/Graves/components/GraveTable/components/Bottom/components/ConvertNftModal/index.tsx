import React, { useCallback, useEffect, useState } from 'react'
import { Flex, Modal, Text } from '@rug-zombie-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { useERC721, useNftConverter } from '../../../../../../../../hooks/useContract'
import { getAddress, getNftConverterAddress } from '../../../../../../../../utils/addressHelpers'
import { equalAddresses } from '../../../../../../../../utils'
import { useAppDispatch } from '../../../../../../../../state'
import { fetchNftUserDataAsync } from '../../../../../../../../state/nfts'
import { useGetNftById } from '../../../../../../../../state/hooks'
import { useConvertNft } from '../../../../../../../../hooks/useNftConverter'


const PrimaryStakeButton = styled.button`
  height: 60px;
  width: 150px;
  background: #b8c00d 0% 0% no-repeat padding-box;
  border-radius: 10px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2px;

  &:hover {
    cursor: pointer;
  }
`

const SecondaryStakeButton = styled.button`
  height: 60px;
  width: 150px;
  border: 2px solid #b8c00d;
  border-radius: 10px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2px;

  &:hover {
    cursor: pointer;
  }
`

const PrimaryStakeButtonText = styled.div`
  text-align: center;
  font: normal normal normal 16px/25px Poppins;
  color: #010202;
`

const SecondaryStakeButtonText = styled.div`
  text-align: center;
  font: normal normal normal 16px/25px Poppins;
  color: #ffffff;
`

const OverflowFlex = styled(Flex)`
  overflow-x: scroll;
  justify-content: center;
  margin-bottom: 10px;
`

export interface ConvertNftModalProps {
  depositNftId: number
  nftConverterPid: number
  onDismiss?: () => void
}

const ConvertNftModal: React.FC<ConvertNftModalProps> = ({ depositNftId, nftConverterPid, onDismiss }) => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const {
    symbol,
    type,
    path,
    address,
    userInfo: { ownedIds },
  } = useGetNftById(depositNftId)
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
      nftContract.methods
        .getApproved(selected)
        .call()
        .then((res) => {
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
      nftContract.methods
        .approve(getNftConverterAddress(), selected)
        .send({ from: account })
        .then(() => {
          setApproved(true)
          setApproving(false)
        })
        .catch(() => {
          setApproving(false)
        })
    }
  }

  // const handleConvert = async () => {
  //   if (selected && depositButton) {
  //     await handleConvert()
  //   }
  // }

  const approveButton = selected && !approved
  const depositButton = selected && approved

  return (
    <Modal style={{maxWidth: "450px"}} onDismiss={onDismiss} title={`Convert ${symbol}`} headerBackground="black">
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text bold>Select ID of NFT:</Text>
        <Flex alignItems="center" minWidth="70px">
          <Text ml="4px" bold>
            {symbol}
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent="center" style={{ maxHeight: '200px' }}>
        {type === 'image' ? (
          <img src={path} alt="test" style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain' }} />
        ) : (
          <video autoPlay loop className="sc-cxNHIi bjMxQn">
            <source src={path} type="video/webm" />
          </video>
        )}
      </Flex>
      <Text mt="8px" color="textSubtle" fontSize="12px" mb="8px" style={{ width: '100%' }}>
        Balance: {nftBalance.toString()}
        {nftBalance === 0 ? (
          <Text mt="8px" ml="auto" color="tertiary" fontSize="12px" mb="8px">
            Must have {symbol} NFT before you can deposit
          </Text>
        ) : (
          <Text bold>IDS in your wallet:</Text>
        )}
      </Text>
      <OverflowFlex justifyContent="center">
        {ownedIds.map((currentId) => {
          return (
            <div id={currentId.toString()} key={currentId} style={{ padding: '10px' }}>
              {currentId === selected ? <PrimaryStakeButton  style={{width: "70px"}}  onClick={() => setSelected(currentId)}>
                <PrimaryStakeButtonText>
                  {currentId}
                </PrimaryStakeButtonText>
              </PrimaryStakeButton> : <SecondaryStakeButton  style={{width: "70px"}}  onClick={() => setSelected(currentId)}>
                <SecondaryStakeButtonText>
                  {currentId}
                </SecondaryStakeButtonText>
              </SecondaryStakeButton>}
            </div>
          )
        })}
      </OverflowFlex>
      <Flex justifyContent="center">

        {approveButton ? <PrimaryStakeButton onClick={handleApprove} >
          <PrimaryStakeButtonText>
        {approving ? 'Approving...' : `Approve NFT`}
          </PrimaryStakeButtonText>
          </PrimaryStakeButton> : <SecondaryStakeButton disabled>
          <SecondaryStakeButtonText>
            Approve NFT
          </SecondaryStakeButtonText>
        </SecondaryStakeButton>}
        <Text mt="8px" color="textSubtle" fontSize="12px" mb="8px" style={{ width: '10%' }} />
        {selected && approved ? <PrimaryStakeButton onClick={handleConvert} >
          <PrimaryStakeButtonText>
            {converting ? 'Converting...' : `Convert ${symbol}`}
          </PrimaryStakeButtonText>
        </PrimaryStakeButton> : <SecondaryStakeButton onClick={handleConvert} disabled={!depositButton}>
          <SecondaryStakeButtonText>
            Convert {symbol}
          </SecondaryStakeButtonText>
        </SecondaryStakeButton>}
      </Flex>
    </Modal>
  )
}

export default ConvertNftModal
