import { StatsD } from "node-statsd";
import { config } from "dotenv";

config();

const environment = process.env.NODE_ENV;
const graphite = process.env.GRAPHITE_HOST;

const noopMetrics = {
  increment() { },
  timing() { },
};

const metrics =
  graphite == null
    ? noopMetrics
    : new StatsD({
      host: graphite,
      port: 8125,
      prefix: `${environment}.dino.`,
    });

export default metrics;
