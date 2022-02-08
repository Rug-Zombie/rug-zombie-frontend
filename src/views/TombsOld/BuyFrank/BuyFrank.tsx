import React, { useState, useEffect } from 'react'
import { Button, useModal } from '@rug-zombie-libs/uikit'
import { useTombOverlay } from 'hooks/useContract'
import BigNumber from 'bignumber.js'
import StartMintingModal from '../StartMintingModal'
import { getAddress } from '../../../utils/addressHelpers'
import { formatDuration } from '../../../utils/timerHelpers'
import { account, tombByPid, tombOverlayByPoolId } from '../../../redux/get'
import { APESWAP_ADD_LIQUIDITY_URL, AUTOSHARK_ADD_LIQUIDITY_URL, BASE_ADD_LIQUIDITY_URL } from '../../../config'
import tokens from '../../../config/constants/tokens'
import { getId } from '../../../utils'
import { DEFAULT_USER_INFO } from '../../../redux/tombOverlays'
import { BIG_ZERO } from '../../../utils/bigNumber'
import { ToastDescriptionWithTx } from '../../../components/Toast'
import useToast from '../../../hooks/useToast'

interface BuyFrankProps {
  pid: number,
  updateOverlay: any,
}

const BuyFrank: React.FC<BuyFrankProps> = ({ pid, updateOverlay }) => {
  const tombOverlay = useTombOverlay()
  const currentDate = Math.floor(Date.now() / 1000)
  const tomb = tombByPid(pid)
  const overlay = tomb.overlayId ? tombOverlayByPoolId(getId(tomb.overlayId)) : undefined
  const [userInfo, setUserInfo] = useState(DEFAULT_USER_INFO)
  const { userInfo: { amount, tokenWithdrawalDate } } = tomb

  const mintingReady = userInfo.randomNumber > 0
  const initialWithdrawCooldownTime = tokenWithdrawalDate - currentDate
  const [nftMintTime, setNftMintTime] = useState(BIG_ZERO)
  const [update, setUpdate] = useState(false)
  // eslint-disable-next-line no-nested-ternary
  const quoteTokenUrl = tomb.quoteToken === tokens.wbnb ? tomb.exchange === 'Apeswap' ? 'ETH' : 'BNB' : getAddress(tomb.quoteToken.address)
  const { toastDefault } = useToast()

  const modal = overlay ? <StartMintingModal
    pid={getId(overlay.pid)}
    updateOverlay={() => {
      updateOverlay()
      setUpdate(!update)
    }
    }
  /> : null

  const [onStartMinting] = useModal(modal)

  const handleFinishMinting = () => {
    tombOverlay.methods.finishMinting(getId(overlay.pid)).send({ from: account() })
      .then(res => {
        updateOverlay()
        setUpdate(!update)
        toastDefault('NFT has been minted!', <ToastDescriptionWithTx txHash={res.transactionHash} />)
      })
  }

  useEffect(() => {
    if (account() && tomb.overlayId) {
      tombOverlay.methods.nftMintTime(getId(tomb.overlayId), account()).call()
        .then(res => {
          setNftMintTime(new BigNumber(res.toString()))
        })
    }
  }, [update, tomb.overlayId, tombOverlay.methods])

  useEffect(() => {
    if (account() && tomb.overlayId) {
      tombOverlay.methods.userInfo(getId(tomb.overlayId), account()).call()
        .then(res => {
          setUserInfo({
            nextNftMintDate: res.nextNftMintDate,
            isMinting: res.isMinting,
            randomNumber: res.randomNumber,
            nftMintTime: res.nftMintTime,
          })
        })
    }
  }, [update, tomb.overlayId, tombOverlay.methods])

  let addLiquidityUrl: string

  if (tomb.exchange === 'Apeswap') {
    addLiquidityUrl = `${APESWAP_ADD_LIQUIDITY_URL}/${quoteTokenUrl}/${getAddress(tomb.token.address)}`
  } else if (tomb.exchange === 'Autoshark') {
    addLiquidityUrl = `${AUTOSHARK_ADD_LIQUIDITY_URL}/${quoteTokenUrl}/${getAddress(tomb.token.address)}`
  } else {
    addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${quoteTokenUrl}/${getAddress(tomb.token.address)}`
  }


  const pairLpDiv = <div className='frank-card'>
    <a href={addLiquidityUrl} target='_blank' rel='noreferrer'>
      <Button className='btn btn-disabled w-100'>Pair LP on {tomb.exchange}</Button>
    </a>
  </div>

  let mintButton
  if (userInfo.isMinting && !mintingReady) {
    mintButton = (<Button className='btn w-100'>Minting In Progress</Button>)
  } else if (mintingReady) {
    mintButton = (<Button className='btn w-100' onClick={handleFinishMinting}>Finish Minting</Button>)
  } else {
    mintButton = (<Button className='btn w-100' onClick={onStartMinting}>Start Minting</Button>)
  }

  let mintTimer
  if (nftMintTime.eq(2 ** 256 - 1)) {
    mintTimer = (<div className='small-text'><span className='white-color'>Not Minting</span></div>)
  } else if (nftMintTime.isZero()) {
    mintTimer = mintButton
  } else {
    mintTimer = (<div>
      <div className='small-text'><span className='white-color'>NFT Timer</span></div>
      <span className='total-earned text-shadow'
            style={{ fontSize: '20px' }}>{formatDuration(nftMintTime.toNumber())}</span></div>)
  }

  let data

  if ((!overlay || nftMintTime.eq(2 ** 256 - 1)) && amount.isZero()) {
    data = pairLpDiv
  } else {
    data = (!amount.isZero() ?
      <div className='frank-card'>
        <div className='space-between'>
          {/* eslint-disable-next-line no-nested-ternary */}
          {overlay ? mintTimer : currentDate >= tokenWithdrawalDate ?
            <span className='total-earned text-shadow'>No Withdraw Fees</span> :
            <div>
              <div className='small-text'>
                <span className='white-color'>5% Withdraw fee is active:</span>
              </div>
              <span className='total-earned text-shadow'>
              {formatDuration(initialWithdrawCooldownTime)}
                </span>
            </div>}
        </div>
      </div> : pairLpDiv)
  }

  return data
}

export default BuyFrank
