import { useMemo } from 'react';
import Web3 from 'web3';
import web3NoAccount from 'utils/web3';
import { AbiItem } from 'web3-utils';
import useWeb3 from 'hooks/useWeb3';
import sharkpoolAbi from 'config/abi/autosharkPool.json';
import { Token } from 'config/constants/types';
import tokens from 'config/constants/tokens';

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
    depositToken: Token,
    stakeToken: Token,    
    pool: string,    
    nftid: number,
    geckoId: string,
    mintTime: string,
    isNew: boolean
}

const sharkpools: SharkPoolSetup[] = [
    {
        id: 0,
        name: 'AutoShark Flash Loan Pool',
        depositToken: tokens.cjaws,
        stakeToken: tokens.jaws,
        pool: '0x1cfB376e57ae798F325EC6156Be7c29D25F31088',
        geckoId: 'autoshark',
        nftid: 52,
        mintTime: '7 Days',
        isNew: true
    }
]

export default sharkpools;