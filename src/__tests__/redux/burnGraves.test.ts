import burnGraves from 'redux/burnGraves';

describe('Config burnGraves', () => {
  it.each(burnGraves.map((burnGrave) => burnGrave.id))(
    'BurnGrave #%d has a unique identifier',
    (id) => {
      const burnGravesWithId = burnGraves
        .filter((burnGrave) => burnGrave.id === id);
      expect(burnGravesWithId).toHaveLength(1);
    }
  );
});
