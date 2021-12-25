import React, { useState } from 'react'
import { Button, AutoRenewIcon, Skeleton } from '@rug-zombie-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import Web3 from 'web3'
import { GraveConfig } from '../../../../../config/constants/types'

interface ApprovalActionProps {
  grave: GraveConfig
  account: string
  setLastUpdated: () => void
  isLoading?: boolean
  web3: Web3
}

const RuggedTokenApprovalAction: React.FC<ApprovalActionProps> = ({ grave, isLoading = false }) => {
  const { t } = useTranslation()
  const [requestedApproval, ] = useState(false)

  const handleApprove = () => {
    // ruggedTokenContract.methods
    //   .approve(getRestorationChefAddress(), ethers.constants.MaxUint256)
    //   .send({ from: account })
    //   .on('sending', () => {
    //     setRequestedApproval(true)
    //   })
    //   .on('receipt', () => {
    //     toastSuccess(
    //       `${t('Contract Enabled')}`,
    //       `${t(`You can now stake in the %symbol %vault!`, { symbol: grave.ruggedToken.symbol })}`,
    //     )
    //     setLastUpdated()
    //     setRequestedApproval(false)
    //   })
    //   .on('error', (error) => {
    //     console.error(error)
    //     toastError(
    //       `${t('Error')}`,
    //       `${t(`Please try again. Confirm the transaction and make sure you are paying enough gas!`)}`,
    //     )
    //     setRequestedApproval(false)
    //   })
  }

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <Button
          isLoading={requestedApproval}
          endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
          disabled={requestedApproval}
          onClick={handleApprove}
          width="100%"
        >
          {`Approve `}
        </Button>
      )}
    </>
  )
}

export default RuggedTokenApprovalAction
