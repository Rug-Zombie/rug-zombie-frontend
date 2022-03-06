import announcements from 'config/constants/announcements'
import { Announcement, AnnouncementSubject } from 'config/constants/types'

export const getAnnouncementById = (id: number): Announcement => announcements.get(id)

export const getAnnouncementLink = ({ announcementIds }: AnnouncementSubject): string | undefined => {
  if (!announcementIds || !announcementIds.length) {
    return undefined
  }

  const mostRecentReleaseAnnouncement = announcementIds && announcementIds
    .map(announcements.get.bind(announcements))
    .reduce(toMostRecentAnnouncement, undefined)

  return mostRecentReleaseAnnouncement && mostRecentReleaseAnnouncement.url
}

const toMostRecentAnnouncement = (mostRecent: Announcement, announcement: Announcement): Announcement => {
  if (!mostRecent) {
    return announcement
  }

  return (announcement.published > mostRecent.published) ? announcement : mostRecent
}
