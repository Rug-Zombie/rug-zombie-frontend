import styled from 'styled-components'

export const PrimaryButton = styled.button`
  width: 140px;
  height: 50px;
  background: #b8c00d 0% 0% no-repeat padding-box;
  border-radius: 30px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border: none;
`

export const PrimaryButtonText = styled.div`
  text-align: center;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: #010202;
  font-weight: bold;
`

export const SecondaryButton = styled.button`
  width: 140px;
  height: 50px;
  border: 2px solid #b8c00d;
  border-radius: 30px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background: none;
  
  &:hover {
    cursor: pointer;
  }
`

export const SecondaryButtonText = styled.div`
  text-align: center;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: white;
  font-weight: bold;
  opacity: 1;
`
