import React, { useState, useEffect } from 'react';
import PageHeader from 'components/PageHeader';
import { coingeckoPrice, account } from 'redux/get';
import { Flex, Heading, LinkExternal } from '@rug-zombie-libs/uikit';
import Page from 'components/layout/Page';
import sharkpools from './SharkSetup';
import Table from './Table';

const SharkPools: React.FC = () => {
    return (
        <>
            <PageHeader background="#101820">
                <Flex justifyContent='space-between' flexDirection={['column', null, 'row']}>
                    <Flex flexDirection='column' mr={['8px', 0]}>
                        <Heading as='h1' size='xxl' color='secondary' mb='24px'>
                            Shark Pools
                        </Heading>
                        <Heading size='md' color='text'>
                            Special NFT Only staking pools.<br/>
                            The zombies hobbled this together using some torn blueprints with the word &apos;BARR&apos; 
                            written at the top.
                        </Heading>
                        <br/>
                        <LinkExternal href="https://autoshark.finance/">
                            Check out AutoShark!
                        </LinkExternal>
                    </Flex>
                </Flex>
            </PageHeader>
            <Page>
                <div>
                    {sharkpools.map((a) => { 
                        return <Table id={a.id} />
                    })}
                </div>
            </Page>
        </>
    )
}

export default SharkPools;