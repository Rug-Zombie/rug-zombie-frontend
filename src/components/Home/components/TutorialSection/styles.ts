import styled from 'styled-components'
import { PlusIcon } from 'components/Icons'

export const TutorialItems = styled.div`
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
`

export const TutorialItem = styled.div`
  width: 850px;
  padding: 20px 30px;
  margin-bottom: 20px;
  border: 1px solid #162635;
  display: flex;
  align-items: center;
`

export const TutorialItemIcon = styled(PlusIcon)`
  padding-left: 25px;
`

export const TutorialItemText = styled.p`
  text-align: left;
  font: normal normal normal 18px/36px Poppins;
  color: #ffffff;
  padding-left: 25px;
`
