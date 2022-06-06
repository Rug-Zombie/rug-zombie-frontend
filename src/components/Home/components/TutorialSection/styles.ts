import styled from 'styled-components'
import { PlusIcon, MinusIcon } from 'components/Icons'


export const TutorialItems = styled.div`
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
`


export const TutorialItem = styled.div`
  position: relative;
  width: 90vw;
  max-width: 850px;
  padding: 20px 30px;
  margin-bottom: 20px;
  border: 1px solid #162635;
  display: flex;
  justify-content: left;
  align-items: center;
  z-index: 1000;
  &:hover{
    cursor: pointer;
  }
`

export const TutorialItemSelected = styled.div`
  position: relative;
  width: 90vw;
  max-width: 850px;
  padding: 20px 30px;
  margin-bottom: 20px;
  border: 1px solid #30C00D;
  display: flex;
  justify-content: left;
  align-items: center;
  z-index: 1000;
  &:hover{
    cursor: pointer;
  }
`

export const TutorialItemIconPlus = styled(PlusIcon)`
  padding-left: 25px;
`

export const TutorialItemIconMinus = styled(MinusIcon)`
  padding-left: 25px;
`

export const TutorialItemText = styled.p`
  text-align: left;
  font: normal normal normal 18px/36px Poppins;
  color: #ffffff;
  padding-left: 25px;
`

export const TutorialItemTextSelected = styled.p`
  text-align: left;
  font: normal normal normal 18px/36px Poppins;
  color: #30C00D;
  padding-left: 25px;
`


export const TutorialSelected = styled.div`
  height: 10%;
  width: 100%;
  max-width: 850px;
  display: flex;
  justify-content: left;
  position: relative;
  z-index: 1000;
  &:hover {
    cursor: pointer;
  }
`

export const TutorialUnSelected = styled.div`
  width: 90vw;
  max-width: 850px;
  display: flex;
  justify-content: left;
  align-items: center;
  position: relative;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`

export const SubTitle = styled.small`
  font: normal normal normal 16px/30px Poppins;
  color: #939EB4;
`;


