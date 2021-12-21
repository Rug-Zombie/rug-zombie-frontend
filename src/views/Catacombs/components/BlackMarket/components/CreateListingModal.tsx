import React, {useState} from 'react';
import {Modal, Text} from '@catacombs-libs/uikit';
import {ethers} from "ethers";
import {BigNumber} from "bignumber.js";
import ruggedTokens from "../../../../../config/constants/ruggedTokens";
import tokens from "../../../../../config/constants/tokens";
import {BIG_ZERO} from "../../../../../utils/bigNumber";
import {useRugMarket} from "../../../../../hooks/useContract";
import {account} from "../../../../../redux/get";
import {getDecimalAmount} from "../../../../../utils/formatBalance";
import {getBep20Contract} from "../../../../../utils/contractHelpers";
import {getAddress, getRugMarketAddress} from "../../../../../utils/addressHelpers";
import useWeb3 from "../../../../../hooks/useWeb3";
import useToast from "../../../../../hooks/useToast";

interface ModalProps {
    onDismiss?: () => void
}

const CreateListingModal: React.FC<ModalProps> = ({onDismiss}) => {

    const web3 = useWeb3()
    const { toastSuccess } = useToast()
    const wallet = account()
    const rugMarketContract = useRugMarket()
    const [quantity, setQuantity] = useState(BIG_ZERO)
    const [price, setPrice] = useState(BIG_ZERO)
    const [createButtonDisabled, setCreateButtonDisabled] = useState(true)
    const [ruggedToken, setRuggedToken] = useState(ruggedTokens[0])
    const [rugApproved, setRugApproved] = useState(false)
    const [rugBalance, setRugBalance] = useState(BIG_ZERO)
    const [rugApprovalPending, setRugApprovalPending] = useState(false)
    const selectedRug = tokens[ruggedToken]

    const selectRuggedToken = (event) => {
        setRuggedToken(event.target.value)
        setRugApproved(false)
        setRugBalance(BIG_ZERO)
    }
    function ApproveRuggedToken() {
        setRugApprovalPending(true)
        getBep20Contract(getAddress(tokens[ruggedToken].address), web3).methods.approve(getRugMarketAddress(), ethers.constants.MaxUint256)
            .send({ from: account() }).then(() => {
            setRugApprovalPending(false)
            setRugApproved(true)
            toastSuccess(`${selectedRug.symbol} Approved`)
        })
            .catch(() => {
                setRugApprovalPending(false)
            })
    }

    const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(getDecimalAmount(new BigNumber(event.target.value || '0')))
    }

    const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(getDecimalAmount(new BigNumber(event.target.value || '0')))
    }

    const handleCreate = () => {
        console.log('handle create')
        rugMarketContract.methods.add(ruggedToken, quantity, price).send({'from': wallet})
    }
    return (
        <Modal onDismiss={onDismiss} title='Sell your rugged tokens here'>
            <select onChange={selectRuggedToken} className='SelectRuggedToken'>
                {
                    ruggedTokens.map(rugSymbol => {
                        const rug = tokens[rugSymbol]
                        return (
                            <option value={rugSymbol}>
                                {rug.symbol}
                            </option>
                        )
                    })
                }
            </select>
            <Text mt="8px" ml="auto" bold color="tertiary" fontSize="14px" mb="8px">
                Enter the amount of the selected tokens
            </Text>
            <input className="barracks-deposit-input" type="number" placeholder="Enter quantity here." onChange={onPriceChange}/>
            <button type="button" className="barracks-deposit-button" onClick={handleCreate} disabled={createButtonDisabled}>
                Approve Rugged Token
            </button>
            <Text mt="8px" ml="auto" bold color="tertiary" fontSize="14px" mb="8px">
                Enter the price (in ZMBE) for rugged tokens
            </Text>
            <input className="barracks-deposit-input" type="number" placeholder="Enter price here." onChange={onQuantityChange}/>
            <button type="button" className="barracks-deposit-button" onClick={handleCreate} disabled={createButtonDisabled}>
                Create Listing
            </button>
        </Modal>
    );
}

export default CreateListingModal;