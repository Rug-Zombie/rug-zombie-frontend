import React, {useEffect, useState} from 'react';
import {Modal, Text} from '@catacombs-libs/uikit';
import {ethers} from "ethers";
import {BigNumber} from "bignumber.js";
import allowedRuggedTokens from "../../../../../config/constants/rugMarketTokenList";
import tokens from "../../../../../config/constants/tokens";
import {BIG_ZERO} from "../../../../../utils/bigNumber";
import {useRugMarket} from "../../../../../hooks/useContract";
import {account} from "../../../../../redux/get";
import {getDecimalAmount} from "../../../../../utils/formatBalance";
import {getBep20Contract,} from "../../../../../utils/contractHelpers";
import {getAddress, getRugMarketAddress} from "../../../../../utils/addressHelpers";
import useWeb3 from "../../../../../hooks/useWeb3";
import useToast from "../../../../../hooks/useToast";

interface ModalProps {
  onDismiss?: () => void
}

const CreateListingModal: React.FC<ModalProps> = ({onDismiss}) => {

  const web3 = useWeb3()
  const {toastSuccess} = useToast()
  const wallet = account()
  const rugMarketContract = useRugMarket()
  const [quantity, setQuantity] = useState(BIG_ZERO)
  const [price, setPrice] = useState(BIG_ZERO)
  const [createButtonDisabled, setCreateButtonDisabled] = useState(true)
  const [ruggedToken, setRuggedToken] = useState(allowedRuggedTokens[0])
  const [rugApproved, setRugApproved] = useState(false)
  const [approveRuggedTokenText, setApproveRuggedTokenText] = useState('Approve Rugged Token')
  const [createListingButtontext, setCreateListingButtontext] = useState('Approve Rugged Token First')
  const selectedRug = tokens[ruggedToken]
  useEffect(() => {
    checkRugApproved()
  },)

  const checkRugApproved = () => {
    if (wallet) {
      getBep20Contract(getAddress(selectedRug.address)).methods.allowance(wallet, getRugMarketAddress())
        .call().then(res => {
        if (new BigNumber(res.toString()).gt(0)) {
          setRugApproved(true)
          setCreateListingButtontext('Create Listing')
          setCreateButtonDisabled(false)
        } else {
          setRugApproved(false)
          setCreateListingButtontext('Approve Rugged Token First')
          setCreateButtonDisabled(true)
        }
      })
    }
  }

  const selectRuggedToken = (event) => {
    setRuggedToken(event.target.value)
    checkRugApproved()
  }

  const approveRuggedToken = () => {
    setApproveRuggedTokenText('Approving rugged token...')
    getBep20Contract(getAddress(tokens[ruggedToken].address), web3).methods.approve(getRugMarketAddress(), ethers.constants.MaxUint256)
      .send({from: account()}).then(() => {
      setRugApproved(true)
      setApproveRuggedTokenText('Approved')
      toastSuccess(`${selectedRug.symbol} Approved`)
      setCreateListingButtontext('Create Listing')
      setCreateButtonDisabled(false)
    })
      .catch(() => {
        toastSuccess('Something went wrong! Please try again.')
        setApproveRuggedTokenText('Approve Rugged Token')
        setRugApproved(false)
      })
  }

  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(getDecimalAmount(new BigNumber(event.target.value || '0'), 18))
  }

  const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(getDecimalAmount(new BigNumber(event.target.value || '0'), selectedRug.decimals))
  }

  const handleCreate = () => {
    if (quantity.lt(1)) {
      toastSuccess('Quantity should be at least one.')
      return
    }
    if (price.lt(1)) {
      toastSuccess('You sure want to sell your rugged tokens for free?')
      return
    }
    if (wallet) {
      getBep20Contract(getAddress(selectedRug.address)).methods.balanceOf(wallet).call()
        .then(res => {
          const rugBalance = new BigNumber(res.toString())
          if (rugBalance.gte(quantity)) {
            rugMarketContract.methods.add(getAddress(tokens[ruggedToken].address), quantity.toString(), price.toString()).send({'from': wallet})
              .then(() => {
                toastSuccess('Listing Created Successfully')
                onDismiss()
              })
          } else {
            toastSuccess('Not enough balance')
          }
        })
    } else {
      toastSuccess('Wallet not connected')
    }
  }

  return (
    <Modal onDismiss={onDismiss} title='Sell your rugged tokens here'>
      <Text bold color="tertiary" fontSize="14px" mb="10px">
        Select your rugged token
      </Text>
      <select onChange={selectRuggedToken} className='SelectRuggedToken'>
        {
          allowedRuggedTokens.map(rugSymbol => {
            const rug = tokens[rugSymbol]
            return (
              <option value={rugSymbol}>
                {rug.symbol}
              </option>
            )
          })
        }
      </select>
      <Text bold color="tertiary" fontSize="14px" mt="10px">
        Enter the amount of the selected tokens
      </Text>
      <input className="barracks-deposit-input" style={{'margin': '5px'}} type="number"
             placeholder="Enter quantity here." onChange={onQuantityChange}/>
      <button type="button" className="barracks-deposit-button" onClick={approveRuggedToken}
              disabled={rugApproved}>
        {approveRuggedTokenText}
      </button>
      <Text bold color="tertiary" fontSize="14px" mt="10px">
        Enter the price (in ZMBE) for rugged tokens
      </Text>
      <input className="barracks-deposit-input" style={{'margin': '5px'}} type="number"
             placeholder="Enter price here." onChange={onPriceChange}/>
      <button type="button" className="barracks-deposit-button" onClick={handleCreate}
              disabled={createButtonDisabled}>
        {createListingButtontext}
      </button>
    </Modal>
  );
}

export default CreateListingModal;
