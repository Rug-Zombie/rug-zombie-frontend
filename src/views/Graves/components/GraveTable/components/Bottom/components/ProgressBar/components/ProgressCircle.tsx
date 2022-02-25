import React from 'react'

interface SvgProps {
  active: boolean
  step: number
}

const ProgressCircle: React.FC<SvgProps> = ({ step, active }) => {
  const border = active ? '#AE32AA' : '#0D1417'
  const textColor = active ? 'white' : '#6B7682'
  return (
    <div>
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <circle fill="#151E21" stroke={border} strokeMiterlimit="10" strokeWidth="2px" cx="50%" cy="50%" r="15" />
        <text x="50%" y="50%" fill={textColor} dominantBaseline="middle" textAnchor="middle">
          {step}
        </text>
      </svg>
    </div>
  )
}

export default ProgressCircle
