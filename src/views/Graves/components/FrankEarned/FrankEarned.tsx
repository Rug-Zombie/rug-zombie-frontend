import React from 'react'
import BigNumber from 'bignumber.js';
import { getFullDisplayBalance } from 'utils/formatBalance'
import tokens from 'config/constants/tokens';
import { useDrFrankenstein } from 'hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { grave } from '../../../../redux/get'
import { BIG_ZERO } from '../../../../utils/bigNumber'

interface FrankEarnedProps {
  pid: number
}

const FrankEarned: React.FC<FrankEarnedProps> = ({ pid }) => {
  const { userInfo: { pendingZombie, amount } } = grave(pid)
  const drFrankenstein = useDrFrankenstein();
  const { account } = useWeb3React();

  const { toastSuccess } = useToast()
  const { t } = useTranslation()
  
  const handleHarvest = () => {
    if (pid === 0) {
      drFrankenstein.methods.leaveStaking(0)
      .send({from: account}).then(() => {
        toastSuccess(t('Claimed ZMBE'))
      });
    } else {
      drFrankenstein.methods.withdraw(pid, 0)
      .send({from: account}).then(() => {
        toastSuccess(t('Claimed ZMBE'))
      });
    }
  }

  return (
    <div className="frank-card">
      <div className="small-text">
        <span className="green-color">Zombie </span>
        <span className="white-color">EARNED</span>
      </div>
      <div className="space-between">
        <div className="frank-earned">
          <span className="text-shadow">{getFullDisplayBalance(new BigNumber(pendingZombie), tokens.zmbe.decimals, 4)}</span>
        </div>
        <button disabled={amount.isZero()} onClick={handleHarvest} className={`btn w-auto harvest ${amount.isZero() ? 'btn-disabled':''}`} type="button">Harvest</button>
      </div>
    </div>
  )
}

export default FrankEarned