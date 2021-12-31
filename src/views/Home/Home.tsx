import React, { useEffect, useState } from 'react'
import './Home.Styles.css'
import styled from 'styled-components'
import numeral from 'numeral'
import spawningPoolsLogo from 'images/menu/SpawningPools.svg'
import tombsLogo from 'images/menu/Tombs.svg'
import gravesLogo from 'images/menu/Graves.svg'
import { useHistory } from 'react-router'
import { Redirect } from 'react-router-dom'
import TopMenu from '../../components/TopMenu'
import { useMultiCall, useZombie } from '../../hooks/useContract'
import { initialSpawningPoolData, initialTombData } from '../../redux/fetch'
import { bnbPriceUsd, drFrankensteinZombieBalance, spawningPools, tombs, zombiePriceUsd } from '../../redux/get'
import { BIG_ZERO } from '../../utils/bigNumber'
import { getBalanceAmount } from '../../utils/formatBalance'
import { PrimaryButton, PrimaryButtonText, SecondaryButton, SecondaryButtonText } from '../../components/Buttons'
import tokens from '../../config/constants/tokens'
import { getAddress } from '../../utils/addressHelpers'

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

const NavCardText = styled.div`
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

const Home: React.FC<HomeProps> = ({ modalObj }) => {
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
            <PrimaryButton onClick={() => { window.location.href = `https://swap.rugzombie.io/swap?outputCurrency=${getAddress(tokens.zmbe.address)}` }}>
              <PrimaryButtonText>
                Buy $ZMBE
              </PrimaryButtonText>
            </PrimaryButton>
          <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
            <PrimaryButton onClick={() => {
              history.push('/graveyard')
            }}>
              <PrimaryButtonText>
                View NFT&apos;s
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
            <div>Earn NFTs in multiple ways</div>
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
              <NavCardText>
                Graves
              </NavCardText>
            </NavCard>
            <div style={{ paddingLeft: '60px', paddingRight: '60px' }}>
              <NavCard>
                <HalfLine style={{
                  background: '#4B7BDC 0% 0% no-repeat padding-box',
                  width: '330px',
                  height: '5px',
                }} />
                <NavCardImg src={tombsLogo} alt='Tombs Logo' style={{ paddingTop: '55px' }} />
                <NavCardText>
                  Tombs
                </NavCardText>
              </NavCard>
            </div>

            <NavCard>
              <HalfLine style={{
                background: '#30C00D 0% 0% no-repeat padding-box',
                width: '330px',
                height: '5px',
              }} />
              <NavCardImg src={spawningPoolsLogo} alt='Spawning Pools Logo' style={{ paddingTop: '55px' }} />
              <NavCardText>
                Spawning Pools
              </NavCardText>
            </NavCard>
          </Sec2Cards>
        </div>

      </TopMenu>
    </>
  )
}

export default Home
