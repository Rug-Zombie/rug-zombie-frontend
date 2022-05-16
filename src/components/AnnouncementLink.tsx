import React from 'react'
import styled from 'styled-components'
import info from 'images/icons/info.svg'
import { AnnouncementSubject } from 'config/constants/types'
import { getAnnouncementLink } from 'utils/announcementHelpers'

interface Props {
  subject: AnnouncementSubject
}

const AnnouncementContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 527px) {
    margin: 0;
  }
`

const AnnouncementA = styled.a`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`

const AnnouncementIcon = styled.img`
  width: 25px;
  height: 25px;
`

const AnnouncementLink: React.FC<Props> = ({ subject}) => {
  const link = getAnnouncementLink(subject)
  if (!link) {
    return <></>
  }

  return (
    <AnnouncementContainer>
      <AnnouncementA href={link} target="_blank" rel="noopener noreferrer">
        <AnnouncementIcon alt="announcement link" src={info} />
      </AnnouncementA>
    </AnnouncementContainer>
  )
}

export default AnnouncementLink
