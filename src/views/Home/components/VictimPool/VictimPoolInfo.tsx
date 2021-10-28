import React, { useEffect } from 'react';
import { Heading } from '@rug-zombie-libs/uikit';
import { useZTokenSwapper, useERC20 } from 'hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import { multicallv2 } from 'utils/multicall';
import { getFullDisplayBalance } from 'utils/formatBalance'
import ztokenSwapperAbi from 'config/abi/ztokenSwapper.json';
import { getZTokenSwapperAddress } from 'utils/addressHelpers';
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber';
import { registerToken } from 'utils/wallet'

export interface VictimPoolData {
    id: string, 
    name: string, 
    rug: string, 
    ztoken: string,
    zsymbol: string,
    rugBalance: BigNumber,
    zTokenBalance: BigNumber,
    claimedZToken: boolean,
    isEnabled: boolean,
    amountPerClaim: BigNumber
}

const pools: VictimPoolData[] = [
    {   id: 'BLACK', 
        name: 'Black Diamond', 
        rug: '0x5B9c5e68d09124F4AaDB6428844a0451C80567C4', 
        ztoken: '0x8476561f9180A1CCf642B80dF7719dF3dFfb18A0',
        zsymbol: 'BASIC',
        rugBalance: BIG_ZERO,
        zTokenBalance: BIG_ZERO,
        claimedZToken: false,
        isEnabled: false,
        amountPerClaim: BIG_ZERO },
    {   id: 'TEST', 
        name: 'Test', 
        rug: '0x7Bc18FA02D32c61b4723ce4C14cf49A8DC91b7df', 
        ztoken: '0x70C4F73437C90DBBFF247B3bD373703343B67DE0',
        zsymbol: 'BASIC',
        rugBalance: BIG_ZERO,
        zTokenBalance: BIG_ZERO,
        claimedZToken: false,
        isEnabled: false,
        amountPerClaim: BIG_ZERO }
]

interface VictimPoolsInfoProps {
    id: string
}

const VictimPoolsInfo: React.FC<VictimPoolsInfoProps> = ({ id }) => {
    const swapper = useZTokenSwapper();
    const address = getZTokenSwapperAddress();
    const { account } = useWeb3React();
    const pool = pools.find(a => a.id === id);
    const rug = useERC20(pool.rug);
    const ztoken = useERC20(pool.ztoken);
    const isMetaMaskInScope = !!window.ethereum?.isMetaMask

    const handleSwap = () => {
        swapper.methods.getZToken(pool.rug).send({ from: account })
            .then(() => {
                pool.claimedZToken = true;
            })
    }

    useEffect(() => {
        if (account) {
            rug.methods.balanceOf(account).call()
              .then((res) => {
                pool.rugBalance = new BigNumber(res);
              });
            ztoken.methods.balanceOf(address).call()
              .then((res) => {
                pool.zTokenBalance = new BigNumber(res);
              });
            const calls = [
                { address, name: 'swapInfo', params: [ pool.rug ] },
                { address, name: 'checkUserSwapped', params: [ pool.rug, account ] },
            ]
            multicallv2(ztokenSwapperAbi, calls)
                .then((res) => {                
                    pool.isEnabled = res[0].isEnabled;
                    pool.amountPerClaim = new BigNumber(res[0].zTokenAmount);
                    pool.claimedZToken = res[1];
                });
        }
    })

    return (
        <div>
            <Heading>{pool.name}</Heading>
            
            <Heading>Rugged Tokens: {getFullDisplayBalance(pool.rugBalance, 18, 4)}</Heading>
            <Heading>zTokens Remaining: {getFullDisplayBalance(pool.zTokenBalance, 18, 4)}</Heading>
            <Heading>Have zTokens Already: {pool.claimedZToken.toString()}</Heading>
            <Heading>Victim Pool Open: {pool.isEnabled.toString()}</Heading>
            <Heading>zTokens Per Claim: {getFullDisplayBalance(pool.amountPerClaim, 18, 1)}</Heading>
            <br />
            <button className='btn w-auto harvest' type='button' onClick={handleSwap}>Claim zTokens</button>            

            {account && isMetaMaskInScope && (          
                <button
                    className='btn w-auto harvest' type='button'
                    onClick={() => registerToken(pool.ztoken, pool.zsymbol, 18, 'https://bscscan.com/token/images/rugzombie_32.png')}
                >Add To MetaMask</button>
            )}
        </div>
    )
}

export default VictimPoolsInfo;