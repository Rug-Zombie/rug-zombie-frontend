/**
 * Invoke an operation after a specified delay.
 *
 * @param fn Callable to invoke
 * @param delay Delay in milliseconds
 * @return Value returned by call
 */
export const invokeAfter = <T>(fn: () => T | Promise<T>, delay: number): Promise<T> =>
  delay > 0
    ? new Promise((resolve) => setTimeout(() => Promise.resolve(fn()).then((result) => resolve(result)), delay))
    : Promise.resolve(fn())

/**
 * Attempt to invoke an operation, retrying up to a specified number of times upon failure.
 *
 * @param fn Callable to invoke
 * @param maxAttempts Maximum number of attempts permitted. Default 3
 * @param delay Delay between attempts in milliseconds. Default 0
 * @return Value returned by callable, if successful
 */
export const retry = async <T>(fn: () => T | Promise<T>, maxAttempts = 3, delay?: number): Promise<T> => {
  let lastError
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      let result
      if (attempt > 1 && delay) {
        // eslint-disable-next-line no-await-in-loop
        result = await invokeAfter(fn, delay)
      } else {
        // eslint-disable-next-line no-await-in-loop
        result = await fn()
      }

      return result
    } catch (e) {
      lastError = e
    }
  }

  throw lastError
}
