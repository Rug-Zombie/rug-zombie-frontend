import React, { useState, useEffect } from 'react';
import PageHeader from 'components/PageHeader';
import { Flex, Heading } from '@rug-zombie-libs/uikit';
import { burnGraves, account } from 'redux/get';
import { burnGrave, initialBurnGraveData } from 'redux/fetch';
import BigNumber from 'bignumber.js';
import { BIG_ZERO } from 'utils/bigNumber';
import numeral from 'numeral';
import { getBalanceAmount } from 'utils/formatBalance';

const filterGraves = (a) => {
    switch (a) {
        case 0: return burnGraves().filter(g => g.poolInfo.isEnabled);
        case 1: return burnGraves().filter(g => !g.poolInfo.isEnabled);
        default: return burnGraves();
    }
}

const BurnGraves: React.FC = () => {
    const [updateUserInfo, setUpdateUserInfo] = useState(false);
    const [updatePoolInfo, setUpdatePoolInfo] = useState(false);
    const [stakedOnly, setStakedOnly] = useState(false);
    const [filter, setFilter] = useState(0);
    const [totalBurned, setTotalBurned] = useState(BIG_ZERO);
    
    const wallet = account();

    useEffect(() => {
        console.log("HIT");
        if(!updateUserInfo) {
          initialBurnGraveData(
            { update: updateUserInfo, setUpdate: setUpdateUserInfo },
            { update: updatePoolInfo, setUpdate: setUpdatePoolInfo }
        )
        
        const burned = new BigNumber(0);
        burnGraves().forEach(g => burned.plus(g.poolInfo.totalBurned));
        setTotalBurned(burned);
        }
      }, [ updatePoolInfo, updateUserInfo ]);
    
    const updateResult = (id: number) => {
        burnGrave(id);
        const burned = new BigNumber(0);
        burnGraves().forEach(g => burned.plus(g.poolInfo.totalBurned));
        setTotalBurned(burned);
    }

    return (
        <>
        <PageHeader background="#101820">
            <Flex justifyContent='space-between' flexDirection={['column', null, 'row']}>
                    <Flex flexDirection='column' mr={['8px', 0]}>
                        <Heading as='h1' size='xxl' color='secondary' mb='24px'>
                            Burn Graves
                        </Heading>
                        <Heading size='md' color='text'>
                            These graves help burn ZMBE in exchange for faster NFT mintings!<br />
                            Total Zombie Burned Across All Burn Graves: {numeral(getBalanceAmount(totalBurned)).format('(0.000a)')}
                        </Heading>
                    </Flex>
                </Flex>
        </PageHeader>
        </>
    );
}

export default BurnGraves;