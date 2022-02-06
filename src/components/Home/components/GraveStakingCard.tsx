import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from '@rug-zombie-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import YouTube from 'react-youtube';


const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/zmbe-bg.png');
  background-size: 300px 300px;
  background-position-x: 100px;
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
  box-shadow: rgb(204 246 108) 0px 0px 20px;
`

const GraveStakingCard: React.FC = () => {
  const { t } = useTranslation()

  const _onReady = ({ target }) => {
    // access to player in all event handlers via event.target
    target.pauseVideo();
  }

  const opts = {
    width: '100%',

  };
  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {t('For Newcomers')}
        </Heading>


        <YouTube videoId="WFHuSIvC6cg" opts={opts} onReady={_onReady} />
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default GraveStakingCard
