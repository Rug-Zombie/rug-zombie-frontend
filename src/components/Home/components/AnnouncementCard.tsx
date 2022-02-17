import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Text, LinkExternal, Flex } from '@rug-zombie-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import { Lightbox } from "react-modal-image";

const StyledAnnouncementCard = styled(Card)`
  background-size: 300px 300px;
  background-position-x: 100px;
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
  box-shadow: rgb(204 246 108) 0px 0px 20px;
`

interface AnnouncementCardProps {
  modalObj: {modal: boolean, setModal: any};
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({modalObj}) => {
  const { t } = useTranslation()
  const imagePath = "https://ipfs.io/ipfs/QmZabZnzYQBVRoehCNtEUBSRUGferfRcuAjX8iz37c4VtL"

  const closeModal = () => {
    modalObj.setModal(null)
  }

  const openModal = () => {
    modalObj.setModal(
      <Lightbox
        large={imagePath}
        alt="The Infamous Matos"
        onClose={closeModal}
        hideDownload
      />
    )
  }

  return (
    <StyledAnnouncementCard>
      <CardBody>
        <Heading size='xl' mb='24px'>
          {t('Announcements')}
        </Heading>
        <Text>
          {t('Bitconnect series is live in the Catacombs!')}
        </Text>
        <br />
        <Flex alignItems="center" flexDirection="column" width="100%" onClick={openModal}>

        <img width='40%' src={imagePath}
                 alt='The Infamous Matos Nft' />
        </Flex>

        <LinkExternal paddingTop='10px' href='https://rugzombie.medium.com/'>
          Follow our medium for our latest Burnsgiving events
        </LinkExternal>
      </CardBody>
    </StyledAnnouncementCard>
  )
}

export default AnnouncementCard
