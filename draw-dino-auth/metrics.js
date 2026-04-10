const { StatsD } = require('node-statsd')
const { config } = require('dotenv')

config()

const environment = process.env.NODE_ENV
const graphite = process.env.GRAPHITE_HOST

const noopMetrics = {
    increment() { },
    timing() { },
}

if (!graphite) {
    module.exports = noopMetrics
} else {
    module.exports = new StatsD({
        host: graphite,
        port: 8125,
        prefix: `${environment}.dino.`,
    })
}
