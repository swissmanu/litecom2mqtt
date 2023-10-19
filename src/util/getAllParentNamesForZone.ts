import { ZoneWithoutAvailableServices } from "../litecom/interrogateLitecomSystem.ts";

/**
 * Looks up all parent zones for a given zone. Requires a `Map` with all known zones from a Litecom system
 * interrogation.
 *
 * @param zone
 * @param zoneById
 * @returns
 */
export function getAllParentsForZone(
  zone: ZoneWithoutAvailableServices,
  zoneById: ReadonlyMap<string, ZoneWithoutAvailableServices>,
): ReadonlyArray<ZoneWithoutAvailableServices> {
  return lookup(zone, zoneById);
}

function lookup(
  zone: ZoneWithoutAvailableServices,
  zoneById: ReadonlyMap<string, ZoneWithoutAvailableServices>,
  parents: ZoneWithoutAvailableServices[] = [],
): ZoneWithoutAvailableServices[] {
  if (zone.parentZoneId) {
    const parent = zoneById.get(zone.parentZoneId);
    if (parent) {
      return lookup(parent, zoneById, [parent, ...parents]);
    }
  }
  return parents;
}
