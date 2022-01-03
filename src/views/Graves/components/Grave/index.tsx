/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import styled from 'styled-components'
import downpointer from 'images/FullDownPointer.png'
import GraveItem, { GraveItemType } from './components/Top/GraveItem'
import { graveByPid } from '../../../../redux/get'
import { Token } from '../../../../config/constants/types'
import tokens from '../../../../config/constants/tokens'
import Top from './components/Top'
import GraveCard from './components/GraveCard'
import Bottom from './components/Bottom'


interface GraveProps {
  pid: number
}

const Grave: React.FC<GraveProps> = ({ pid }) => {
  const [open, setOpen] = useState(false)

  return (
    <GraveCard open={open}>
      <Top pid={pid} open={open} setOpen={setOpen} />
      {open ? <Bottom pid={pid}/> : null}
    </GraveCard>
  )
}

export default Grave
