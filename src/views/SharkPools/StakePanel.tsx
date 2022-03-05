import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { useModal, BaseLayout } from '@rug-zombie-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { account, sharkPoolById } from 'redux/get'
import { useERC20, useSharkpool } from 'hooks/useContract'
import { getAddress } from 'utils/addressHelpers'
import { getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import IncreaseStakeModal from './IncreaseStakeModal'
import DecreaseStakeModal from './DecreaseStakeModal'

const DisplayFlex = styled(BaseLayout)`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  grid-gap: 0px;
`

interface StakePanelProps {
  id: number
  updateResult: any
}

const StakePanel: React.FC<StakePanelProps> = ({ id, updateResult }) => {
  const [isApproved, setIsApproved] = useState(false)

  const wallet = account()
  const { toastDefault } = useToast()
  const { t } = useTranslation()
  const pool = sharkPoolById(id)
  const tokenContract = useERC20(getAddress(pool.stakeToken.address))
  const poolContract = useSharkpool(id)

  useEffect(() => {
    if (wallet) {
      tokenContract.methods
        .allowance(wallet, getAddress(pool.address))
        .call()
        .then((res) => {
          if (parseInt(res.toString()) !== 0) {
            setIsApproved(true)
          } else {
            setIsApproved(false)
          }
        })
    }
  }, [pool, tokenContract, wallet])

  const handleUnlock = () => {
    if (wallet) {
      poolContract.methods
        .unlockFeeInBnb()
        .call()
        .then((res) => {
          poolContract.methods
            .unlock()
            .send({ from: wallet, value: res })
            .then(() => {
              toastDefault(t('Pool unlocked'))
              updateResult(id)
            })
        })
    }
  }

  const handleApprove = () => {
    tokenContract.methods
      .approve(getAddress(pool.address), ethers.constants.MaxUint256)
      .send({ from: wallet })
      .then(() => {
        toastDefault(t(`Approved ${pool.stakeToken.symbol}`))
        setIsApproved(true)
      })
  }

  const [handleIncreaseStake] = useModal(<IncreaseStakeModal id={id} updateResult={updateResult} />)

  const [handleDecreaseStake] = useModal(<DecreaseStakeModal id={id} updateResult={updateResult} />)

  const renderButtons = () => {
    if (!wallet) {
      return <span className="total-earned text-shadow">Connect Wallet</span>
    }

    if (!pool.userInfo.paidUnlock) {
      return (
        <button onClick={handleUnlock} className="btn btn-disabled w-100" type="button">
          Unlock Pool
        </button>
      )
    }

    if (!isApproved) {
      return (
        <button onClick={handleApprove} className="btn btn-disabled w-100" type="button">
          Approve {pool.stakeToken.symbol}
        </button>
      )
    }

    return (
      <div>
        <DisplayFlex>
          <span style={{ paddingRight: '50px' }} className="total-earned text-shadow">
            {getFullDisplayBalance(new BigNumber(pool.userInfo.stakedAmount), pool.stakeToken.decimals, 4)}
          </span>
          <button onClick={handleDecreaseStake} style={{ marginRight: '10px' }} className="btn w-100" type="button">
            -
          </button>
          <button onClick={handleIncreaseStake} className="btn w-100" type="button">
            +
          </button>
        </DisplayFlex>
      </div>
    )
  }

  return (
    <div className="frank-card">
      <div className="small-text">
        <span className="white-color">STAKING</span>
      </div>
      <div className="space-between">{renderButtons()}</div>
    </div>
  )
}

export default StakePanel
