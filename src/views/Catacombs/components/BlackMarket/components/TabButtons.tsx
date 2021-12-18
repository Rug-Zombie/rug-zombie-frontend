import React, {useState} from 'react'
import styled from 'styled-components'
import {
    ButtonMenu,
    ButtonMenuItem,
    Button,
    Text,
    Flex,
    NotificationDot,
    useMatchBreakpoints,
} from '@catacombs-libs/uikit'
import {useModal} from '@rug-zombie-libs/uikit'
import {useTranslation} from 'contexts/Localization'
import CreateListingModal from "./CreateListingModal";

const ButtonText = styled(Text)`
  display: none;

  ${({theme}) => theme.mediaQueries.lg} {
    display: block;
  }
`

const StyledButton = styled(Button)`
  border: 2px solid white;
  background: black;
  color: white;
  width: 100%;
  flex-grow: 1;
`

const FILTERS = ['All', 'My listings', 'Sold']

const TabButtons = ({setFilter}) => {
    const {t} = useTranslation()
    const [index, setIndex] = useState(0)
    const {isLg, isXl, isMd} = useMatchBreakpoints()
    const isDesktop = isLg || isXl || isMd

    const [handleCreateListing] = useModal(<CreateListingModal />)

    const toggleButtonMenu = (i) => {
        setFilter(i)
        setIndex(i)
    }

    const nextFilter = () => {
        if (index === 2) {
            toggleButtonMenu(0)
        } else {
            toggleButtonMenu(index + 1)
        }
    }

    return (
        <Flex alignItems='center' justifyContent='center' mb='32px'>
            <Wrapper>
                {isDesktop ?
                    <ButtonMenu onItemClick={toggleButtonMenu} activeIndex={index} scale='sm'>
                        <ButtonMenuItem>
                            <Text color="tertiary" bold>
                                {t('All')}
                            </Text>
                        </ButtonMenuItem>
                        <NotificationDot>
                            <ButtonMenuItem>
                                <Text color="tertiary" bold>
                                    {t('My listings')}
                                </Text>
                            </ButtonMenuItem>
                        </NotificationDot>
                        <NotificationDot>
                            <ButtonMenuItem>
                                <Text color="tertiary" bold>
                                    {t('Sold')}
                                </Text>
                            </ButtonMenuItem>
                        </NotificationDot>
                    </ButtonMenu> :
                    <StyledButton onClick={nextFilter} className="total-earned text-shadow">
                        <Text color="tertiary" bold>
                            {t('Showing:')} {t(FILTERS[index])}
                        </Text>
                    </StyledButton>}
            </Wrapper>
            <Flex ml='24px' alignItems='center' justifyContent='flex-end'>
                <button type="button" style={{
                    background: 'black',
                    color: 'white',
                    border: '2px solid white',
                    boxShadow: 'inset 0 0 10px, 0 0 10px'
                }}
                        className="btn w-100" onClick={handleCreateListing}>
                    <ButtonText color='white' bold fontSize='16px'>
                        {isDesktop ? t('Create Listing') : '+'}
                    </ButtonText>
                </button>
            </Flex>
        </Flex>
    )
}

export default TabButtons


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding-left: 12px;
    padding-right: 12px;
  }

  ${({theme}) => theme.mediaQueries.sm} {
    margin-left: 16px;
  }
`
