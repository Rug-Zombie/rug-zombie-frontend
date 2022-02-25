import React from 'react'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { secondsToDays } from '../../utils/timerHelpers'
import CardItem, { CardItemValueType } from './CardItem'

const CLASS_USER_ACTION_NEEDED = 'nft-timer-mint-depends-on-user-action'

enum MintingStatus {
  NotApplicable = 'N/A',
  TimerCountingDown = '',
  CanStart = 'Start Minting',
  InProgress = 'Minting in progress',
  CanFinish = 'Finish Minting',
  Ready = 'NFT Ready',
}

const HIGHLIGHTED_MINTING_STATUSES: Set<MintingStatus> = new Set([
  MintingStatus.CanStart,
  MintingStatus.InProgress,
  MintingStatus.CanFinish,
  MintingStatus.Ready,
])
const USER_ACTION_MINTING_STATUSES: Set<MintingStatus> = new Set([
  MintingStatus.CanStart,
  MintingStatus.CanFinish,
  MintingStatus.Ready,
])

enum TimeRemainingTier {
  AtLeast14Days = '',
  LessThan14Days = 'less-than-14-days',
  LessThan7Days = 'less-than-7-days',
  LessThan3Days = 'less-than-3-days',
  LessThan1Day = 'less-than-1-day',
}

interface Props {
  mintDate: BigNumber
  amountStaked: BigNumber
  mintingReady?: boolean
  isMinting?: boolean
  secondsUntilMintable?: number
}

const getTombMintingStatus = (
  mintDate: BigNumber,
  mintingReady: boolean,
  isMinting: boolean,
  account: string,
): MintingStatus => {
  if (mintDate.eq(ethers.constants.MaxUint256._hex) || !account) {
    return MintingStatus.NotApplicable
  }

  if (mintDate.isZero()) {
    return mintingReady ? MintingStatus.CanFinish : MintingStatus.CanStart
  }

  if (isMinting) {
    return mintingReady ? MintingStatus.Ready : MintingStatus.InProgress
  }

  return MintingStatus.TimerCountingDown
}

const getMintingStatus = (
  amountStaked: BigNumber,
  mintDate: BigNumber,
  secondsUntilMintable: number,
  account: string,
  mintingReady?: boolean,
  isMinting?: boolean,
): MintingStatus => {
  if (mintingReady !== undefined || isMinting !== undefined) {
    return getTombMintingStatus(mintDate, mintingReady, isMinting, account)
  }

  if (amountStaked.isZero()) {
    return MintingStatus.NotApplicable
  }

  return secondsUntilMintable <= 0 ? MintingStatus.Ready : MintingStatus.TimerCountingDown
}

const getTier = (secondsUntilMintable: number): TimeRemainingTier => {
  const daysRemaining = secondsToDays(secondsUntilMintable)
  if (!daysRemaining) {
    return TimeRemainingTier.LessThan1Day
  }
  if (daysRemaining < 3) {
    return TimeRemainingTier.LessThan3Days
  }
  if (daysRemaining < 7) {
    return TimeRemainingTier.LessThan7Days
  }
  if (daysRemaining < 14) {
    return TimeRemainingTier.LessThan14Days
  }

  return TimeRemainingTier.AtLeast14Days
}

const NftTimerCardItem: React.FC<Props> = ({
  mintDate,
  amountStaked,
  mintingReady,
  isMinting,
  secondsUntilMintable = mintDate.toNumber() - Math.floor(Date.now() / 1000),
}) => {
  const { account } = useWeb3React()
  const status = getMintingStatus(amountStaked, mintDate, secondsUntilMintable, account, mintingReady, isMinting)
  if (status !== MintingStatus.TimerCountingDown) {
    return (
      <CardItem
        highlightable
        isHighlighted={() => HIGHLIGHTED_MINTING_STATUSES.has(status)}
        additionalHighlightClassNames={USER_ACTION_MINTING_STATUSES.has(status) ? [CLASS_USER_ACTION_NEEDED] : []}
        label="NFT Timer"
        value={status.valueOf()}
      />
    )
  }

  const tier = getTier(secondsUntilMintable)
  const tierClassNames = tier.valueOf() ? [`nft-timer-${tier.valueOf()}`] : []
  return (
    <CardItem
      highlightable
      isHighlighted={(value) => value && value > 0 && tier !== TimeRemainingTier.AtLeast14Days}
      label="NFT Timer"
      value={secondsUntilMintable}
      valueType={CardItemValueType.Duration}
      additionalHighlightClassNames={tierClassNames}
    />
  )
}

export default NftTimerCardItem
