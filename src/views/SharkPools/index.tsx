import React, { useEffect, useState } from 'react';
import PageHeader from 'components/PageHeader';
import { Flex, Heading, LinkExternal } from '@rug-zombie-libs/uikit';
import { account } from 'redux/get';
import Page from 'components/layout/Page';
import { initialSharkPoolData, sharkPool } from 'redux/fetch';
import * as get from 'redux/get';
import Table from './Table';

const SharkPools: React.FC = () => {
    const [updatePoolInfo, setUpdatePoolInfo] = useState(0);
    const [updateUserInfo, setUpdateUserInfo] = useState(0);

    const wallet = account();

    useEffect(() => {
        if(wallet) {
            if(updateUserInfo === 0) {
                initialSharkPoolData({update: updateUserInfo, setUpdate: setUpdateUserInfo});
            }
        } else if(updatePoolInfo === 0) {
            initialSharkPoolData({update: updatePoolInfo, setUpdate: setUpdatePoolInfo});
        }
    
    }, [ wallet, updatePoolInfo, updateUserInfo ]);

    const updateResult = (id: number) => {
        sharkPool(id);
    };

    return (
        <>
            <PageHeader background="#101820">
                <Flex justifyContent='space-between' flexDirection={['column', null, 'row']}>
                    <Flex flexDirection='column' mr={['8px', 0]}>
                        <Heading as='h1' size='xxl' color='secondary' mb='24px'>
                            Shark Pools
                        </Heading>
                        <Heading size='md' color='text'>
                            Special NFT Only Pools<br />
                            The zombies have hobbled this together using torn blueprints they found with the word `&apos;BARR`&apos; 
                            written along the top.
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
                    {get.sharkPools().map((a) => {
                        return <Table id={a.id} updateResult={updateResult} />
                    })}
                </div>
            </Page>
        </>
    );
};

export default SharkPools;