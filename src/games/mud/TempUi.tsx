import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import PageHeader from 'components/PageHeader';
import { Flex, Heading, Text, Input } from '@rug-zombie-libs/uikit';
import Page from 'components/layout/Page';
import { useTranslation } from 'contexts/Localization';
import { account } from 'redux/get';

import { init, login, initialEntry, handleCommand } from './game';

const StyledInput = styled(Input)`
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    padding-left: 0;
    padding-right: 0;
    text-align: right;
    ::placeholder {
        color: ${({ theme }) => theme.colors.textSubtle};
    }
    &:focus:not(:disabled) {
        box-shadow: none;
    }
    background-color: ${({ theme }) => theme.colors.input};
    border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
    border-radius: 16px;
    padding: 8px 16px;
`

const TempMudUi: React.FC = () => {
    const [outputText, setOutputText] = useState('Output Text Goes Here');
    const [inputText, setInputText] = useState('');
    const [initialized, setInitialized] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    
    const { t } = useTranslation();
    const wallet = account();

    useEffect(() => {
        if (!initialized) {
            init();
            setInitialized(true);
        }

        if (!loggedIn && wallet) {
            login(wallet);
            setOutputText(initialEntry());
            setLoggedIn(true);
        }
    }, [ wallet, loggedIn, initialized, outputText ]);

    const updateText = (event: React.ChangeEvent<HTMLInputElement>) => { setInputText(event.target.value); }
    const checkKey = (e: { key: string; }) => { if (e.key === 'Enter') submit(); }

    const submit = () => {
        if (!inputText) return;
        setOutputText(handleCommand(inputText.toLowerCase()));
        setInputText('');
    }

    return (
        <>
            <PageHeader background='#101820'>
                <Flex justifyContent='space-between' flexDirection={['column', null, 'row']}>
                    <Flex flexDirection='column' mr={['8px', 0]}>
                        <Heading as='h1' size='xxl' color='secondary' mb='24px'>MUD - Temporary UI</Heading>
                    </Flex>
                </Flex>
            </PageHeader>
            <Page>
                <Text as="p" mb="24px">
                    {t(outputText)}
                </Text>
                <StyledInput type="text" style={{ border: 5 }} value={inputText} onChange={updateText} onKeyDown={checkKey} />
                <button onClick={submit} className="btn w-100" type="button">Submit</button>
            </Page>
        </>
    );
}

export default TempMudUi;