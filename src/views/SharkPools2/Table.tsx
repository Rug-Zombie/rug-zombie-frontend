import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseLayout } from '@rug-zombie-libs/uikit';
import { coingeckoPrice, account } from 'redux/get';
import { useERC20 } from 'hooks/useContract';
import { getAddress } from 'utils/addressHelpers';
import BigNumber from 'bignumber.js';
import { multicallv2 } from 'utils/multicall';
import { getFullDisplayBalance } from 'utils/formatBalance';
import sharkpoolAbi from 'config/abi/autosharkPool.json';
import sharkpools, { useSharkpool } from './SharkSetup';
import TableList from './TableList';
import DepositBox from './DepositBox';

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
    const [initialized, setIsInitialized] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const wallet = account();
    const pool = sharkpools.find(a => a.id === id);
    const stakeTokenContract = useERC20(getAddress(pool.stakeToken.address));
    const depositTokenContract = useERC20(getAddress(pool.depositToken.address));
    const sharkpool = useSharkpool(pool.address);

    const openInDetails = (data) => {
        setIsOpen(data);
    }

    const handleUpdate = () => {
        stakeTokenContract.methods.balanceOf(pool.address).call()
            .then(res => {
                pool.totalStaked = new BigNumber(res.toString());
            });

        if (wallet) {
            stakeTokenContract.methods.allowance(wallet, pool.address).call()
                .then(res => {
                    if (parseInt(res.toString()) !== 0) {
                        pool.approvedStake = true;
                    } else {
                        pool.approvedStake = false;
                    }
                });

            sharkpool.methods.userInfo(wallet).call()
                .then(res => {
                    pool.stakedAmount = new BigNumber(res.amount);
                    pool.paidUnlock = res.paidUnlockFee;
                    pool.paidDeposit = res.paidDepositFee;
                    pool.nftTimer = res.nftMintDate;
                });

            if (pool.requiresDeposit) {
                depositTokenContract.methods.allowance(wallet, pool.address).call()
                    .then(res => {
                        if (parseInt(res.toString()) !== 0) {
                            pool.approvedDeposit = true;
                        } else {
                            pool.approvedDeposit = false;
                        }
                    });
            }
        }
    }

    const initializePoolInfo = () => {
        console.log('HIT');
        stakeTokenContract.methods.balanceOf(pool.address).call()
            .then(res => {
                pool.totalStaked = new BigNumber(res.toString());
            });

        if (pool.geckoId) {
            coingeckoPrice(pool.geckoId)
                .then(res => {
                    pool.usdPrice = res.data[pool.geckoId].usd;
                });
        }

        const calls = [
            { address: pool.address, name: 'unlockFeeInBnb', params: [] },
            { address: pool.address, name: 'minStakeAmount', params: [] },
            { address: pool.address, name: 'maxStakeAmount', params: [] },
            { address: pool.address, name: 'depositTaxRate', params: [] },
            { address: pool.address, name: 'requiresDeposit', params: [] }
        ]

        multicallv2(sharkpoolAbi, calls)
            .then(res => {
                pool.unlockFee = parseFloat(getFullDisplayBalance(new BigNumber(res[0]), 18, 4));
                pool.minStake = new BigNumber(res[1]);
                pool.maxStake = new BigNumber(res[2]);
                pool.stakeTax = res[3] / 100;
                pool.requiresDeposit = res[4];
            });

            if (wallet) {
                stakeTokenContract.methods.allowance(wallet, pool.address).call()
                    .then(res => {
                        if (parseInt(res.toString()) !== 0) {
                            pool.approvedStake = true;
                        } else {
                            pool.approvedStake = false;
                        }
                    });

                sharkpool.methods.userInfo(wallet).call()
                    .then(res => {
                        pool.stakedAmount = new BigNumber(res.amount);
                        pool.paidUnlock = res.paidUnlockFee;
                        pool.paidDeposit = res.paidDepositFee;
                        pool.nftTimer = res.nftMintDate;
                    });

                if (pool.requiresDeposit) {
                    depositTokenContract.methods.allowance(wallet, pool.address).call()
                        .then(res => {
                            if (parseInt(res.toString()) !== 0) {
                                pool.approvedDeposit = true;
                            } else {
                                pool.approvedDeposit = false;
                            }
                        });
                }
            }
    };

    const initialize = () => {
        if (!initialized) {
            console.log('HIT');
            initializePoolInfo();
            setIsInitialized(true);      
        }
    }

    useEffect(() => {
        initialize();
    });

    return(
        <TableCards>
            <div className="test-card active-1">
                <div className="table-top">
                    <TableList id={id} handler={openInDetails} />
                </div>
                {isOpen 
                    ? (
                        <div className="table-bottom">
                            <div className="w-95 mx-auto mt-3">
                                <div className="flex-grow">
                                    <DepositBox id={id} onDeposit={handleUpdate} />

                                </div>
                                
                            </div>
                        </div> ) 
                    : null}
            </div>
        </TableCards>
    )
};

export default Table;