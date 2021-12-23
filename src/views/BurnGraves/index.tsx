import React, { useState, useEffect } from 'react';
import PageHeader from 'components/PageHeader';
import { Flex, Heading } from '@rug-zombie-libs/uikit';
import { burnGraves, account, zombiePriceUsd, zmbeBnbLpPriceUsd } from 'redux/get'
import { burnGrave, initialBurnGraveData } from 'redux/fetch';
import BigNumber from 'bignumber.js';
import { BIG_ZERO } from 'utils/bigNumber';
import numeral from 'numeral';
import { getBalanceAmount } from 'utils/formatBalance';
import { getId } from 'utils';
import Page from 'components/layout/Page';
import Table from './components/Table';

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
    const liveZmbePrice = zombiePriceUsd()
    const [zmbePrice, setZmbePrice] = useState(liveZmbePrice);

    useEffect(() => {
        setZmbePrice(liveZmbePrice)
    }, [liveZmbePrice])
    

    useEffect(() => {
        if(!updateUserInfo) {
          initialBurnGraveData(
                { update: updateUserInfo, setUpdate: setUpdateUserInfo },
                { update: updatePoolInfo, setUpdate: setUpdatePoolInfo }
            )
        }
    }, [ updatePoolInfo, updateUserInfo ]);

    const updateResult = (id: number) => {
        burnGrave(id, { update: updateUserInfo, setUpdate: setUpdateUserInfo });
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
                            These graves help burn ZMBE in exchange for faster NFT mintings!
                        </Heading>
                    </Flex>
                </Flex>
        </PageHeader>
        <Page>
            <div>
                {burnGraves().map((a) => {
                    return <Table id={getId(a.id)} key={getId(a.id)} zmbePrice={zmbePrice} updateResult={updateResult} />
                })}
            </div>
        </Page>
        </>
    );
}

export default BurnGraves;