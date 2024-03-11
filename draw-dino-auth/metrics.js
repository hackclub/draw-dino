const { StatsD } = require("node-statsd");
const { config } = require("dotenv");

config();

const environment = process.env.NODE_ENV;
const graphite = process.env.GRAPHITE_HOST;

if (graphite == null) throw new Error("Graphite host is not configured");

const options = {
  host: graphite,
  port: 8125,
  prefix: `${environment}.dino`,
};

const metrics = new StatsD(options);

module.exports = metrics;
