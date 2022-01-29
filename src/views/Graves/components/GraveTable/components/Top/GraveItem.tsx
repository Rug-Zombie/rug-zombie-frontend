import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { formatDuration } from 'utils/timerHelpers'

export enum GraveItemType {
  Number,
  Money,
  Percentage,
  Duration,
  Text
}

interface GraveItemProps {
  label: string;
  unit?: string;
  value: number | string;
  type: GraveItemType;
}

const ItemText = styled.p`
  text-align: left;
  font: normal normal normal 12px/24px Poppins;
  color: #6B7682;
  padding: 0 15px 0 0;
`

const GraveItem: React.FC<GraveItemProps> = ({ label, value, type, unit }) => {
  let formattedValue
  switch (type) {
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
      if (typeof value === 'number')
        formattedValue = formatDuration(value)
      break
    case GraveItemType.Text:
      formattedValue = value
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
    marginRight: 'auto',
  }}>
    <ItemText>{label}</ItemText>
    <ItemText>{formattedValue}{unit ? ` ${unit}` : null}</ItemText>
  </div>
}

export default GraveItem