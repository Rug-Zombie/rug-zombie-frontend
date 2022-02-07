import React from 'react'
import numeral from 'numeral'

import { formatDuration } from '../../utils/timerHelpers'
import './CardItem.Styles.css'

export enum CardItemValueType {
  Number,
  Money,
  Percentage,
  Duration,
  Text,
}

const getFormattedValue = (value: string | number, valueType: CardItemValueType): string => {
  let formattedValue: string
  switch (valueType) {
    case CardItemValueType.Number:
      formattedValue = numeral(value).format('(0.00 a)')
      break
    case CardItemValueType.Money:
      formattedValue = numeral(value).format('$ (0.00 a)')
      break
    case CardItemValueType.Percentage:
      formattedValue = numeral(value).format('% (0.00 a)')
      break
    case CardItemValueType.Duration:
      if (typeof value === 'number') {
        return formatDuration(value)
      }
      break
    case CardItemValueType.Text:
      formattedValue = String(value)
      break
    default:
      formattedValue = 'NAN'
  }

  return formattedValue
}

interface Props {
  label: string
  unit?: string
  value: number | string
  highlightable?: boolean,
  isHighlighted?: (value: number | string) => boolean
  valueType?: CardItemValueType
  additionalHighlightClassNames?: string[]
}

const CardItem: React.FC<Props> = ({
    label,
    unit,
    value,
    highlightable = false,
    isHighlighted = (v) => v > 0,
    valueType = CardItemValueType.Text,
    additionalHighlightClassNames = [],
}) => {
  let valueClassNames = ['item-text']
  if (highlightable && isHighlighted(value)) {
    valueClassNames = valueClassNames.concat([ 'highlighted', ...(additionalHighlightClassNames || [])])
  }

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 'auto',
  }}>
    <p className='item-text'>{label}</p>
    <p className={valueClassNames.join(' ')}>{getFormattedValue(value, valueType)}{unit ? ` ${unit}` : null}</p>
  </div>
}

export default CardItem
