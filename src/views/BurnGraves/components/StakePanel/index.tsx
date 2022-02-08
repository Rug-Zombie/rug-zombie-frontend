import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { BaseLayout, useModal } from '@rug-zombie-libs/uikit'
import { account, burnGraveById } from '../../../../redux/get'
import { useDrBurnenstein, useERC20 } from '../../../../hooks/useContract'
import { getAddress, getDrBurnensteinAddress } from '../../../../utils/addressHelpers'
import useToast from '../../../../hooks/useToast'
import { useTranslation } from '../../../../contexts/Localization'
import { getFullDisplayBalance } from '../../../../utils/formatBalance'
import IncreaseStakeModal from '../IncreaseStakeModal'
import DecreaseStakeModal from '../DecreaseStakeModal'

const DisplayFlex = styled(BaseLayout)`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  grid-gap: 0px;
}`

export interface StakePanelProps {
  id: number,
  updateResult: any
}

const StakePanel: React.FC<StakePanelProps> = ({ id, updateResult }) => {
  const [isApproved, setIsApproved] = useState(false)

  const { toastDefault } = useToast()
  const { t } = useTranslation()

  const grave = burnGraveById(id)
  const wallet = account()

  const tokenContract = useERC20(getAddress(grave.stakingToken.address))
  const drBurnenstein = useDrBurnenstein()

  useEffect(() => {
    if (wallet) {
      tokenContract.methods.allowance(wallet, getDrBurnensteinAddress()).call()
        .then(res => {
          if (parseInt(res.toString()) !== 0) {
            setIsApproved(true)
          } else {
            setIsApproved(false)
          }
        })
    }
  }, [tokenContract, wallet, setIsApproved])


  const handleApprove = () => {
    if (wallet) {
      tokenContract.methods.approve(getDrBurnensteinAddress(), ethers.constants.MaxUint256).send({ from: wallet })
        .then(() => {
          toastDefault(t(`Approved ${grave.stakingToken.symbol}`))
          setIsApproved(true)
        })
    }
  }

  const handleUnlock = () => {
    drBurnenstein.methods.priceInBnb(id).call()
      .then(res => {
        drBurnenstein.methods.unlock(id)
          .send({ from: wallet, value: res }).then(() => {

          toastDefault(t('TombTable unlocked'))
          updateResult(id)
        })
      })
  }

  const [handleIncreaseStake] = useModal(
    <IncreaseStakeModal id={id} updateResult={updateResult} />
  )

  const [handleDecreaseStake] = useModal(
    <DecreaseStakeModal id={id} updateResult={updateResult} />
  )

  const renderButtons = () => {
    if (!wallet) {
      return null
    }

    if (grave.poolInfo.depositType !== 0 && !grave.userInfo.hasDeposited) {
      return null
    }

    if (!grave.userInfo.hasUnlocked) {
      return <div className='frank-card'>
        <div className='small-text'>
          <span className='white-color'>STAKING</span>
        </div>
        <button onClick={handleUnlock} className='btn w-100' type='button'>UNLOCK</button>
      </div>
    }

    if (!isApproved) {
      return <div className="frank-card">
        <div className="small-text">
          <span className="white-color">STAKING</span>
        </div>
        <button onClick={handleApprove} className='btn w-100' type='button'>APPROVE</button>
      </div>
    }

    return (
      <div className="frank-card">
        <div className="small-text">
          <span className="white-color">STAKING</span>
        </div>
        <DisplayFlex>
          <span style={{ paddingRight: '50px' }}
                className='total-earned text-shadow'>{getFullDisplayBalance(new BigNumber(grave.userInfo.stakedAmount), grave.stakingToken.decimals, 4)}</span>
          <button onClick={handleDecreaseStake} style={{ marginRight: '10px' }} className='btn w-100' type='button'>-
          </button>
          <button onClick={handleIncreaseStake} disabled={grave.isClosed}
                  className={`btn w-100 ${grave.isClosed ? 'btn-disabled' : ''}`} type='button'>+
          </button>
        </DisplayFlex>
      </div>
    )
  }

return renderButtons()

}

export default StakePanel