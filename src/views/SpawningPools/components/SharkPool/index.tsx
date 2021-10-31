import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseLayout } from '@rug-zombie-libs/uikit';
import BigNumber from 'bignumber.js';
import { coingeckoPrice, account } from 'redux/get';
import { BIG_ZERO } from 'utils/bigNumber';
import { useERC20 } from 'hooks/useContract';
import artists from 'config/constants/artists';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { multicallv2 } from 'utils/multicall';
import sharkpoolAbi from 'config/abi/autosharkPool.json';
import TableList from './TableList';
import DepositcJaws from './DepositcJaws';
import StakeJaws from './StakeJaws';
import MintTimer from './MintTimer';
import OtherDetails from './OtherDetails';
import sharksetup, { useSharkpool } from './SharkSetup';

const TableCards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;

  & > div {
    grid-column: span 12;
    width: 100%;
  }
`

const SharkPool: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [totalStaked, setTotalStaked] = useState(BIG_ZERO);
    const [jawsPrice, setJawsPrice] = useState(0);
    const [hasDeposited, setDeposited] = useState(false);
    const [hasUnlocked, setUnlocked] = useState(false);
    const [balance, setBalance] = useState(BIG_ZERO);
    const [allowance, setAllowance] = useState(BIG_ZERO);
    const [callowance, setCAllowance] = useState(BIG_ZERO);
    const [mintDate, setMintDate] = useState(0);
    const [unlockFee, setUnlockFee] = useState(0);
    const [depositFee, setDepositFee] = useState(0);
    const [minimumStake, setMinimumStake] = useState(BIG_ZERO);

    const wallet = account();
    const jawsContract = useERC20(sharksetup.jaws);
    const cjawsContract = useERC20(sharksetup.cjaws);
    const sharkpoolContract = useSharkpool();    

    const openInDetails = (data) => {
        setIsOpen(data);
    };

    const onUpdate = () => {
        sharkpoolContract.methods.userInfo(wallet).call()
            .then(res => {
                setDeposited(res.paidDepositFee);
                setUnlocked(res.paidUnlockFee);
                setBalance(new BigNumber(res.amount));
                setMintDate(res.nftMintDate);
            });
        jawsContract.methods.balanceOf(sharksetup.pool).call()
            .then(res => {
                setTotalStaked(new BigNumber(res));
            });
    }

    useEffect(() => {
        jawsContract.methods.balanceOf(sharksetup.pool).call()
            .then(res => {
                setTotalStaked(new BigNumber(res));
            });

        coingeckoPrice(sharksetup.jawsGeckoId)
            .then(res => {
                setJawsPrice(res.data[sharksetup.jawsGeckoId].usd);        
            });

        const calls = [
            { address: sharksetup.pool, name: 'unlockFeeInBnb', params: [] },
            { address: sharksetup.pool, name: 'minStakeAmount', params: [] },
            { address: sharksetup.pool, name: 'depositBurnRate', params: [] }
        ]

        multicallv2(sharkpoolAbi, calls)
            .then(res => {
                setUnlockFee(parseFloat(getFullDisplayBalance(new BigNumber(res[0]), 18, 4)));
                setMinimumStake(new BigNumber(res[1]));
                setDepositFee(res[2] / 100);
            });

        if (wallet) {
            cjawsContract.methods.allowance(wallet, sharksetup.pool).call()
                .then(res => {
                    setCAllowance(res);
                });
            jawsContract.methods.allowance(wallet, sharksetup.pool).call()
                .then(res => {
                    setAllowance(res);
                });
            sharkpoolContract.methods.userInfo(wallet).call()
                .then(res => {
                    setDeposited(res.paidDepositFee);
                    setUnlocked(res.paidUnlockFee);
                    setBalance(new BigNumber(res.amount));
                    setMintDate(res.nftMintDate);
                });            
        }
    }, [ jawsContract, cjawsContract, sharkpoolContract, wallet ]);

    return (
        <TableCards>
            <div className="test-card active-1">
                <div className="table-top">
                    <TableList handler={openInDetails} totalStaked={totalStaked} jawsPrice={jawsPrice} />
                </div>
                {isOpen 
                    ? 
                        (<div className="table-bottom">
                            <div className="w-95 mx-auto mt-3">
                                <div className="flex-grow">
                                    <DepositcJaws deposited={hasDeposited} allowance={callowance} onDeposit={onUpdate} />
                                    <StakeJaws unlocked={hasUnlocked} amount={balance} allowance={allowance} 
                                        minimumStake={minimumStake} jawsPrice={jawsPrice} updateResult={onUpdate} />
                                    <MintTimer unlocked={hasUnlocked} amount={balance} mintDate={mintDate} updateResult={onUpdate} />
                                </div>
                                <OtherDetails nftid={sharksetup.nftid} artist={artists.RugZombie} unlockFee={unlockFee} 
                                    mintTime={sharksetup.mintTime} minimumStake={minimumStake} endBlock={sharksetup.endBlock} 
                                    depositFee={depositFee} />
                            </div>
                        </div>) 
                    : null}
            </div>
        </TableCards>
    );
}

export default SharkPool;