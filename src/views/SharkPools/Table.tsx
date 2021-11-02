import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseLayout } from '@rug-zombie-libs/uikit';
import { account } from 'redux/get';
import { useERC20 } from 'hooks/useContract';
import { getAddress } from 'utils/addressHelpers';
import BigNumber from 'bignumber.js';
import { BIG_ZERO } from 'utils/bigNumber';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { multicallv2 } from 'utils/multicall';
import sharkpoolAbi from 'config/abi/autosharkPool.json';
import TableList from './TableList';
import DepositBox from './DepositBox';
import sharkpools, { useSharkpool } from './SharkSetup';

const TableCards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;

  & > div {
    grid-column: span 12;
    width: 100%;
  }
`

interface TableProps {
    id: number
}

const Table: React.FC<TableProps> = ({ id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [totalStaked, setTotalStaked] = useState(BIG_ZERO);
    const [tokenPrice, setTokenPrice] = useState(0);
    const [unlockFee, setUnlockFee] = useState(0);
    const [minimumStake, setMinimumStake] = useState(BIG_ZERO);
    const [maximumStake, setMaximumStake] = useState(BIG_ZERO);
    const [depositFee, setDepositFee] = useState(0);
    const [requiresDeposit, setRequiresDeposit] = useState(true);
    const [hasDeposited, setDeposited] = useState(false);
    const [hasUnlocked, setUnlocked] = useState(false);
    const [balance, setBalance] = useState(BIG_ZERO);
    const [mintDate, setMintDate] = useState(0);
    const [depositAllowance, setDepositAllowance] = useState(BIG_ZERO);

    const pool = sharkpools.find(a => a.id === id);
    const wallet = account();

    const tokenContract = useERC20(getAddress(pool.stakeToken.address));
    const depositContract = useERC20(getAddress(pool.depositToken.address));
    const sharkpoolContract = useSharkpool(pool.pool);

    const openInDetails = (data) => {
        setIsOpen(data);
    };

    const onUpdate = () => {
        tokenContract.methods.balanceOf(pool.pool).call()
            .then(res => {
                setTotalStaked(new BigNumber(res));
            });

        if (wallet) {
            sharkpoolContract.methods.userInfo(wallet).call()
                .then(res => {
                    setDeposited(res.paidDepositFee);
                    setUnlocked(res.paidUnlockFee);
                    setBalance(new BigNumber(res.amount));
                    setMintDate(res.nftMintDate);
                });

            if (requiresDeposit) {
                depositContract.methods.allowance(wallet, pool.pool).call()
                .then(res => {
                    setDepositAllowance(res);
                });
            }
        }
    }

    useEffect(() => {
        tokenContract.methods.balanceOf(pool.pool).call()
            .then(res => {
                setTotalStaked(new BigNumber(res));
            });

        const calls = [
            { address: pool.pool, name: 'unlockFeeInBnb', params: [] },
            { address: pool.pool, name: 'minStakeAmount', params: [] },
            { address: pool.pool, name: 'maxStakeAmount', params: [] },
            { address: pool.pool, name: 'depositTaxRate', params: [] },
            { address: pool.pool, name: 'requiresDeposit', params: [] }
        ]

        multicallv2(sharkpoolAbi, calls)
            .then(res => {
                setUnlockFee(parseFloat(getFullDisplayBalance(new BigNumber(res[0]), 18, 4)));
                setMinimumStake(new BigNumber(res[1]));
                setMinimumStake(new BigNumber(res[2]));
                setDepositFee(res[3] / 100);
                setRequiresDeposit(res[4]);
            });

        if (wallet) {
            sharkpoolContract.methods.userInfo(wallet).call()
                .then(res => {
                    setDeposited(res.paidDepositFee);
                    setUnlocked(res.paidUnlockFee);
                    setBalance(new BigNumber(res.amount));
                    setMintDate(res.nftMintDate);
                });

            if (requiresDeposit) {
                depositContract.methods.allowance(wallet, pool.pool).call()
                    .then(res => {
                        setDepositAllowance(res);
                    });
            }
        }
    });

    return (
        <TableCards>
            <div className="test-card active-1">
                <div className="table-top">
                    <TableList id={id} totalStaked={totalStaked} tokenPrice={tokenPrice} handler={openInDetails} />
                </div>
                {isOpen 
                    ? 
                        (<div className="table-bottom">
                            <div className="w-95 mx-auto mt-3">
                                <div className="flex-grow">
                                    <DepositBox id={id} requiresDeposit={requiresDeposit} deposited={hasDeposited} 
                                        allowance={depositAllowance} onDeposit={onUpdate} />
                                </div>
                            </div>
                        </div>) 
                    : null}
            </div>
        </TableCards>
    )
};

export default Table;