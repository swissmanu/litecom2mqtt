import http from 'node:http';
import { Device, Zone } from '../litecom/interrogateLitecomSystem';

/**
 * Runs a simple HTTP server that delivers a Graphviz representation of an interrogated Litecom system.
 */
export function createLitecomGraphvizServer(
    zones: Zone[],
    groups: Zone[],
    rooms: Zone[],
    devices: Device[],
    port = 3000,
) {
    const dotServer = http.createServer((req, res) => {
        const dot = `
    digraph litecom {
        fontname="Helvetica,Arial,sans-serif"
        graph [
            label = "Litecom System Interrogation Result"
            layout = dot
        ]
        ${[...zones, ...groups, ...rooms]
            .reduce<string[]>((acc, x) => {
                acc.push(`
                "${x.zone.id}" [
                    label = "${x.zone.name}\\n${x.zone.id}\\n${x.lighting ? '💡 ' : ''}${x.blinds ? '🪟 ' : ''}${
                        x.slats ? '🕶️ ' : ''
                    }${x.scenes ? '🎬' : ''}"
                ]
            `);

                if (x.parentZoneId) {
                    acc.push(`"${x.parentZoneId}" -> "${x.zone.id}";`);
                }
                return acc;
            }, [])
            .join('\n')}
        ${devices
            .reduce<string[]>((acc, x) => {
                acc.push(`
                "${x.device.id}" [
                    label = "${x.device.name}\\n${x.device.id}\\n${x.lighting ? '💡 ' : ''}${x.blinds ? '🪟 ' : ''}${
                        x.slats ? '🕶️ ' : ''
                    }${x.scenes ? '🎬' : ''}"
                ]
            `);

                if (x.parentZoneId) {
                    acc.push(`"${x.parentZoneId}" -> "${x.device.id}";`);
                }
                return acc;
            }, [])
            .join('\n')}
    }
        `;
        res.writeHead(200, 'Content-Type: text/plain');
        res.end(dot);
    });
    dotServer.listen(port, () => 'Dot Server running');
}
