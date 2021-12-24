/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { useMatchBreakpoints } from '@rug-zombie-libs/uikit'
import styled from 'styled-components'

interface VideoProps {
  path: string;
}

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px 20px 0px 0px;
`

const PreviewVideo: React.FC<VideoProps> = ({ path }) => {
  const { isLg, isXl } = useMatchBreakpoints()
  const isDesktop = isLg || isXl

  const maxMobileHeight = 280
  const maxMobileWidth = 260
  return isDesktop ? (
    <StyledVideo autoPlay controls={false} loop muted>
      <source src={path} type='video/webm' />
    </StyledVideo>
  ) : (
    // eslint-disable-next-line
    <div dangerouslySetInnerHTML={{
      __html: `
                <video  autoPlay loop muted style='max-height: ${maxMobileHeight}px; max-width: ${maxMobileWidth}px'>
                  <source src='${path}' type='video/webm' />
                </video>
                `,
    }} />
  )
}

export default PreviewVideo
