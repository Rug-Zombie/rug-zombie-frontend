import { getDrFrankensteinContract } from '../../utils/contractHelpers'
import web3 from '../../utils/web3'

// eslint-disable-next-line import/prefer-default-export
export const fetchDrFEvents = async (account: string) => {
  const drFrankenstein = getDrFrankensteinContract()
  const currentBlock = await web3.eth.getBlockNumber()

  const deposits = await drFrankenstein.getPastEvents('Deposit', {
    fromBlock: currentBlock - 5000,
    toBlock: currentBlock,
    filter: {user: account}
  })

  const withdrawals = await drFrankenstein.getPastEvents('Withdraw', {
    fromBlock: currentBlock - 5000,
    toBlock: currentBlock,
    filter: {user: account}
  })

  const withdrawEarlys = await drFrankenstein.getPastEvents('WithdrawEarly', {
    fromBlock: currentBlock - 5000,
    toBlock: currentBlock,
    filter: {user: account}
  })

  const emergencyWithdrawals = await drFrankenstein.getPastEvents('WithdrawEarly', {
    fromBlock: currentBlock - 5000,
    toBlock: currentBlock,
    filter: {user: account}
  })

  const nftMints = await drFrankenstein.getPastEvents('ReviveRug', {
    fromBlock: currentBlock - 5000,
    toBlock: currentBlock,
    filter: {to: account}
  })

  console.log(deposits)
  console.log(withdrawals)


  return []
}

