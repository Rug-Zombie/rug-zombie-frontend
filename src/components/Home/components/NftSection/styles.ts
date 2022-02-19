import styled from 'styled-components'

export const NftCards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

export const NftCard = styled.div`
  width: 90vw;
  margin: 25px 17px 0 17px;
  min-width: 260px;
  max-width: 390px;
  background-color: #151e21;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const HalfLine = styled.div`
  border-radius: 0px 0px 5px 5px;
  margin: 0 auto;
  height: 5px;
  width: 80%;
  background-color: ${({ color }) => color};
`

export const NftCardImg = styled.img`
  max-height: 200px;
  padding-top: 55px;
`

export const NftCardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10%;
`

export const NftCardTitleText = styled.h3`
  text-align: center;
  font: normal normal 600 30px/30px Poppins;
  letter-spacing: 1.5px;
  color: #ffffff;
  padding-top: 20px;
`

export const NftCardSubText = styled.div`
  padding: 40px 0 20px 0;
  text-align: left;
  font: normal normal normal 20px/36px Poppins;
  color: #ffffff;
`

export const NftCardText = styled.text`
  text-align: left;
  font: normal normal normal 16px/30px Poppins;
  color: ${({ color }) => color || '#6B7682'};
`

export const NftCardFooter = styled.div`
  font: normal normal 300 16px/36px Poppins;
  align-self: flex-end;
  padding: 0 10% 40px 10%;
  margin-top: auto;
`

export const NftCardFooterAction = styled.div`
  text-align: right;
  &:hover {
    cursor: pointer;
  }
`
