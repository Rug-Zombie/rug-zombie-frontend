import React, { useEffect, useState } from 'react'
import { Flex, Heading } from '@rug-zombie-libs/uikit'

import { useZTokenSwapper, useERC20 } from 'hooks/useContract'
import { multicallv2 } from 'utils/multicall'
import { getFullDisplayBalance } from 'utils/formatBalance'
import ztokenSwapperAbi from 'config/abi/ztokenSwapper.json'
import { getAddress, getZTokenSwapperAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { registerToken } from 'utils/wallet'
import tokens from '../../../../config/constants/tokens'
import { Token } from '../../../../config/constants/types'
import { getBep20Contract } from '../../../../utils/contractHelpers'
import useWeb3 from '../../../../hooks/useWeb3'
import { account } from '../../../../redux/get'

export interface VictimPoolPoolInfo {
  rugBalance: BigNumber,
  zTokenBalance: BigNumber,
  claimedZToken: boolean,
  isEnabled: boolean,
  amountPerClaim: BigNumber
}

export interface VictimPool {
  id: string,
  name: string,
  rug: Token,
  ztoken: Token,
  zsymbol: string,
  poolInfo: VictimPoolPoolInfo
}

const defaultPoolInfo: VictimPoolPoolInfo = {
  rugBalance: BIG_ZERO,
  zTokenBalance: BIG_ZERO,
  claimedZToken: false,
  isEnabled: false,
  amountPerClaim: BIG_ZERO,
}

const pools: VictimPool[] = [
  {
    id: 'MNEB',
    name: 'Minereum BSC',
    rug: tokens.mneb,
    ztoken: tokens.zmneb,
    zsymbol: 'zMNEB',
    poolInfo: { ...defaultPoolInfo },
  },
  {
    id: 'BLACK',
    name: 'Black Diamond',
    rug: tokens.diamonds,
    ztoken: tokens.zdiamonds,
    zsymbol: 'ZDIAMONDS',
    poolInfo: { ...defaultPoolInfo },
  },
  {
    id: 'BOG',
    name: 'Bogged Finance',
    rug: tokens.bog,
    ztoken: tokens.zbog,
    zsymbol: 'ZBOG',
    poolInfo: { ...defaultPoolInfo },
  },
]

interface VictimPoolsInfoProps {
  id: string
}

const VictimPoolsInfo: React.FC<VictimPoolsInfoProps> = ({ id }) => {
  const web3 = useWeb3()
  const swapper = useZTokenSwapper()
  const address = getZTokenSwapperAddress()
  const { name, ztoken, rug, poolInfo } = pools.find(a => a.id === id)
  const [updatedPoolInfo, setUpdatedPoolInfo] = useState(poolInfo)

  const rugContract = getBep20Contract(getAddress(rug.address), web3)
  const ztokenContract = useERC20(getAddress(ztoken.address))
  const isMetaMaskInScope = !!window.ethereum?.isMetaMask

  const handleSwap = () => {
    swapper.methods.getZToken(getAddress(rug.address)).send({ from: account() })
      .then(() => {

        setUpdatedPoolInfo({ claimedZToken: true, ...updatedPoolInfo })
      })
  }

  useEffect(() => {
    if (account()) {
      rugContract.methods.balanceOf(account()).call()
        .then((rugBalanceRes) => {
          ztokenContract.methods.balanceOf(address).call()
            .then((ztokenBalanceRes) => {
              swapper.methods.checkUserSwapped(getAddress(rug.address), account())
                .call().then(userSwapped => {
                const calls = [
                  { address, name: 'swapInfo', params: [getAddress(rug.address)] },
                  { address, name: 'checkUserSwapped', params: [getAddress(rug.address), account()] },
                ]
                multicallv2(ztokenSwapperAbi, calls)
                  .then((res) => {
                    setUpdatedPoolInfo({
                      isEnabled: res[0].isEnabled,
                      amountPerClaim: new BigNumber(res[0].zTokenAmount.toString()),
                      rugBalance: new BigNumber(rugBalanceRes.toString()),
                      zTokenBalance: new BigNumber(ztokenBalanceRes.toString()),
                      claimedZToken: userSwapped,
                    })
                  })
              })
            })
        })
    }
  // eslint-disable-next-line
  }, [address, rug.address, swapper.methods, ztokenContract.methods])


  return (
    <div>
      <Heading>{name}</Heading>
      <Heading>{rug.symbol} in wallet: {getFullDisplayBalance(updatedPoolInfo.rugBalance, rug.decimals, 4)}</Heading>
      <Heading>zTokens Remaining: {updatedPoolInfo.zTokenBalance.toString()}</Heading>
      <Heading>{updatedPoolInfo.claimedZToken ? `You already claimed ${ztoken.symbol}` : `You have not claimed ${ztoken.symbol}`}</Heading>
      <br />
      <Flex justifyContent='space-between'>
        <button className='btn w-auto harvest'
                disabled={updatedPoolInfo.rugBalance.isZero() || !account() || updatedPoolInfo.zTokenBalance.isZero()}
                type='button'
                onClick={handleSwap}>Claim zTokens
        </button>
        {account() && isMetaMaskInScope && (
          <button
            className='btn w-auto harvest' type='button'
            onClick={() => registerToken(getAddress(ztoken.address), (ztoken.symbol), ztoken.decimals, 'https://bscscan.com/token/images/rugzombie_32.png')}
          >Add To MetaMask</button>
        )}
      </Flex>
    </div>
  )
}

export default VictimPoolsInfo