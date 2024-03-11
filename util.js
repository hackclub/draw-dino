export async function sendMetric(type, key, value) {
  const response = await fetch("/api/metric", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, key, value })
  });
  if (!response.ok) {
    throw Error("Failed to send metric");
  }
}
