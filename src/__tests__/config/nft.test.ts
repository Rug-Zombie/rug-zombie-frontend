import nfts from 'redux/nfts'

describe('Config NFTs', () => {
  it.each(nfts.map((nft) => nft.id))('NFT #%d has a unique identifier', (identifier) => {
    const duplicates = nfts.filter((n) => identifier === n.id)
    expect(duplicates).toHaveLength(1)
  })
})
