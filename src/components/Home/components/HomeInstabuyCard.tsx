import React, { useEffect, useState } from 'react';
import { Lightbox } from "react-modal-image";
import { Card, CardBody, Heading, Flex, CardFooter, Button, ChevronUpIcon, ChevronDownIcon } from '@rug-zombie-libs/uikit';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import { account } from 'redux/get';
import Video from 'components/Video';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { BIG_ZERO } from 'utils/bigNumber';

import { useInstaBuyContract } from 'hooks/useContract';
import { getAddress } from 'utils/addressHelpers';
import { BigNumber } from 'bignumber.js';
import useToast from 'hooks/useToast';
import { instaBuyById } from '../../../utils'
import { useGetNftById } from '../../../state/hooks'

const StyledInstabuy = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  box-shadow: rgb(204 246 108) 0px 0px 20px;
`

const StyleCardHeader = styled.div`
  width: 100%;
  height: 300px;
  background: #111820;
`

const StyleDetails = styled.div`
  display: flex;
  justify-content: center;
`

const StyleCursorPointer = styled.div`
  cursor: pointer;
  ß
  display: flex;
`

interface InstabuyCardProps {
    id: number;
    modalObj: {modal: boolean, setModal: any};
}

const initialNftInfo = {
    price: BIG_ZERO,
    maxMints: BIG_ZERO,
    maxMintsPerUser: BIG_ZERO
  }

const HomeInstabuyCard: React.FC<InstabuyCardProps> = ({ id, modalObj }) => {
    const {nftId, version } = instaBuyById(id)
    const { name, symbol, description, address, path, type, totalSupply } = useGetNftById(nftId);
    const { t } = useTranslation();
    const instaBuy = useInstaBuyContract(version);
    const { toastDefault } = useToast();

    const [nftInfo, setNftInfo] = useState(initialNftInfo);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        instaBuy.methods.nftInfo(getAddress(address)).call()
          .then(res => {
            setNftInfo({
              price: new BigNumber(res.price),
              maxMints: new BigNumber(res.maxMints),
              maxMintsPerUser: new BigNumber(res.maxMintsPerUser),
            });
          });
    }, [address, instaBuy.methods]);

    const closeModal = () => {
        modalObj.setModal(null)
    }

    const openModal = () => {
        modalObj.setModal(
            <Lightbox
              large={path}
              alt={name}
              onClose={closeModal}
              hideDownload
            />
          )
    }

    const handleInstabuy = () => {
        instaBuy.methods.priceInBnb(getAddress(address)).call().then(res => {
            instaBuy.methods.instaBuy(getAddress(address))
                .send({ from: account(), value: res }).then(() => {
                toastDefault(`Bought ${symbol}`);
            });
        });
    }

    return (
        <StyledInstabuy>
            <StyleCardHeader>                    
                <Flex justifyContent='center' flexDirection='column' paddingTop='8%' paddingBottom='5%' paddingRight='5%' paddingLeft='5%' height='100%' onClick={openModal}>
                    <Heading size='lg' mb='24px'>
                        {t('Burn ZMBE with each purchase')}
                    </Heading>
                    {type === 'image' ? <img
                        src={path} alt='nft'
                        style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain' }} /> :
                    <Video path={path} />}
                </Flex>
            </StyleCardHeader>
            <CardBody>
                <Heading as='h2' fontSize='18px'>{name} - {getFullDisplayBalance(nftInfo.price)} BNB</Heading>
            </CardBody>
            <CardFooter>
                <StyleDetails>
                    <Flex justifyContent='center' alignItems='center'>
                    <div style={{ paddingRight: '10px' }}><Button className='btn-disabled' onClick={handleInstabuy}>
                        Instabuy
                    </Button>
                    </div>
                    <StyleCursorPointer onClick={() => {setIsOpen(!isOpen)}}>
                        Details
                        {
                        isOpen ? <ChevronUpIcon color='text' ml='10px' />
                            : <ChevronDownIcon color='text' ml='10px' />
                        }
                    </StyleCursorPointer>
                    </Flex>
                </StyleDetails>
                {
                    isOpen &&
                    <div className='direction-column' style={{ paddingTop: '5%' }}>
                    <span className='indetails-type'>{name}</span>
                    <span className='indetails-title'>{description}</span>
                        {!nftInfo.maxMints.isZero() ?
                          <span className='indetails-title'>{nftInfo.maxMintsPerUser.toString()} per wallet ({nftInfo.maxMints.minus(totalSupply).toString()} remaining).</span>:
                          null}
                    </div>
                }
            </CardFooter>
        </StyledInstabuy>
    );
}

export default HomeInstabuyCard;