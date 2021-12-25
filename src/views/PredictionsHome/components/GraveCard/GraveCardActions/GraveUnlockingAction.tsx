import React, { useState } from 'react'
import { Button, AutoRenewIcon, Skeleton } from '@rug-zombie-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import { GraveConfig } from '../../../../../config/constants/types'

interface ApprovalActionProps {
  grave: GraveConfig
  account: string
  setLastUpdated: () => void
  isLoading?: boolean
}

const UnlockingAction: React.FC<ApprovalActionProps> = ({ isLoading = false }) => {
  const { t } = useTranslation()
  const [graveUnlocked, ] = useState(false)

  const handleUnlock = () => {
    // restorationChef.methods
    //   .unlock(grave.gid)
    //   .send({ from: account })
    //   .on('sending', () => {
    //     setGraveUnlocked(true)
    //   })
    //   .on('receipt', () => {
    //     toastSuccess(
    //       `${t('TombTable Unlocked')}`,
    //       `${t(`You can now stake in the %symbol %vault!`, { symbol: tokens.zmbe.symbol })}`,
    //     )
    //     setLastUpdated()
    //     setGraveUnlocked(false)
    //   })
    //   .on('error', (error) => {
    //     console.error(error)
    //     toastError(
    //       `${t('Error')}`,
    //       `${t(`Please try again. Confirm the transaction and make sure you are paying enough gas!`)}`,
    //     )
    //     setGraveUnlocked(false)
    //   })
  }

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <Button
          isLoading={graveUnlocked}
          endIcon={graveUnlocked ? <AutoRenewIcon spin color="currentColor" /> : null}
          disabled={graveUnlocked}
          onClick={handleUnlock}
          width="100%"
        >
          {t('Unlock TombTable ($10)')}
        </Button>
      )}
    </>
  )
}

export default UnlockingAction
