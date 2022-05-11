import React, { useCallback, useEffect, useState } from 'react'
import { Flex, Modal, Text } from '@rug-zombie-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { useERC721, useWhalePoolContract } from '../../../../../../../../hooks/useContract'
import { getAddress, getWhalePoolAddress, getZombieAddress } from '../../../../../../../../utils/addressHelpers'
import { getNftConfigById, useGetNftById } from "../../../../../../../../state/nfts/hooks";
import useToast from "../../../../../../../../hooks/useToast";
import { fetchWhalePoolUserDataAsync } from "../../../../../../../../state/whalePools";
import { useAppDispatch } from "../../../../../../../../state";
import { useStake } from "../../../../../../../../hooks/useWhalePool";
import { BASE_EXCHANGE_URL } from "../../../../../../../../config";
import { getFullDisplayBalance } from "../../../../../../../../utils/formatBalance";
import { formatDuration, now } from "../../../../../../../../utils/timerHelpers";

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

interface DepositNftModalProps {
  nftId: number
  onDismiss?: () => void
}

const WHALE_PASS_ID = 39

const DepositNftModal: React.FC<DepositNftModalProps> = ({ nftId, onDismiss }) => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const whalePoolContract = useWhalePoolContract()
  const {
    symbol,
    type,
    path,
    address,
  } = getNftConfigById(nftId)
  const nftContract = useERC721(getAddress(address))
  const [selected, setSelected] = useState(null)
  const [approved, setApproved] = useState(false)
  const [approving, setApproving] = useState(false)
  const [depositing, setDepositing] = useState(false)
  const { onStake } = useStake(whalePoolContract, selected)
  const { toastError } = useToast()
  const { userInfo: { ownedIds } } = useGetNftById(WHALE_PASS_ID)
  const balance = ownedIds.length

  useEffect(() => {
    if(selected && account) {
      nftContract.methods
        .getApproved(selected)
        .call()
        .then((res) => {
          if(res === getWhalePoolAddress()) { // the selected id is already approved, so, dismissing the modal
            setApproved(true)
          } else {
            setApproved(false)
          }
        })
    }
  }, [selected, nftContract.methods, account, onDismiss])

  const onDepositNft = () => {
    if(approved && selected) {
      setDepositing(true)
      onStake()
        .then((succeeded) => {
          if (succeeded) {
            toastError('Whale pass staked', 'We appreciate the support, stay tuned for more zombie whale perks ;)')
          }
          setDepositing(false)
          onDismiss()

        })
        .catch(() => {
          setDepositing(false)
        })
    }
  }

  const handleApprove = () => {
    if(account && !approved) {
      setApproving(true)
      nftContract.methods
        .approve(getWhalePoolAddress(), selected)
        .send({ from: account })
        .then(() => {
          setApproved(true)
          setApproving(false)
          toastError('Approved Whale Pass', 'You can now stake your pass')
        })
        .catch(() => {
          setApproving(false)
        })
    }
  }

  const approveButton = selected && !approved

  const onDismissModal = () => {
    onDismiss()
  }

  return (
    <Modal style={{ maxWidth: "450px" }} onDismiss={onDismissModal} title={`Deposit ${symbol}`}
           headerBackground="black">
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
          <img src={path} alt="test" style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain' }}/>
        ) : (
          <video autoPlay loop className="sc-cxNHIi bjMxQn">
            <source src={path} type="video/webm"/>
          </video>
        )}
      </Flex>
      <Text mt="8px" color="textSubtle" fontSize="12px" mb="8px" style={{ width: '100%' }}>
        Balance: {balance}
        {balance === 0 ? (
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
              {currentId === selected ?
                <PrimaryStakeButton style={{ width: "70px" }} onClick={() => setSelected(currentId)}>
                  <PrimaryStakeButtonText>
                    {currentId}
                  </PrimaryStakeButtonText>
                </PrimaryStakeButton> :
                <SecondaryStakeButton style={{ width: "70px" }} onClick={() => setSelected(currentId)}>
                  <SecondaryStakeButtonText>
                    {currentId}
                  </SecondaryStakeButtonText>
                </SecondaryStakeButton>}
            </div>
          )
        })}
      </OverflowFlex>
      <Flex justifyContent="center">
        {approveButton ? <PrimaryStakeButton onClick={handleApprove}>
          <PrimaryStakeButtonText>
            {approving ? 'Approving...' : `Approve NFT`}
          </PrimaryStakeButtonText>
        </PrimaryStakeButton> : <SecondaryStakeButton onClick={() => toastError('Please select your NFT ID')}>
          <SecondaryStakeButtonText >
            Approve NFT
          </SecondaryStakeButtonText>
        </SecondaryStakeButton>}
        {approved ? <PrimaryStakeButton onClick={onDepositNft}>
          <PrimaryStakeButtonText>
            {depositing ? 'Depositing...' : `Deposit NFT`}
          </PrimaryStakeButtonText>
        </PrimaryStakeButton> : <SecondaryStakeButton onClick={() => toastError('Please select and approve your NFT')}>
          <SecondaryStakeButtonText>
            Deposit NFT
          </SecondaryStakeButtonText>
        </SecondaryStakeButton>}
      </Flex>
    </Modal>
  )
}

export default DepositNftModal
