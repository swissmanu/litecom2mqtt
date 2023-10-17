import * as sinon from "https://cdn.skypack.dev/sinon?dts";

export function cleanupFakes(fakes: Record<string, sinon.SinonSpy>) {
  for (const fake of Object.values(fakes)) {
    fake.resetHistory();
  }
}
