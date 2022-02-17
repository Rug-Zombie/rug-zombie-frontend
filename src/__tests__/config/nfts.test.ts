import nfts from 'config/constants/nfts'

describe('Config NFTs', () => {
  it.each(nfts.map((nft) => nft.id))(
    'NFT #%d has a unique identifier',
    (identifier) => {
      const nftsWithId = nfts.filter((n) => identifier === n.id);
      expect(nftsWithId).toHaveLength(1);
    },
  );
  it.each(nfts.map((nft) => nft.address[56]))(
    'NFT %s has a unique address',
    (address) => {
      const nftsWithAddress = nfts.filter((n) => n.address[56] === address);
      expect(nftsWithAddress).toHaveLength(1);
    },
  );
});
