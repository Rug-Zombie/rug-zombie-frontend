import auctions from 'redux/auctions'

describe('Config auctions', () => {
  it.each(auctions.map((auction) => auction.id))('Auction #%d has a unique identifier', (id) => {
    const auctionsWithId = auctions.filter((auction) => auction.id === id)
    expect(auctionsWithId).toHaveLength(1)
  })
})
