import { LinkExternal } from '@rug-zombie-libs/uikit'
import React from 'react'
import styled from 'styled-components'
import { getBscScanLink } from 'utils'

const LinkContainer = styled.div`
  display: flex;
  align-items: flex-start;
`

interface Props {
  address: string
  linkText?: string
}

const ContractLink: React.FC<Props> = ({ address, linkText }) => {
  return (
    <LinkContainer>
      <LinkExternal href={getBscScanLink(address, 'address')}>{linkText || 'Contract'}</LinkExternal>
    </LinkContainer>
  )
}

export default ContractLink
