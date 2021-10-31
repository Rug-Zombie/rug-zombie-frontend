import { useMemo } from 'react';
import Web3 from 'web3';
import web3NoAccount from 'utils/web3';
import { AbiItem } from 'web3-utils';
import useWeb3 from 'hooks/useWeb3';
import sharkpoolAbi from 'config/abi/autosharkPool.json';

const getContract = (abi: any, address: string, web3?: Web3) => {
    const _web3 = web3 ?? web3NoAccount
    return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}

const getSharkpoolContract = (web3?: Web3) => {
    return getContract(sharkpoolAbi, sharksetup.pool, web3);
}

export const useSharkpool = () => {
    const web3 = useWeb3();
    return useMemo(() => getSharkpoolContract(web3), [web3]);
}

export interface SharkPoolSetup {
    jaws: string,
    cjaws: string,
    pool: string,
    jawsGeckoId: string,
    nftid: number,
    mintTime: string,
    endBlock: number
}

const sharksetup: SharkPoolSetup = {
    jaws: '0x4CF10Da353aB835457FD9C27AeEf53C52f2bA18B',
    cjaws: '0x9B63E178220aBb951acdf27b1ea1B88A749104b8',
    pool: '0xF6e7087Da69E8612467A04B9929f1a4A8c73FCc8',
    jawsGeckoId: 'autoshark',
    nftid: 52,
    mintTime: '7 Days',
    endBlock: 15691899
}

export default sharksetup;