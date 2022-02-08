import React, { useCallback, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { ToastProps, types } from './types'

const colorMap = {
  [types.GRAVES]: '#AE32AA',
  [types.TOMBS]: '#4B7BDC',
  [types.DEFAULT]: '#B8C00D',
  [types.INFO]: 'yellow',
  [types.DANGER]: 'red',
  [types.WARNING]: 'orange',
}

const StyledToast = styled.div`
  right: 16px;
  position: fixed;
  max-width: calc(100% - 32px);
  transition: all 250ms ease-in;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 400px;
  }
`

const CustomToast = styled.div<{ border: string }>`
  background-color: #151E21;
  border-radius: 10px;
  border: ${props => `2px solid ${props.border}`};
  padding: 10px;
  height: 100%;
`

const Title = styled.text`
  text-align: left;
  font: normal normal normal 20px/36px Poppins;
  letter-spacing: 0px;
  font-weight: bolder;
`

const SubTitle = styled.text`
  text-align: left;
  font: normal normal normal 16px/36px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
`

const Toast: React.FC<ToastProps> = ({ toast, onRemove, style, ttl, ...props }) => {
  const timer = useRef<number>()
  const ref = useRef(null)
  const removeHandler = useRef(onRemove)
  const { id, title, description, type } = toast

  const handleRemove = useCallback(() => removeHandler.current(id), [id, removeHandler])

  const handleMouseEnter = () => {
    clearTimeout(timer.current)
  }

  const handleMouseLeave = () => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = window.setTimeout(() => {
      handleRemove()
    }, ttl)
  }

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = window.setTimeout(() => {
      handleRemove()
    }, ttl)

    return () => {
      clearTimeout(timer.current)
    }
  }, [timer, ttl, handleRemove])
  const color = colorMap[type]
  return (
    <CSSTransition nodeRef={ref} timeout={250} style={style} {...props}>
      <StyledToast ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <CustomToast border={color || '#B8C00D'}>
          <Title style={{ color: color || '#B8C00D' }}>{title}</Title>
          <br/>
          <SubTitle>{description}</SubTitle>
        </CustomToast>
      </StyledToast>
    </CSSTransition>
  )
}

export default Toast
