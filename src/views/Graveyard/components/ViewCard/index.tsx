import React from 'react'
import styled from 'styled-components'
import { Button, Card, CardFooter, Flex, useModal } from '@rug-zombie-libs/uikit'
import Video from '../../../../components/Video'
import TransferNftModal from '../TransferNftModal'
import { useGetNftById } from '../../../../state/nfts/hooks'

const StyleDetails = styled.div`
  display: flex;
  justify-content: center;
`

interface ViewCardProps {
  id: number
  nftId: number
}

const ViewCard: React.FC<ViewCardProps> = ({ id, nftId }: ViewCardProps) => {
  const {
    path,
    type,
    userInfo: { ownedIds },
  } = useGetNftById(id)
  const isOwned = ownedIds.length > 0

  const [onPresentTransferModal] = useModal(<TransferNftModal id={id} tokenId={nftId} />)

  return (
    <div>
      <Card className={isOwned ? 'card-collectibles' : 'card-active'}>
        <Flex justifyContent="center" paddingTop="5%" height="100%" style={{ aspectRatio: '1/1' }}>
          {type === 'image' ? (
            <img src={path} alt="test" style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain' }} />
          ) : (
            <Video path={path} />
          )}
        </Flex>
        <CardFooter>
          <StyleDetails>Rarity: {nftId}</StyleDetails>

          <Button width="100%" variant="secondary" mt="24px" onClick={onPresentTransferModal}>
            Transfer
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ViewCard
