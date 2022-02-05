import { getDrFrankensteinContract } from '../../utils/contractHelpers'

export const fetchDrFEvents = async (account: string) => {
  const drFrankenstein = getDrFrankensteinContract()

    await drFrankenstein.getPastEvents('Deposit', {
      filter: {user: account},
      fromBlock: 0,
      toBlock: 'latest'
    }, (error, events) => {
      console.log(error)
      console.log(events)
    })

  return []
}

