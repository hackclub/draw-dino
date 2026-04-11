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

export default async function hcaStart(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not supported')
  }

  const github = req.query.state
  if (!github || typeof github !== 'string') {
    return res.status(400).send('Missing GitHub state')
  }

  const {
    HACKCLUB_CLIENT_ID: clientId,
    HACKCLUB_REDIRECT_URI: redirectUri,
    NODE_ENV,
  } = process.env

  if (!clientId || !redirectUri) {
    return res.status(500).send('Hack Club auth is not configured')
  }

  const secret = getStateSecret()
  if (!secret) {
    return res.status(500).send('HCA state secret is not configured')
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

    return res.redirect(302, authorizeUrl.toString())
  } catch (error) {
    console.error(error)
    return res.status(500).send('Hack Club authentication failed')
  }
}
