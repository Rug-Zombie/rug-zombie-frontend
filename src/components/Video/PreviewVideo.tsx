/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
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
  return (
    <StyledVideo autoPlay controls={false} loop muted>
      <source src={path} type='video/webm' />
    </StyledVideo>
  )
}

export default PreviewVideo