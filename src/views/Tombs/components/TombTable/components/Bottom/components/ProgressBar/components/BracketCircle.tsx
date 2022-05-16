import React from 'react'

interface SvgProps {
    active: boolean
    step: number
}

const BracketCircle: React.FC<SvgProps> = ({ step, active }) => {
    const border = active ? '#00fbff' : '#0D1417'
    const textColor = active ? 'white' : '#6B7682'
    const check = ['A', 'B', 'C']
    return (
        <div>
            <svg width="34" height="34" xmlns="http://www.w3.org/2000/svg">
                <circle fill="#151E21" stroke={border} strokeMiterlimit="10" strokeWidth="2px" cx="50%" cy="50%" r="12" />
                <text x="50%" y="50%" fill={textColor} dominantBaseline="middle" textAnchor="middle">
                    {check[step]}
                </text>
            </svg>
        </div>
    )
}

export default BracketCircle
