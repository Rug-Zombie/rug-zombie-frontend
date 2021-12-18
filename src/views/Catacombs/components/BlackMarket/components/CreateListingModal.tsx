import React, {useState} from 'react';
import {Modal} from '@catacombs-libs/uikit';
import ruggedTokens from "../../../../../config/constants/ruggedTokens";
import tokens from "../../../../../config/constants/tokens";
import {BIG_ZERO} from "../../../../../utils/bigNumber";

interface ModalProps {
    onDismiss?: () => void
}

const CreateListingModal: React.FC<ModalProps> = ({onDismiss}) => {

    const [createButtonDisabled, setCreateButtonDisabled] = useState(true)
    const [ruggedToken, setRuggedToken] = useState(ruggedTokens[0])
    const [rugApproved, setRugApproved] = useState(false)
    const [rugBalance, setRugBalance] = useState(BIG_ZERO)

    const selectRuggedToken = (event) => {
        setRuggedToken(event.target.value)
        setRugApproved(false)
        setRugBalance(BIG_ZERO)
    }

    const handleCreate = () => {
        console.log('handle create')
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
            <input className="barracks-deposit-input" type="number" placeholder="Enter amount here." />
            <button type="button" className="barracks-deposit-button" onClick={handleCreate} disabled={createButtonDisabled}>
                Create Listing
            </button>
        </Modal>
    );
}

export default CreateListingModal;