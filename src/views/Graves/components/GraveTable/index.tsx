/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import styled from 'styled-components'
import Top from './components/Top'
import Bottom from './components/Bottom'
import { Grave } from '../../../../state/types'
import { getId } from '../../../../utils'

const GraveCard = styled.div<{ open: boolean }>`
  width: 100%;
  min-width: 260px;
  min-height: 130px;
  background-color: #151E21;
  border-radius: 10px;
  border: ${props => (props.open ? '2px solid #AE32AA' : '2px solid #151E21')};
  padding: 20px;
  margin: 0 0 0 0;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Shadow = styled.div`
  width: 100%;
  height: 40px;
  background: #000000 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 0.5;
  filter: blur(10px);
  position: relative;
  bottom: 35px;
  margin-bottom: -15px;
  z-index: -1;
`

interface GraveProps {
  grave: Grave
}

const GraveTable: React.FC<GraveProps> = ({ grave }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
    <GraveCard open={open}>
      <Top grave={grave} open={open} setOpen={setOpen} />
      {open ? <Bottom grave={grave}/> : null}
    </GraveCard>
      <Shadow/>
    </>

  )
}

export default GraveTable
