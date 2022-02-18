import instabuys from 'config/constants/instabuys'

describe('Config instabuys', () => {
  it.each(instabuys.map((instabuy) => instabuy.id))('Instabuy #%d has a unique identifier', (id) => {
    const instabuysWithId = instabuys.filter((instabuy) => instabuy.id === id)
    expect(instabuysWithId).toHaveLength(1)
  })
})
