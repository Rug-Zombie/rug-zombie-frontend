import React, { useEffect, useState } from 'react'
import './Home.Styles.css'
import styled from 'styled-components'
import numeral from 'numeral'
import spawningPoolsLogo from 'images/home/SpawningPools.svg'
import tombsLogo from 'images/home/Tombs.svg'
import gravesLogo from 'images/home/Graves.svg'
import gravesarrow from 'images/home/GraveArrow.svg'
import sparrow from 'images/home/SpawningPoolArrow.svg'
import tombsarrow from 'images/home/TombArrow.svg'
import footer from 'images/home/Footer.svg'
import { useHistory } from 'react-router'
import TopMenu from '../../components/TopMenu'
import { useMultiCall, useZombie } from '../../hooks/useContract'
import { initialSpawningPoolData, initialTombData } from '../../redux/fetch'
import { bnbPriceUsd, drFrankensteinZombieBalance, spawningPools, tombs, zombiePriceUsd } from '../../redux/get'
import { BIG_ZERO } from '../../utils/bigNumber'
import { getBalanceAmount } from '../../utils/formatBalance'
import { PrimaryButton, PrimaryButtonText, SecondaryButton, SecondaryButtonText } from '../../components/Buttons'
import tokens from '../../config/constants/tokens'
import { getAddress } from '../../utils/addressHelpers'
import { PlusIcon } from '../../components/Icons'

interface HomeProps {
  modalObj: { modal: boolean, setModal: any };
}

const TitleTextBox = styled.div`
  position: absolute;
  top: 270px;
  left: 315px;
  width: 740px;
  height: 156px;
  text-align: left;
  font: normal normal 600 60px/72px Poppins, SemiBold;
  letter-spacing: 0px;
  color: #FFFFFF;
`

const SubTextBox = styled.div`
  position: absolute;
  top: 470px;
  left: 315px;
  width: 630px;
  height: 100px;
  text-align: left;
  font: normal normal 300 20px/36px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
`

const TvlDiv = styled.div`
  position: absolute;
  top: 613px;
  left: 315px;
  width: 420px;
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: row;
`

const TvlText = styled.div`
  text-align: left;
  font: normal normal 300 20px/36px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
  padding-right: 16px;
`

const ButtonsDiv = styled.div`
  position: absolute;
  top: 720px;
  left: 315px;
  width: 740px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: row;
`

const Sec2TitleBox = styled.div`
  position: relative;
  top: 122px;
  width: 100%;
  text-align: center;
  font: normal normal 600 36px/72px Poppins;
  letter-spacing: 1.8px;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const TvlNumber = styled.div`
  text-align: left;
  font: normal normal 300 36px/36px Poppins;
  letter-spacing: 0px;
  color: #30C00D;
  opacity: 1;
`

const Line = styled.div`
  border-radius: 3px;
  opacity: 1;
  margin-right: auto;
  margin-left: auto;
  height: 5px;
`

const HalfLine = styled.div`
  border-radius: 0px 0px 5px 5px;
  opacity: 1;
  margin-right: auto;
  margin-left: auto;
  height: 5px;
`

const Sec2Cards = styled.div`
  position: relative;
  top: 292px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const NavCard = styled.div`
  width: 390px;
  height: 610px;
  background: #151E21 0% 0% no-repeat padding-box;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NavCardTitleText = styled.div`
  text-align: center;
  font: normal normal 600 30px/30px Poppins;
  letter-spacing: 1.5px;
  color: #FFFFFF;
  opacity: 1;
  padding-top: 43px;
`

const NavCardImg = styled.img`
  max-height: 200px;
`

const StakeNowButtonText = styled(SecondaryButtonText)`
  &:hover {
    text-shadow: 0 0 5px white;
  }
`

const NavCardSubText = styled.div`
  position: relative;
  padding-top: 40px;
  width: 80%;
  text-align: left;
  font: normal normal normal 20px/36px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
`

const NavCardText = styled.div`
  position: relative;
  padding-top: 26px;
  width: 80%;
  text-align: left;
  font: normal normal normal 16px/30px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
  opacity: 1;
`

const NavCardFooter = styled.div`
  width: 80%;
  font: normal normal 300 16px/36px Poppins;
  letter-spacing: 0px;
  opacity: 1;
  display: flex;
  flex-direction: row;
  justify-content: right;
`

const NavCardFooterItem = styled.div`
  position: absolute;
  bottom: 73px;
  height: 20px;
  text-align: right;
`

const S3Div = styled.div`
  padding-top: 122px;
  width: 850px;
  height: 660px;
`

const S3TitleText = styled.div`
  text-align: center;
  font: normal normal 600 36px/72px Poppins;
  letter-spacing: 1.8px;
  color: #FFFFFF;
  opacity: 1;
`

const TutorialDiv = styled.div`
  height: 70px;
  width: 100%;
  border: 1px solid #162635;
  opacity: 1;
  display: flex;
  justify-content: left;
  align-items: center;
`

const TutorialTitleText = styled.div`
  text-align: left;
  font: normal normal normal 18px/36px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
  padding-left: 25px;
`

const Home: React.FC<HomeProps> = () => {
  const history = useHistory()
  const multi = useMultiCall()
  const zombie = useZombie()
  const [updatePoolInfo, setUpdatePoolInfo] = useState(0)
  useEffect(() => {
    initialTombData()
  }, [])
  useEffect(() => {
    if (updatePoolInfo === 0) {
      initialSpawningPoolData(zombie, { update: updatePoolInfo, setUpdate: setUpdatePoolInfo })
    }
  }, [multi, updatePoolInfo, zombie])


  const totalSpawningPoolStaked = spawningPools().reduce((accumulator, sp) => {
    return sp.poolInfo.totalZombieStaked.plus(accumulator)
  }, BIG_ZERO)

  const zombiePrice = zombiePriceUsd()
  let tombsTvl = BIG_ZERO
  tombs().forEach(t => {
    const { poolInfo: { reserves, lpTotalSupply, totalStaked } } = t
    const reservesUsd = [getBalanceAmount(reserves[0]).times(zombiePrice), getBalanceAmount(reserves[1]).times(bnbPriceUsd())]
    const bnbLpTokenPrice = reservesUsd[0].plus(reservesUsd[1]).div(lpTotalSupply)
    tombsTvl = tombsTvl.plus(totalStaked.times(bnbLpTokenPrice))
  })

  const zombieBalance = getBalanceAmount(drFrankensteinZombieBalance()).times(zombiePrice)
  const spawningPoolTvl = getBalanceAmount(totalSpawningPoolStaked).times(zombiePrice)
  const [tvl, setTvl] = useState(tombsTvl.plus(zombieBalance).plus(spawningPoolTvl))
  const newTvl = tombsTvl.plus(zombieBalance).plus(spawningPoolTvl)
  useEffect(() => {
    if (!tvl.eq(newTvl) || tvl.isNaN()) {
      setTvl(newTvl)
    }
  }, [newTvl, tvl])

  return (
    <>
      <TopMenu>
        <div id='home-section-1'>
          <TitleTextBox>
            Resurrect Your Dead Tokens
          </TitleTextBox>
          <SubTextBox>
            Turn your worthless tokens into assets. RugZombie is introducing the next generation of NFT utility, with
            GameFi, E-Commerce and metaverse features.
          </SubTextBox>
        </div>
        <TvlDiv>
          <TvlText>
            Total value locked:
          </TvlText>
          <TvlNumber>
            {`$ ${numeral(tvl).format('(0.00 a)')}`}
          </TvlNumber>
        </TvlDiv>
        <ButtonsDiv>
          <PrimaryButton onClick={() => {
            window.location.href = `https://swap.rugzombie.io/swap?outputCurrency=${getAddress(tokens.zmbe.address)}`
          }}>
            <PrimaryButtonText>
              Buy $ZMBE
            </PrimaryButtonText>
          </PrimaryButton>
          <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
            <PrimaryButton onClick={() => {
              history.push('/graveyard')
            }}>
              <PrimaryButtonText>
                View NFTs
              </PrimaryButtonText>
            </PrimaryButton>
          </div>
          <SecondaryButton onClick={() => {
            history.push('/graves')
          }}>
            <StakeNowButtonText>
              Stake Now
            </StakeNowButtonText>
          </SecondaryButton>
        </ButtonsDiv>
        <div id='home-section-2'>
          <Sec2TitleBox>
            <div>Farm NFTs in multiple ways</div>
            <div style={{ paddingTop: '20px' }}>
              <Line style={{
                width: '30px',
                background: '#B8C00D 0% 0% no-repeat padding-box',
              }} />
            </div>
          </Sec2TitleBox>
          <Sec2Cards>
            <NavCard>
              <HalfLine style={{
                background: '#AE32AA 0% 0% no-repeat padding-box',
                width: '330px',
                height: '5px',
              }} />
              <NavCardImg src={gravesLogo} alt='Graves Logo' style={{ paddingTop: '55px' }} />
              <NavCardTitleText>
                Graves
              </NavCardTitleText>
              <NavCardSubText>
                Create NFTs from the dead tokens lingering in your wallet
              </NavCardSubText>
              <NavCardText>
                Unlock graves using rugged tokens in your wallet to earn NFTs on top of regular ZMBE rewards
              </NavCardText>
              <NavCardFooter>
                <NavCardFooterItem onClick={() => {
                  history.push('/graves')
                }}>
                  <text style={{ paddingRight: '15px', color: '#AE32AA' }}>
                    enter graves
                  </text>
                  <img src={gravesarrow} alt='Grave Card Arrow' />
                </NavCardFooterItem>
              </NavCardFooter>
            </NavCard>
            <div style={{ paddingLeft: '60px', paddingRight: '60px' }}>
              <NavCard>
                <HalfLine style={{
                  background: '#4B7BDC 0% 0% no-repeat padding-box',
                  width: '330px',
                  height: '5px',
                }} />
                <NavCardImg src={tombsLogo} alt='Tombs Logo' style={{ paddingTop: '55px' }} />
                <NavCardTitleText>
                  Tombs
                </NavCardTitleText>
                <NavCardSubText>
                  Boost NFT rarity by providing liquidity
                </NavCardSubText>
                <NavCardText>
                  Roll for NFTs of varying rarity while earning ZMBE by staking LP tokens. Increase your odds by
                  increasing your stake in the tombs
                </NavCardText>
                <NavCardFooter>
                  <NavCardFooterItem onClick={() => {
                    history.push('/tombs')
                  }}>
                    <text style={{ paddingRight: '15px', color: '#4B7BDC' }}>
                      enter tombs
                    </text>
                    <img src={tombsarrow} alt='Tomb Card Arrow' />
                  </NavCardFooterItem>
                </NavCardFooter>
              </NavCard>
            </div>
            <NavCard>
              <HalfLine style={{
                background: '#30C00D 0% 0% no-repeat padding-box',
                width: '330px',
                height: '5px',
              }} />
              <NavCardImg src={spawningPoolsLogo} alt='Spawning Pools Logo' style={{ paddingTop: '55px' }} />
              <NavCardTitleText>
                Spawning Pools
              </NavCardTitleText>
              <NavCardSubText>
                Earn NFTs and returns in partnered project tokens
              </NavCardSubText>
              <NavCardText>
                Farm NFTs by staking ZMBE, while earning rewards in tokens from RugZombie partners
              </NavCardText>
              <NavCardFooter>
                <NavCardFooterItem onClick={() => {
                  history.push('/spawning_pools')
                }}>
                  <text style={{ paddingRight: '15px', color: '#30C00D' }}>
                    enter spawning pools
                  </text>
                  <img src={sparrow} alt='Spawning Pool Card Arrow' />
                </NavCardFooterItem>
              </NavCardFooter>
            </NavCard>
          </Sec2Cards>
        </div>
        <div id='home-section-3'>
          <S3Div>
            <S3TitleText>
              How does RugZombie work
            </S3TitleText>
            <div style={{ paddingTop: '20px' }}>
              <Line style={{
                width: '30px',
                background: '#B8C00D 0% 0% no-repeat padding-box',
              }} />
            </div>
            <div style={{paddingTop: '85px'}}/>
            <TutorialDiv >
              <div style={{paddingLeft: '25px'}}>
                <PlusIcon />
              </div>
              <TutorialTitleText>
                Use your ZMBE, LP tokens and dead tokens to earn NFTs and ZMBE rewards.
              </TutorialTitleText>
            </TutorialDiv>
            <div style={{paddingTop: '20px'}}/>
            <TutorialDiv >
              <div style={{paddingLeft: '25px'}}>
                <PlusIcon />
              </div>
              <TutorialTitleText>
                Play and win assets in a variety of NFT powered games
              </TutorialTitleText>
            </TutorialDiv>
            <div style={{paddingTop: '20px'}}/>
            <TutorialDiv >
              <div style={{paddingLeft: '25px'}}>
                <PlusIcon />
              </div>
              <TutorialTitleText>
                Earn passive income holding your NFTs
              </TutorialTitleText>
            </TutorialDiv>
            <div style={{paddingTop: '20px'}}/>
            <TutorialDiv >
              <div style={{paddingLeft: '25px'}}>
                <PlusIcon />
              </div>
              <TutorialTitleText>
                Venture into the catacombs...
              </TutorialTitleText>
            </TutorialDiv>
          </S3Div>
          <div id='footer-img' />
        </div>
        <div id='home-footer'>
          yo
        </div>
      </TopMenu>
    </>
  )
}

export default Home
