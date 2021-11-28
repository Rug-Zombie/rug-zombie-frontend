export interface TeamMemberInfo {
  name: string,
  telegramHandle: string,
  profilePic: string,
  title: string,
  email: string,
  isFounder?: boolean
}

export const team: TeamMemberInfo[] = [
  {
    name: 'Emperor Zombietine',
    telegramHandle: '@emperor_zombietine',
    profilePic: '/images/team/ez.jpg',
    title: 'Creative Lead and Business Developer',
    email: 'ez@rugzombie.io',
    isFounder: true
  },
  {
    name: 'Silverback',
    telegramHandle: '@Silverback_KingApe',
    profilePic: '/images/team/silverback.jpg',
    title: 'Legal Advisor',
    email: 'silverback@rugzombie.io',
    isFounder: true
  },
  {
    name: 'Nams',
    telegramHandle: '@nn_mss',
    profilePic: '/images/team/nams.jpg',
    title: 'Chief Blockchain Developer',
    email: 'nams@rugzombie.io',
    isFounder: true
  },
  {
    name: 'Wingnut',
    telegramHandle: '@CryptoWingnut',
    profilePic: '/images/team/wingnut.png',
    title: 'Lead Backend Developer',
    email: 'wingnut@rugzombie.io'
  },
  {
    name: 'Saad',
    telegramHandle: '@saad_sarwar',
    profilePic: '/images/team/saad.png',
    title: 'Backend Developer',
    email: 'saad_sarwar22@hotmail.com'
  },
  {
    name: 'Jussjoshinduh',
    telegramHandle: '@Jussjoshinduh',
    profilePic: '/images/team/jussjoshinduh.jpg',
    title: 'NFT Specialist',
    email: 'Joshbrownell2@gmail.com',
    isFounder: true
  }
]