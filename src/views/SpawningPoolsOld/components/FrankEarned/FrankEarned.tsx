import React from 'react'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useSpawningPool } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { spawningPoolById } from '../../../../redux/get'
import { BIG_ZERO } from '../../../../utils/bigNumber'

interface FrankEarnedProps {
  id: number
}

const FrankEarned: React.FC<FrankEarnedProps> = ({ id }) => {
  const { userInfo: { pendingReward }, rewardToken, color } = spawningPoolById(id)
  const spawningPoolContract = useSpawningPool(id)
  const { account } = useWeb3React()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()

  const handleHarvest = () => {
    spawningPoolContract.methods.withdraw(0)
      .send({ from: account }).then(() => {
      toastSuccess(t(`Claimed ${rewardToken.symbol}`))
    })
  }

  return (
    <div className='frank-card'>
      <div className='small-text'>
        <span style={{color: color || "rgb(204, 246, 108)" }}>{rewardToken.symbol} </span>
        <span className='white-color'>EARNED</span>
      </div>
      <div className='space-between'>
        <div className='frank-earned'>
          <span
            className='text-shadow'>{getFullDisplayBalance(pendingReward.times(0.89), rewardToken.decimals, 4)}</span>
        </div>
        <button disabled={pendingReward.eq(BIG_ZERO)} onClick={handleHarvest}
                className={`btn w-auto harvest ${pendingReward.eq(BIG_ZERO) ? 'btn-disabled' : ''}`}
                type='button'>Harvest
        </button>
      </div>
    </div>
  )
}

export default FrankEarned
