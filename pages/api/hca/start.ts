import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

import {
  HCA_SCOPES,
  HCA_STATE_COOKIE,
  HCA_STATE_TTL_SECONDS,
  createSignedStateCookie,
  getDiscovery,
  getStateSecret,
  serializeCookie,
} from './_lib'

export default async function hcaStart(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).send('Method not supported')
    return
  }

  const github = req.query.state
  if (!github || typeof github !== 'string') {
    res.status(400).send('Missing GitHub state')
    return
  }

  const {
    HACKCLUB_CLIENT_ID: clientId,
    HACKCLUB_REDIRECT_URI: redirectUri,
    NODE_ENV,
  } = process.env

  if (!clientId || !redirectUri) {
    res.status(500).send('Hack Club auth is not configured')
    return
  }

  const secret = getStateSecret()
  if (!secret) {
    res.status(500).send('HCA state secret is not configured')
    return
  }

  try {
    const oidcState = crypto.randomBytes(16).toString('hex')
    const token = createSignedStateCookie(
      {
        github,
        oidcState,
        createdAt: Date.now(),
      },
      secret
    )

    res.setHeader(
      'Set-Cookie',
      serializeCookie(HCA_STATE_COOKIE, token, {
        maxAge: HCA_STATE_TTL_SECONDS,
        path: '/api/hca',
        sameSite: 'Lax',
        httpOnly: true,
        secure: NODE_ENV === 'production',
      })
    )

    const discovery = await getDiscovery()
    const authorizeUrl = new URL(discovery.authorization_endpoint)
    authorizeUrl.searchParams.set('client_id', clientId)
    authorizeUrl.searchParams.set('redirect_uri', redirectUri)
    authorizeUrl.searchParams.set('response_type', 'code')
    authorizeUrl.searchParams.set('scope', HCA_SCOPES.join(' '))
    authorizeUrl.searchParams.set('state', oidcState)

    res.redirect(302, authorizeUrl.toString())
    return
  } catch (error) {
    console.error(error)
    res.status(500).send('Hack Club authentication failed')
    return
  }
}
