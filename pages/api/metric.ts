import { NextApiRequest, NextApiResponse } from 'next'
import metrics from '../../metrics'

interface MetricRequest {
  type: string
  key: string
  value: number
}

export default async function sendMetric(
  req: NextApiRequest,
  res: NextApiResponse<string>
): Promise<void> {
  const metric: MetricRequest = req.body

  if (req.method !== 'POST') {
    return res.send('Method not supported')
  }

  if (metric.type === 'increment') {
    metrics.increment(metric.key, metric.value)
  } else if (metric.type === 'timing') {
    metrics.timing(metric.key, metric.value)
  }

  res.send('Sent')
}
