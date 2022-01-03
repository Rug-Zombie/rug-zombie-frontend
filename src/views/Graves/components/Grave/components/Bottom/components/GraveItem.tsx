import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { formatDuration } from '../../../../../../../utils/timerHelpers'

export enum GraveItemType {
  Number,
  Money,
  Percentage,
  Duration,
}

interface GraveItemProps {
  label: string;
  value: number;
  type: GraveItemType;
}

const ItemText = styled.text`
  text-align: left;
  font: normal normal normal 12px/24px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
`

const GraveItem: React.FC<GraveItemProps> = ({ label, value, type}) => {
  let formattedValue
  switch(type) {
    case GraveItemType.Number:
      formattedValue = numeral(value).format('(0.00 a)')
      break
    case GraveItemType.Money:
      formattedValue = numeral(value).format('$ (0.00 a)')
      break
    case GraveItemType.Percentage:
      formattedValue = numeral(value).format('% (0.00 a)')
      break
    case GraveItemType.Duration:
      formattedValue = formatDuration(value)
      break
    default:
      formattedValue = 'NAN'
      break
  }

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 'auto'
  }}>
    <ItemText>{label}</ItemText>
    <ItemText>{formattedValue}</ItemText>
  </div>
}

export default GraveItem