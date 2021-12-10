import React from 'react'
import { BaseLayout, Button, Flex, useModal } from '@rug-zombie-libs/uikit'
import styled from 'styled-components'
import { formatDuration } from '../../../../utils/timerHelpers'
import { account, burnGraveById } from '../../../../redux/get'
import { getBalanceAmount, getFullDisplayBalance } from '../../../../utils/formatBalance'
import { BIG_ZERO } from '../../../../utils/bigNumber'
import { useDrBurnenstein } from '../../../../hooks/useContract'
import useToast from '../../../../hooks/useToast'
import { useTranslation } from '../../../../contexts/Localization'
import BurnZombieModal from '../BurnZombieModal'

const DisplayFlex = styled(BaseLayout)`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  grid-gap: 0px;
}`

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

  const renderBurnButton = () => {
    if (!wallet) {
      return (<span className="total-earned text-shadow">CONNECT WALLET</span>)
    }

    if (!grave.userInfo.hasDeposited && grave.poolInfo.depositType !== 0) {
      return(<span className="total-earned text-shadow">MUST DEPOSIT</span>)
    }

    if (!grave.userInfo.hasUnlocked) {
      return(<span className="total-earned text-shadow">MUST UNLOCK</span>)
    }

    if (grave.userInfo.stakedAmount.lt(grave.poolInfo.minimumStake)) {
      return(<span className="total-earned text-shadow">MUST STAKE MINIMUM</span>)
    }

    if (grave.userInfo.burnedAmount >= grave.poolInfo.maxBurned) {
      return(
        <DisplayFlex>
          <span className="indetails-title">Burned :<span className="indetails-value">{Math.round(getBalanceAmount(grave.userInfo.burnedAmount).times(100).toNumber()) / 100}</span></span>
          <span className="total-earned text-shadow">MAX BURNED</span>
        </DisplayFlex>
      )
    }

    return <button onClick={handleBurn} className="btn btn-disabled" type="button">BURN ZMBE</button>
  }

  const renderTimer = () => {
    if (grave.userInfo.stakedAmount.eq(BIG_ZERO)) {
      return null;
    }

    if (currentDate >= grave.userInfo.nftMintDate && grave.userInfo.stakedAmount.gte(grave.poolInfo.minimumStake)) {
      return (<Button className='btn w-100' onClick={onMintNft}>MINT NFT</Button>)
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

  const renderBurned = () => {
    if (grave.userInfo.stakedAmount.eq(BIG_ZERO)) {
      return null;
    }


    return (
      <div style={{paddingLeft: "20px"}}>
        <div className="small-text">
          <span className="white-color">BURNED:</span>
        </div>
        <span className="total-earned text-shadow" style={{fontSize: "20px"}}>{getFullDisplayBalance(grave.userInfo.burnedAmount)} ZMBE</span>
      </div>
    )
  }

  return(
    <>
    <div className="frank-card">
        {renderBurnButton()}
    </div>
    <Flex className="frank-card" >
      {renderTimer()}
      {renderBurned()}
    </Flex>
    </>
  )
}

export default BurnPanel;