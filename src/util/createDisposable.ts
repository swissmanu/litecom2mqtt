export function createDisposable(
  dispose: Disposable[typeof Symbol.dispose],
): Disposable {
  return { [Symbol.dispose]: dispose };
}

export function createAsyncDisposable(
  dispose: AsyncDisposable[typeof Symbol.asyncDispose],
): AsyncDisposable {
  return { [Symbol.asyncDispose]: dispose };
}
