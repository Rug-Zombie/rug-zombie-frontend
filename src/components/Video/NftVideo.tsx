/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'

interface VideoProps {
  path: string
}

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 5px 15px 20px 0px #000000;
`

const StyledSmallVideo = styled.video`
  max-width: 100px;
  min-width: 70px;
  width: 100%;
  padding-left: 4px;
  padding-right: 4px;
  object-fit: cover;
  border-radius: 16px;
`

export const PreviewVideo: React.FC<VideoProps> = ({ path }) => {
  return (
    <StyledVideo autoPlay controls={false} loop muted>
      <source src={path} type="video/webm" />
    </StyledVideo>
  )
}

export const SmallPreviewVideo: React.FC<VideoProps> = ({ path }) => {
  return (
    <StyledSmallVideo autoPlay controls={false} loop muted>
      <source src={path} type="video/webm" />
    </StyledSmallVideo>
  )
}
