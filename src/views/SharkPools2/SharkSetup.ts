import { useMemo } from 'react';
import Web3 from 'web3';
import web3NoAccount from 'utils/web3';
import { AbiItem } from 'web3-utils';
import useWeb3 from 'hooks/useWeb3';
import sharkpoolAbi from 'config/abi/autosharkPool.json';
import { Token } from 'config/constants/types';
import tokens from 'config/constants/tokens';
import BigNumber from 'bignumber.js';
import { BIG_ZERO } from 'utils/bigNumber'

const getContract = (abi: any, address: string, web3?: Web3) => {
    const _web3 = web3 ?? web3NoAccount
    return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}

const getSharkpoolContract = (address: string, web3?: Web3) => {
    return getContract(sharkpoolAbi, address, web3);
}

export const useSharkpool = (address: string) => {
    const web3 = useWeb3();
    return useMemo(() => getSharkpoolContract(address, web3), [address, web3]);
}

export interface SharkPoolSetup {
    id: number,
    name: string,
    isNew: boolean,
    depositToken: Token,
    stakeToken: Token,    
    address: string,    
    nftid: number,
    geckoId: string,
    mintTime: string,
    minStake: BigNumber,
    maxStake: BigNumber,
    unlockFee: number,
    stakeTax: number,
    requiresDeposit: boolean,

    totalStaked: BigNumber,
    usdPrice: number,

    stakedAmount: BigNumber,
    paidUnlock: boolean,
    paidDeposit: boolean,
    nftTimer: number,
    approvedDeposit: boolean,
    approvedStake: boolean
}

const sharkpools: SharkPoolSetup[] = [
    {
        id: 0,
        name: 'AutoShark Flash Loan Pool',
        isNew: true,
        depositToken: tokens.cjaws,
        stakeToken: tokens.jaws,
        address: '0x1cfB376e57ae798F325EC6156Be7c29D25F31088',
        geckoId: 'autoshark',
        nftid: 52,
        mintTime: '7 Days',        
        minStake: BIG_ZERO,
        maxStake: BIG_ZERO,
        unlockFee: 0,
        stakeTax: 0,
        requiresDeposit: true,
        stakedAmount: BIG_ZERO,
        paidUnlock: false,
        paidDeposit: false,
        nftTimer: 0,
        totalStaked: BIG_ZERO,
        usdPrice: 0,
        approvedDeposit: false,
        approvedStake: false
    }
]

export default sharkpools;