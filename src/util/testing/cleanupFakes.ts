import { sinon } from "../../deps.ts";

export function cleanupFakes(fakes: Record<string, sinon.SinonSpy>) {
  for (const fake of Object.values(fakes)) {
    fake.resetHistory();
  }
}
