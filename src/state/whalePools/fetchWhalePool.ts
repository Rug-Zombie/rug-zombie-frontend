import BigNumber from 'bignumber.js'
import { WhalePoolInfo, WhalePoolUserInfo } from '../types'
import { getWhalePoolContract } from "../../utils/contractHelpers";

export const fetchWhalePool = async (): Promise<WhalePoolInfo> => {
  const mintingFee = await getWhalePoolContract().methods.mintingFeeInBnb().call()
  const totalStakers = await getWhalePoolContract().methods.totalStakers().call()
  const mintingTime = await getWhalePoolContract().methods.mintingTime().call()

  return {
    mintingFeeBnb: new BigNumber(mintingFee),
    totalStakers: parseInt(totalStakers),
    mintingTime: new BigNumber(mintingTime),
  }
}

export const fetchWhalePoolUser = async (account: string): Promise<WhalePoolUserInfo> => {
  const nftMintTime = await getWhalePoolContract().methods.nftMintTime(account).call()
  const userInfo = await getWhalePoolContract().methods.userInfo(account).call()
  return {
    nftMintTime: new BigNumber(nftMintTime),
    isStaked: userInfo.isStaked,
    isMinting: userInfo.isMinting,
    stakedNft: userInfo.stakedNft,
    stakedId: userInfo.stakedId,
    hasRandom: userInfo.hasRandom,
    randomNumber: userInfo.randomNumber
  }
}
