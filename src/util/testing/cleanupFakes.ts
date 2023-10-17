export function cleanupFakes(fakes: Record<string, any>) {
  for (const fake of Object.values(fakes)) {
    fake.resetHistory();
  }
}
