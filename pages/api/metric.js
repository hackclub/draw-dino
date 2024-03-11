import metrics from "../../metrics";

export default async function sendMetric(req, res) {
  const { metric } = req.body;

  if (metric.type === "increment") {
    metrics.increment(metric.key, metric.value);
  } else if (metrics.type === "timing") {
    metrics.timing(metrics.key, metrics.value);
  }
  res.send("Sent");
}
