/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import styled from 'styled-components'
import Top from './components/Top'
import Bottom from './components/Bottom'

const GraveCard = styled.div<{ open: boolean }>`
  width: 100%;
  min-width: 260px;
  min-height: 130px;
  background-color: #151E21;
  border-radius: 10px;
  border: ${props => (props.open ? '2px solid #AE32AA' : '2px solid #151E21')};
  padding: 20px;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
`;

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
