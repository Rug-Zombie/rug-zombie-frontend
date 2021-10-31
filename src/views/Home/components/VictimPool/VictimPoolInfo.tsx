import React, { useEffect, useState } from 'react'
import { Flex, Heading } from '@rug-zombie-libs/uikit'
import { useZTokenSwapper, useERC20 } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { multicallv2 } from 'utils/multicall'
import { getFullDisplayBalance } from 'utils/formatBalance'
import ztokenSwapperAbi from 'config/abi/ztokenSwapper.json'
import { getAddress, getZTokenSwapperAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { registerToken } from 'utils/wallet'
import tokens from '../../../../config/constants/tokens'
import { Token } from '../../../../config/constants/types'

export interface VictimPoolData {
  id: string,
  name: string,
  rug: Token,
  ztoken: Token,
  zsymbol: string,
  rugBalance: BigNumber,
  zTokenBalance: BigNumber,
  claimedZToken: boolean,
  isEnabled: boolean,
  amountPerClaim: BigNumber
}

const pools: VictimPoolData[] = [
  {
    id: 'BLACK',
    name: 'Black Diamond',
    rug: tokens.diamonds,
    ztoken: tokens.zdiamonds,
    zsymbol: 'ZDIAMONDS',
    rugBalance: BIG_ZERO,
    zTokenBalance: BIG_ZERO,
    claimedZToken: false,
    isEnabled: false,
    amountPerClaim: BIG_ZERO,
  },
]

interface VictimPoolsInfoProps {
  id: string
}

const VictimPoolsInfo: React.FC<VictimPoolsInfoProps> = ({ id }) => {
  const swapper = useZTokenSwapper()
  const address = getZTokenSwapperAddress()
  const { account } = useWeb3React()
  const [pool, setPool] = useState(pools.find(a => a.id === id))
  const rug = useERC20(getAddress(pool.rug.address))
  const ztoken = useERC20(getAddress(pool.ztoken.address))
  const isMetaMaskInScope = !!window.ethereum?.isMetaMask

  const handleSwap = () => {
    swapper.methods.getZToken(getAddress(pool.rug.address)).send({ from: account })
      .then(() => {
        setPool({ claimedZToken: true, ...pool })
      })
  }

  useEffect(() => {
    if (account) {
      rug.methods.balanceOf(account).call()
        .then((rugBalanceRes) => {
          ztoken.methods.balanceOf(address).call()
            .then((ztokenBalanceRes) => {
              swapper.methods.checkUserSwapped(getAddress(pool.rug.address), account)
                .call().then(userSwapped => {
                const calls = [
                  { address, name: 'swapInfo', params: [getAddress(pool.rug.address)] },
                  { address, name: 'checkUserSwapped', params: [getAddress(pool.rug.address), account] },
                ]
                multicallv2(ztokenSwapperAbi, calls)
                  .then((res) => {
                    setPool({
                      ...pool,
                      isEnabled: res[0].isEnabled,
                      amountPerClaim: new BigNumber(res[0].zTokenAmount.toString()),
                      rugBalance: new BigNumber(rugBalanceRes.toString()),
                      zTokenBalance: new BigNumber(ztokenBalanceRes.toString()),
                      claimedZToken: userSwapped
                    })
                  })
              })

            })
        })
    }
  }, [account, address, pool, rug.methods, swapper.methods, ztoken.methods])


  return (
    <div>
      <Heading>{pool.name}</Heading>

      <Heading>Rugged Tokens: {getFullDisplayBalance(pool.rugBalance, pool.rug.decimals, 4)}</Heading>
      <Heading>zTokens Remaining: {pool.zTokenBalance.toString()}</Heading>
      <Heading>{pool.claimedZToken ? `You already claimed ${pool.ztoken.symbol}` : `You have not claimed ${pool.ztoken.symbol}`}</Heading>
      <br />
      <Flex justifyContent='space-between'>
        <button className='btn w-auto harvest' disabled={pool.rugBalance.isZero() || pool.claimedZToken || pool.zTokenBalance.isZero()} type='button' onClick={handleSwap}>Claim zTokens</button>
        {account && isMetaMaskInScope && (
          <button
            className='btn w-auto harvest' type='button'
            onClick={() => registerToken(getAddress(pool.ztoken.address), (pool.zsymbol), pool.ztoken.decimals, 'https://bscscan.com/token/images/rugzombie_32.png')}
          >Add To MetaMask</button>
        )}
      </Flex>
    </div>
  )
}

export default VictimPoolsInfo