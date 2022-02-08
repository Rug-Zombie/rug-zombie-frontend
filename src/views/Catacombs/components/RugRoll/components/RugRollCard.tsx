import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  Card,
  CardFooter, CardHeader,
  Flex, Text, CardBody,
} from '@catacombs-libs/uikit'
import { BigNumber } from 'bignumber.js'
import ruggedTokens from 'config/constants/ruggedTokens'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { ethers } from 'ethers'
import { BIG_TEN, BIG_ZERO } from '../../../../../utils/bigNumber'

import { useRugRollContract, useZombie } from '../../../../../hooks/useContract'
import { account, zombieBalance } from '../../../../../redux/get'
import { AUTOSHARK_EXCHANGE_URL } from '../../../../../config'
import { getAddress, getRugRollAddress, getZombieAddress } from '../../../../../utils/addressHelpers'
import UnlockButton from '../../../../../components/UnlockButton'
import addresses from '../../../../../config/constants/contracts'
import '../RugRoll.Styles.css'
import tokens from '../../../../../config/constants/tokens'
import { getBep20Contract } from '../../../../../utils/contractHelpers'
import useWeb3 from '../../../../../hooks/useWeb3'
import useToast from '../../../../../hooks/useToast'
import { tokenByAddress } from '../../../../../utils/tokenHelper'
import { ToastDescriptionWithTx } from '../../../../../components/Toast'


const StyledButton = styled(Button)`
  border: 2px solid white;
  color: white;
  width: 100%;
  margin-top: 24px;
  margin-right: 5px;
  margin-left: 5px;
`

interface ViewCardProps {
  onDismiss?: () => void,
}

const RugRollCard: React.FC<ViewCardProps> = () => {
  const web3 = useWeb3()
  const { toastDefault } = useToast()
  const [burnAmount, setBurnAmount] = useState(BIG_ZERO)
  const rugRollContract = useRugRollContract()
  const zombie = useZombie()
  const [zombieApproval, setZombieApproval] = useState(BIG_ZERO)
  const [ruggedToken, setRuggedToken] = useState(ruggedTokens[0])
  const [rugApproved, setRugApproved] = useState(false)
  const [rugBalance, setRugBalance] = useState(BIG_ZERO)

  const [rugApprovalPending, setRugApprovalPending] = useState(false)
  const [zombieApprovalPending, setZombieApprovalPending] = useState(false)
  const [rugRollPending, setRugRollPending] = useState(false)
  const wallet = account()
  const selectedRug = tokens[ruggedToken]

  const handleApproveZombie = () => {
    if (account()) {
      setZombieApprovalPending(true)
      zombie.methods.approve(getAddress(addresses.rugRoll), ethers.constants.MaxUint256)
        .send({ from: account() })
        .then(() => {
          setZombieApprovalPending(false)
          setZombieApproval(BIG_TEN)
          toastDefault('ZMBE Approved')
        })
        .catch(() => {
          setZombieApprovalPending(false)
        })
    }
  }

  useEffect(() => {
    if (wallet) {
      zombie.methods.allowance(account(), getRugRollAddress())
        .call().then(res => {
        setZombieApproval(new BigNumber(res.toString()))
      })
    }
  }, [burnAmount, wallet, zombie.methods, ruggedToken])

  useEffect(() => {
    rugRollContract.methods.getAmount().call()
      .then(
        res => {
          setBurnAmount(new BigNumber(res))
        })
  }, [rugRollContract.methods])

  useEffect(() => {
    if (wallet) {
      getBep20Contract(getAddress(selectedRug.address)).methods.allowance(wallet, getRugRollAddress())
        .call().then(res => {
        if (new BigNumber(res.toString()).gt(0)) {
          setRugApproved(true)
        }
      })
    }
  }, [selectedRug.address, wallet])

  useEffect(() => {
    if (wallet) {
      getBep20Contract(getAddress(selectedRug.address)).methods.balanceOf(wallet)
        .call().then(res => {
        setRugBalance(new BigNumber(res.toString()))
      })
    }
  }, [selectedRug.address, wallet])

  const selectRuggedToken = (event) => {
    setRuggedToken(event.target.value)
    setRugApproved(false)
    setRugBalance(BIG_ZERO)
  }


  function ApproveRuggedToken() {
    setRugApprovalPending(true)
    getBep20Contract(getAddress(tokens[ruggedToken].address), web3).methods.approve(getRugRollAddress(), ethers.constants.MaxUint256)
      .send({ from: account() }).then(() => {
      setRugApprovalPending(false)
      setRugApproved(true)
      toastDefault(`${selectedRug.symbol} Approved`)
    })
      .catch(() => {
        setRugApprovalPending(false)
      })
  }

  const rugRoll = () => {
    setRugRollPending(true)
    rugRollContract.methods.rugRoll(getAddress(selectedRug.address))
      .send({ from: account() })
      .then(tx => {
        setRugRollPending(false)
        const receivedToken = tokenByAddress(tx.events.Swapped.returnValues._returnedRug)
        if (receivedToken) {
          toastDefault(`Received ${receivedToken.symbol}`,<ToastDescriptionWithTx txHash={tx.transactionHash} />)
        } else {
          toastDefault(`Received token`,<ToastDescriptionWithTx txHash={tx.transactionHash} />)

        }
      })
      .catch(() => {
        setRugRollPending(false)
      })
  }

  // @ts-ignore
  return (
    <div>
      <Card className='card-active'>
        <CardHeader style={{ background: 'black', padding: '15px' }}>
          <Flex justifyContent='center' paddingTop='3%' style={{ color: 'white!important', fontSize: '25px' }}>
            Welcome to RugRoll...!!!
          </Flex>
        </CardHeader>
        <CardBody style={{ padding: '18px 30px' }}>
          <Flex justifyContent='center'
                style={{ color: 'white!important', lineHeight: 'normal', fontSize: '18px' }}>
            Burn {getFullDisplayBalance(burnAmount, 18, 0)} ZMBE (~$1) and deposit a rugged token to get another random
            rugged
            token.
          </Flex>
        </CardBody>
        <CardFooter>
          <Text pb='10px'>Select rugged token : </Text>
          <select onChange={selectRuggedToken} className='SelectRuggedToken'>
            {
              ruggedTokens.map(rugSymbol => {
                const rug = tokens[rugSymbol]
                return (
                  <option value={rugSymbol}>
                    {rug.symbol}
                  </option>
                )
              })
            }
          </select>
          {
            // eslint-disable-next-line no-nested-ternary
            account() ? zombieBalance().lt(burnAmount) ?
              <Button mt='24px' as='a'
                      href={`${AUTOSHARK_EXCHANGE_URL}/swap?outputCurrency=${getZombieAddress()}`}
                      variant='secondary' style={{ border: '2px solid white', width: '100%' }}>
                <Text color='white'>Get ZMBE</Text>
              </Button> : zombieApproval.isZero() ?
                <Button mt='24px' mr='5px'
                        onClick={handleApproveZombie}
                        as='a' variant='secondary'
                        style={{ border: '2px solid white', width: '100%' }}>
                  <Text color='white'> {zombieApprovalPending ? 'Approving...' : 'Approve ZMBE'}</Text>
                </Button> : null :
              <UnlockButton />
          }
          <Flex>
            {/* eslint-disable-next-line no-nested-ternary */}
            {rugBalance.lt(BIG_TEN.pow(selectedRug.decimals)) ? <StyledButton variant='secondary'>
              Insufficient {tokens[ruggedToken].symbol}
            </StyledButton> : !rugApproved ? <StyledButton variant='secondary' onClick={ApproveRuggedToken}>
              {rugApprovalPending ? 'Approving...' : `Approve ${tokens[ruggedToken].symbol}`}
            </StyledButton> : null
            }
            <StyledButton variant='secondary'
                          disabled={!rugApproved || rugBalance.lt(BIG_TEN.pow(selectedRug.decimals)) || zombieBalance().lt(burnAmount)}
                          onClick={rugRoll}>
              {rugRollPending ? 'Pending...' : 'RUG ROLL'}
            </StyledButton>
          </Flex>

        </CardFooter>
      </Card>
    </div>
  )
}

export default RugRollCard
