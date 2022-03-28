import React, { useState } from 'react'
import { Modal } from '@rug-zombie-libs/uikit'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { isAddress } from 'ethers/lib/utils'
import { Nft } from '../../../state/types'
import { useERC721 } from '../../../hooks/useContract'
import { getAddress } from '../../../utils/addressHelpers'
import useToast from '../../../hooks/useToast'
import { formatAddress } from '../../../utils'

const RecipientInput = styled.input`
  width: 100%;
  height: 60px;
  background: #0d1417 0% 0% no-repeat padding-box;
  border-radius: 10px;
  padding-left: 20px;
  border: none;
  text-align: left;
  font: normal normal normal 14px/30px Poppins;
  color: #ffffff;
  margin: 0 2px;
`

const Regular = styled.div`
  padding-left: 10px;
  font: normal normal 300 18px/42px Poppins;
  letter-spacing: 0;
  color: white;
`

const Normal = styled.div`
  padding-left: 10px;
  font: normal normal 300 16px/32px Poppins;
  letter-spacing: 0;
  color: white;
`

const ConfirmButton = styled.button`
  margin: 10px auto 0 auto;
  height: 60px;
  width: 150px;
  background: #b8c00d 0% 0% no-repeat padding-box;
  border-radius: 10px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`

const PrimaryStakeButtonText = styled.div`
  text-align: center;
  font: normal normal normal 16px/25px Poppins;
  color: #010202;
`

const SecondaryStakeButton = styled.button`
  margin: 10px auto 0 auto;
  height: 60px;
  width: 150px;
  border: 2px solid #b8c00d;
  border-radius: 10px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`

const SecondaryStakeButtonText = styled.div`
  text-align: center;
  font: normal normal normal 16px/25px Poppins;
  color: #ffffff;
`
interface TransferNftModalProps {
  onDismiss?: () => void
  nft: Nft
  id
}

const TransferNftModal: React.FC<TransferNftModalProps> = ({ nft, id, onDismiss }) => {
  const { account } = useWeb3React()
  const [recipient, setRecipient] = useState(null)
  const nftContract = useERC721(getAddress(nft.address))
  const { toastGraves } = useToast()
  const transferNft = () => {
    if(isAddress(recipient) && account) {
      nftContract.methods.safeTransferFrom(account, recipient, id).send({from: account})
        .then(() => {
          toastGraves("NFT sent", `1 X ${nft.symbol} sent to ${formatAddress(recipient)}`)
          onDismiss()
        })
    }
  }

  return <Modal title='Transfer NFT' onDismiss={onDismiss}>
    <Regular>
      {nft.symbol} #{id}
    </Regular>
    <Normal>
      Recipient:
    </Normal>
    <RecipientInput
      value={recipient}
      // @ts-ignore
      onInput={(e) => setRecipient(e.target.value)}
      placeholder='Recipient address'
    />

    { isAddress(recipient) || !recipient ?
      <ConfirmButton onClick={transferNft}>
      <PrimaryStakeButtonText>
        Transfer NFT
      </PrimaryStakeButtonText>
    </ConfirmButton> :
    <SecondaryStakeButton>
      <SecondaryStakeButtonText>
        Input valid address
      </SecondaryStakeButtonText>
    </SecondaryStakeButton>}
  </Modal>
}

export default TransferNftModal