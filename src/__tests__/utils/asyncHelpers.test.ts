import { invokeAfter, retry } from 'utils/asyncHelpers'

afterAll(() => jest.useRealTimers())

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

describe('invokeAfter', () => {
  it('invokes call immediately when delay 0', () => {
    expect(invokeAfter(() => 2, 0)).resolves.toBe(2)
    expect(setTimeout).not.toHaveBeenCalled()
  })
  it('delays invocation when delay positive', () => {
    expect(invokeAfter(() => Promise.resolve(2), 100)).resolves.toBe(2)
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100)
  })
})

describe('retry', () => {
  it('returns immediately if first attempt successful', () => {
    expect(retry(jest.fn().mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValueOnce(3))).resolves.toBe(1)
  })
  it('returns second result if first attempt failed', () => {
    expect(retry(jest.fn().mockRejectedValueOnce(1).mockReturnValueOnce(2).mockReturnValueOnce(3))).resolves.toBe(2)
  })
  it('returns third result if first two attempts fail', () => {
    expect(retry(jest.fn().mockRejectedValueOnce(1).mockRejectedValueOnce(2).mockReturnValueOnce(3))).resolves.toBe(3)
  })
  it('throws exception if all attempts fail', () => {
    expect(retry(jest.fn().mockRejectedValueOnce(1).mockRejectedValueOnce(2).mockRejectedValueOnce(3))).rejects.toBe(3)
  })
  it('returns result of first successful call with custom retries', () => {
    expect(
      retry(
        jest
          .fn()
          .mockRejectedValueOnce(1)
          .mockRejectedValueOnce(2)
          .mockRejectedValueOnce(3)
          .mockRejectedValueOnce(4)
          .mockReturnValueOnce(5)
          .mockReturnValueOnce(6),
        6,
      ),
    ).resolves.toBe(5)
  })
  it('pauses [delay] millis between retry attempts', () => {
    expect(retry(jest.fn().mockRejectedValueOnce(1).mockRejectedValueOnce(2).mockReturnValueOnce(3), 3, 100))
      .resolves.toBe(3)
      .then(() => {
        expect(setTimeout).toHaveBeenCalledTimes(2)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100)
      })
  })
})
