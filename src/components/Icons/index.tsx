import React from 'react';
import styled from 'styled-components'
import telegram from 'images/footer/Telegram.svg'
import twitter from 'images/footer/Twitter.svg'
import ListIcon from 'images/icons/ListIcon.png'
import IconView from 'images/icons/IconView.png'



const HorizontalLine = styled.div`
  width: 20px;
  height: 0px;
  border: 1px solid #b8c00d;
  opacity: 1;
`

const VerticalLine = styled.div`
  width: 0px;
  height: 21px;
  border: 1px solid #b8c00d;
  opacity: 1;
`


export const Normal = () => {
    return (
        <div>
            <img style={{ position: 'relative', bottom: '32px', left: '13px' }} src={IconView} alt="Icon View"/>
        </div>
    )
}

export const List = () => {
    return (
        <div>
            <img style={{ position: 'relative', bottom: '32px', left: '13px' }} src={ListIcon} alt="List Icon"/>
        </div>
    )
}

export const PlusIcon = () => {
  return (
    <div>
      <VerticalLine style={{ position: 'relative', left: '9px' }} />
      <HorizontalLine style={{ position: 'relative', bottom: '11px' }} />
    </div>
  )
}

export const MinusIcon = () => {
  return <HorizontalLine style={{ position: 'relative', top: '15px' }} />
}

export const TelegramIcon = () => {
  return (
    <div>
      <img style={{ position: 'relative', bottom: '32px', left: '13px' }} src={telegram} alt="Telegram Icon" />
    </div>
  )
}

export const TwitterIcon = () => {
  return (
    <div>
      <img style={{ position: 'relative', bottom: '32px', left: '13px' }} src={twitter} alt="Twitter Icon" />
    </div>
  )
}
