import React from 'react'
import { Button, useModal } from '@rug-zombie-libs/uikit'
import { formatDuration } from '../../../../utils/timerHelpers'
import { account, burnGraveById } from '../../../../redux/get'
import { getBalanceAmount } from '../../../../utils/formatBalance'
import { BIG_ZERO } from '../../../../utils/bigNumber'
import { useDrBurnenstein } from '../../../../hooks/useContract'
import useToast from '../../../../hooks/useToast'
import { useTranslation } from '../../../../contexts/Localization'
import BurnZombieModal from '../BurnZombieModal'

export interface BurnPanelProps {
  id: number,
  updateResult: any
}

const BurnPanel:React.FC<BurnPanelProps> = ({ id, updateResult }) => {
  const wallet = account()
  const grave = burnGraveById(id)
  const drburn = useDrBurnenstein()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()

  const currentDate = Math.floor(Date.now() / 1000)
  let nftMintDateFixed = grave.userInfo.nftMintDate

  if(grave.userInfo.nftMintDate < 0) {
    nftMintDateFixed = currentDate
  }

  const initialNftTime = nftMintDateFixed - currentDate

  const onMintNft = () => {
    drburn.methods.leaveStaking(id, 0).send({ from: wallet })
      .then(() => {
        updateResult(id)
        toastSuccess(t('Minted NFT'))
      })
  }

  const [handleBurn] = useModal(
    <BurnZombieModal id={id} updateResult={updateResult} />
  )

  const renderBurn = () => {
    if (!wallet) {
      return (<span className="total-earned text-shadow">CONNECT WALLET</span>)
    }

    if (!grave.userInfo.hasDeposited && grave.poolInfo.depositType !== 0) {
      return(<span className="total-earned text-shadow">MUST DEPOSIT</span>)
    }

    if (!grave.userInfo.hasUnlocked) {
      return(<span className="total-earned text-shadow">MUST UNLOCK</span>)
    }

    if (grave.userInfo.burnedAmount >= grave.poolInfo.maxBurned) {
      return(
        <>
          <span className="indetails-title">Burned :<span className="indetails-value">{Math.round(getBalanceAmount(grave.userInfo.burnedAmount).times(100).toNumber()) / 100}</span></span>
          <span className="total-earned text-shadow">MAX BURNED</span>
        </>
      )
    }

    return (
      <>
        <span className="indetails-title">Burned :<span className="indetails-value">{Math.round(getBalanceAmount(grave.userInfo.burnedAmount).times(100).toNumber()) / 100}</span></span>
        <button onClick={handleBurn} className="btn btn-disabled w-100" type="button">BURN ZMBE</button>
      </>
    )
  }

  const renderTimer = () => {
    if (grave.userInfo.stakedAmount === BIG_ZERO) {
      return null;
    }

    if (currentDate >= grave.userInfo.nftMintDate) {
      return (<Button className='btn w-100' onClick={onMintNft}>Mint NFT</Button>)
    }

    return (
      <div>
        <div className="small-text">
          <span className="white-color">NFT Timer</span>
        </div>
        <span className="total-earned text-shadow" style={{fontSize: "20px"}}>{formatDuration(initialNftTime)}</span>
      </div>
    )
  }

  return(
    <div>
      <div className="small-text">
        <span className="white-color">BURN ZOMBIE</span>
      </div>
      {renderBurn()}
      {renderTimer()}
    </div>
  )
}

export default BurnPanel;