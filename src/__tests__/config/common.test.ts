import { AnnouncementSubject } from 'config/constants/types'
import { getAnnouncementById } from '../../utils/announcementHelpers'

const hasValidAnnouncements = ({ announcementIds }: AnnouncementSubject) => {
  if (!announcementIds) {
    return
  }

  announcementIds.forEach((id) => expect(getAnnouncementById(id)).not.toBeFalsy())
}

describe('Common constants tests', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Just has common tests so shouldn\'t be run', () => { })
})

export default hasValidAnnouncements
