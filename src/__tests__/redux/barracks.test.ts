import barracks from 'redux/barracks';

describe('Config barracks', () => {
  it.each(barracks.map((barrack) => barrack.id))(
    'Barrack #%d has a unique identifier',
    (id) => {
      const barracksWithId = barracks
        .filter((barrack) => barrack.id === id);
      expect(barracksWithId).toHaveLength(1);
    }
  );
});
