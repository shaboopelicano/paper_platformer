export default {
    duration: 1000,
    entities: [
        { x: 0, y: 0, w: 100, h: 100, color: 'red' },
        { x: 100, y: 100, w: 100, h: 100, color: 'green' },
        { x: 100, y: 100, w: 100, h: 100, color: 'yellow' }
    ],
    scripts: [
        { entity: 0, property: 'x', value: 100 },
        { entity: 1, property: 'y', value: 200 },
        { entity: 2, property: 'x', value: 200 },
        { entity: 2, property: 'y', value: 200 }
    ],
}