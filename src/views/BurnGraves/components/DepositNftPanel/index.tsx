import React from 'react'
import { useModal } from '@rug-zombie-libs/uikit'
import { account, burnGraveById, nftById } from '../../../../redux/get'
import DepositNftModal from '../DepositNftModal'

export interface DepositNftPanelProps {
  id: number,
  updateResult: any
}

const DepositNftPanel:React.FC<DepositNftPanelProps> = ({ id, updateResult }) => {
  const grave = burnGraveById(id)
  const nft = nftById(grave.depositNftId)
  const wallet = account()

  const [handleDeposit] = useModal(
    <DepositNftModal id={id} updateResult={updateResult} />
  )

  const renderButton = () => {
    if (!wallet) {
      return (<span className="total-earned text-shadow">CONNECT WALLET</span>);
    }

    if (!grave.userInfo.hasDeposited) {
      return (<button onClick={handleDeposit} className="btn w-100" type="button">DEPOSIT</button>);
    }

    return(<button className="btn btn-disabled w-100" type="button">DEPOSITED</button>);
  }
  
  return (
    <div className='frank-card'>
      <div className='small-text'>
                <span className='white-color'>
                    DEPOSIT 1 {nft.symbol} NFT
                </span>
      </div>
      <div className='space-between'>
        {renderButton()}
      </div>
    </div>
  )
}

export default DepositNftPanel;