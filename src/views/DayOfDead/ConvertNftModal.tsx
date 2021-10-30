import React, { useState, useEffect } from 'react';
import { Modal, Flex, Text, Button } from '@rug-zombie-libs/uikit';
import nfts from 'redux/nfts';
import { BIG_ZERO } from 'utils/bigNumber';
import { useERC721, useNftOwnership, useNftSwapper } from 'hooks/useContract';
import { getAddress, getNftSwapperAddress } from 'utils/addressHelpers';
import { account } from 'redux/get';
import BigNumber from 'bignumber.js';
import useToast from 'hooks/useToast';
import { useTranslation } from 'contexts/Localization';

interface ConvertNftProps {
    rznftid: number,
    onDismiss?: () => void
  }

const ConvertNftModal: React.FC<ConvertNftProps> = ({ rznftid, onDismiss }) => {
    const rznft = nfts.find(a => a.id === rznftid);
    const wallet = account();
    const { toastSuccess } = useToast();
    const { t } = useTranslation();

    const nftOwnershipContract = useNftOwnership();
    const nftSwapperContract = useNftSwapper();
    const rzNftContract = useERC721(getAddress(rznft.address));

    const [nftBalance, setNftBalance] = useState(BIG_ZERO);
    const [ids, setIds] = useState([])
    const [selected, setSelected] = useState(null)
    const [approved, setApproved] = useState(false)

    useEffect(() => {
        if (selected && wallet) {
            rzNftContract.methods.getApproved(selected).call().then(res => {
              setApproved(res === getNftSwapperAddress())
            })
        }
      }, [selected, wallet, rzNftContract.methods])

    useEffect(() => {
        if (wallet) {
            rzNftContract.methods.balanceOf(wallet).call().then(res => {
            setNftBalance(new BigNumber(res));
        })
        }
    }, [rzNftContract.methods, wallet])

    useEffect(() => {
        if (wallet) {
            nftOwnershipContract.methods.checkOwnership(wallet, getAddress(rznft.address)).call().then(res => { 
                setIds(res);
            })
        }        
    }, [rznft.address, nftOwnershipContract.methods, wallet])

    function handleConvertNft() {
        if (wallet && approved) {
            nftSwapperContract.methods.swapNft(getAddress(rznft.address), selected).send({ from: wallet }).then(() => {
                toastSuccess(t(`Converted ${rznft.symbol}`));
                onDismiss();
            });
        }
    }

    const handleApproveNft = () => {
        if (wallet && !approved) {
            rzNftContract.methods.approve(getNftSwapperAddress(), selected).send({ from: wallet }).then(() => {
                setApproved(true);
            });
        }
    }

    const approveButton = selected && !approved;
    const convertButton = selected && approved;

    return (
        <Modal onDismiss={onDismiss} title={`Convert ${rznft.symbol}`}>
            <Flex alignItems='center' justifyContent='space-between' mb='8px'>
                <Text bold>Select ID of NFT:</Text>
                <Flex alignItems='center' minWidth='70px'>
                    <Text ml='4px' bold>{rznft.symbol}</Text>
                </Flex>
            </Flex>
            <Flex justifyContent='center'>
                {rznft.type === 'image' ? (
                    <img src={rznft.path} alt='NFT' style={{ maxWidth: '50%' }} className='sc-cxNHIi bjMxQn' />
                ) : (
                    <video autoPlay loop className='sc-cxNHIi bjMxQn'>
                    <source src={rznft.path} type='video/webm' />
                    </video>
                )}
            </Flex>
            <Text mt='8px' color='textSubtle' fontSize='12px' mb='8px' style={{ width: '100%' }}>
                Balance: {nftBalance.toString()}
                {nftBalance.isZero() 
                    ? <Text mt='8px' ml='auto' color='tertiary' fontSize='12px' mb='8px'>
                        Must earn {rznft.symbol} NFT before you can swap
                      </Text> 
                    : <Text bold>IDS in your wallet:</Text>}
            </Text>
            <Flex justifyContent='center'>
                {ids.map(currentId => {
                    return <div id={currentId} key={currentId} style={{ padding: '10px' }}><Button onClick={() => {
                    setSelected(currentId)
                    }} variant={currentId === selected ? 'secondary' : 'primary'}>{currentId}</Button></div>
                })}
            </Flex>
            <Flex justifyContent='center'>
                <Button onClick={() => {if (selected) { handleApproveNft() }}} disabled={!approveButton} mt='8px' as='a' variant={selected ? 'secondary' : 'primary'}>
                    APPROVE {rznft.symbol}
                </Button>  
                <Text mt='8px' color='textSubtle' fontSize='12px' mb='8px' style={{ width: '10%' }} />
                <Button onClick={() => {if (selected) { handleConvertNft() }}} disabled={!convertButton} mt='8px' as='a' variant={selected ? 'secondary' : 'primary'}>
                    CONVERT {rznft.symbol}
                </Button>
            </Flex>
        </Modal>
    )
}

export default ConvertNftModal;