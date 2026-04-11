import {
  HCA_STATE_COOKIE,
  HCA_STATE_TTL_SECONDS,
  clearStateCookieHeader,
  exchangeCodeForTokens,
  fetchUserInfo,
  getStateSecret,
  parseJwtPayload,
  readCookie,
  verifySignedStateCookie,
} from './_lib'

const WEBHOOK_URL =
  process.env.WEBHOOK_URL ||
  'https://hooks.zapier.com/hooks/catch/507705/odyc4wo/'

function isWebhookRequired() {
  // Webhook failures should not block auth unless explicitly required.
  return process.env.HCA_REQUIRE_WEBHOOK === '1'
}

function authFailure(req, res, message, error) {
  if (error) {
    console.error(error)
  } else {
    console.error(new Error(message))
  }

  res.setHeader('Set-Cookie', clearStateCookieHeader())
  res.redirect(302, '/?hcaAuthError=1')
}

export default async function hcaCallback(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send('Method not supported')
    return
  }

  const { code, state } = req.query
  if (!code || !state || typeof code !== 'string' || typeof state !== 'string') {
    authFailure(req, res, 'Missing code or state')
    return
  }

  const secret = getStateSecret()
  if (!secret) {
    authFailure(req, res, 'HCA state secret is not configured')
    return
  }

  const token = readCookie(req, HCA_STATE_COOKIE)
  const savedState = verifySignedStateCookie(token, secret)

  if (!savedState) {
    authFailure(req, res, 'Missing or invalid auth state cookie')
    return
  }

  if (Date.now() - Number(savedState.createdAt) > HCA_STATE_TTL_SECONDS * 1000) {
    authFailure(req, res, 'Expired auth state cookie')
    return
  }

  if (savedState.oidcState !== state) {
    authFailure(req, res, 'Invalid OIDC state')
    return
  }

  if (!savedState.github) {
    authFailure(req, res, 'Missing GitHub state')
    return
  }

  if (!process.env.HACKCLUB_REDIRECT_URI) {
    authFailure(req, res, 'HACKCLUB_REDIRECT_URI is not configured')
    return
  }

  if (!process.env.HACKCLUB_CLIENT_ID || !process.env.HACKCLUB_CLIENT_SECRET) {
    authFailure(
      req,
      res,
      'Hack Club client credentials are not configured'
    )
    return
  }

  try {
    const tokens = await exchangeCodeForTokens({
      code,
      redirectUri: process.env.HACKCLUB_REDIRECT_URI,
    })

    const verifiedClaims = parseJwtPayload(tokens.id_token)
    const userInfo = await fetchUserInfo(tokens.access_token)
    const claims = { ...verifiedClaims, ...userInfo }
    const slackId = claims.slack_id || claims.sub

    if (!slackId) {
      throw new Error('Missing slack_id claim')
    }

    try {
      const zapierResponse = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slack: slackId,
          github: savedState.github,
          name: claims.name,
          email: claims.email,
          verification_status: claims.verification_status,
          ysws_eligible: claims.ysws_eligible,
        }),
      })

      if (!zapierResponse.ok) {
        const body = await zapierResponse.text().catch(() => '')
        const message = `Zapier webhook failed: ${zapierResponse.status}${body ? ` - ${body.slice(0, 200)}` : ''}`
        if (isWebhookRequired()) {
          throw new Error(message)
        }
        console.error(message)
      }
    } catch (webhookError) {
      if (isWebhookRequired()) {
        throw webhookError
      }
      console.error(webhookError)
    }

    res.setHeader('Set-Cookie', clearStateCookieHeader())

    const bridgeHtml = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hack Club Auth Success</title>
  </head>
  <body>
    <script>
      (function () {
        var payload = { type: 'hca-auth-success', at: Date.now() }

        try {
          localStorage.setItem('draw-dino:hca-auth-success', String(payload.at))
        } catch (err) {}

        try {
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(payload, '*')
            try {
              window.opener.focus()
            } catch (focusErr) {}
          }
        } catch (err) {}

        try {
          window.close()
        } catch (err) {}

        setTimeout(function () {
          window.close()
          document.body.innerHTML = '<p>Sign-in complete. You can close this tab and return to the guide.</p>'
        }, 150)
      })()
    </script>
  </body>
</html>`

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.status(200).send(bridgeHtml)
    return
  } catch (error) {
    authFailure(req, res, 'Hack Club authentication failed', error)
    return
  }
}
