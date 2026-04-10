const express = require('express')
const session = require("express-session")
const crypto = require('crypto')
const { createRemoteJWKSet, jwtVerify } = require('jose')
const app = express()
const metrics = require("./metrics.js");
const { config } = require("dotenv");

// load environment variables
config();

const {
  HACKCLUB_CLIENT_ID,
  HACKCLUB_CLIENT_SECRET,
  HACKCLUB_REDIRECT_URI,
  HACKCLUB_AUTH_DISCOVERY_URL = "https://auth.hackclub.com/.well-known/openid-configuration",
  PASSPORT_SESSION_SECRET,
  PORT = 3000,
} = process.env

if (!HACKCLUB_CLIENT_ID) throw new Error("HACKCLUB_CLIENT_ID is not configured")
if (!HACKCLUB_CLIENT_SECRET) throw new Error("HACKCLUB_CLIENT_SECRET is not configured")
if (!HACKCLUB_REDIRECT_URI) throw new Error("HACKCLUB_REDIRECT_URI is not configured")
if (!PASSPORT_SESSION_SECRET) throw new Error("PASSPORT_SESSION_SECRET is not configured")

const SCOPES = ["openid", "profile", "email", "slack_id", "verification_status"]
const WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/507705/odyc4wo/'

let discoveryPromise

async function getDiscovery() {
  if (!discoveryPromise) {
    discoveryPromise = fetch(HACKCLUB_AUTH_DISCOVERY_URL).then(async (res) => {
      if (!res.ok) {
        throw new Error(`Failed to load discovery document: ${res.status}`)
      }

      return res.json()
    })
  }

  return discoveryPromise
}

async function exchangeCodeForTokens({ code, redirectUri }) {
  const discovery = await getDiscovery()
  const response = await fetch(discovery.token_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: HACKCLUB_CLIENT_ID,
      client_secret: HACKCLUB_CLIENT_SECRET,
      redirect_uri: redirectUri,
      code,
      grant_type: 'authorization_code',
    }),
  })

  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.status}`)
  }

  return response.json()
}

async function verifyIdentityToken(idToken) {
  const discovery = await getDiscovery()
  const jwksUrl = discovery.jwks_uri || 'https://auth.hackclub.com/oauth/discovery/keys'
  const jwks = createRemoteJWKSet(new URL(jwksUrl))

  const { payload } = await jwtVerify(idToken, jwks, {
    issuer: 'https://auth.hackclub.com',
    audience: HACKCLUB_CLIENT_ID,
  })

  return payload
}

async function fetchUserInfo(accessToken) {
  const discovery = await getDiscovery()
  if (!discovery.userinfo_endpoint) return {}

  const response = await fetch(discovery.userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Userinfo request failed: ${response.status}`)
  }

  return response.json()
}

app.use(session({
  secret: PASSPORT_SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(require('body-parser').urlencoded({ extended: true }))

app.get("/failed-hackclub-auth", (req, res) => {
  metrics.increment("errors.hackclub_auth", 1);
  return res.status(500).send("Hack Club authentication failed")
})

app.get(
  '/update-github-url',
  async (req, res) => {
    try {
      const github = req.query.state
      if (!github) {
        return res.status(400).send('Missing GitHub state')
      }

      req.session.github = github
      req.session.oidcState = crypto.randomBytes(16).toString('hex')

      const discovery = await getDiscovery()
      const authorizeUrl = new URL(discovery.authorization_endpoint)
      authorizeUrl.searchParams.set('client_id', HACKCLUB_CLIENT_ID)
      authorizeUrl.searchParams.set('redirect_uri', HACKCLUB_REDIRECT_URI)
      authorizeUrl.searchParams.set('response_type', 'code')
      authorizeUrl.searchParams.set('scope', SCOPES.join(' '))
      authorizeUrl.searchParams.set('state', req.session.oidcState)

      return res.redirect(302, authorizeUrl.toString())
    } catch (error) {
      console.error(error)
      metrics.increment("errors.hackclub_auth", 1);
      return res.redirect(302, "/failed-hackclub-auth")
    }
  }
)

app.get('/oauth/callback', async (req, res) => {
  try {
    const { code, state } = req.query
    if (!code || !state) {
      throw new Error('Missing code or state')
    }

    if (!req.session.oidcState || req.session.oidcState !== state) {
      throw new Error('Invalid OIDC state')
    }

    const tokens = await exchangeCodeForTokens({
      code,
      redirectUri: HACKCLUB_REDIRECT_URI,
    })

    const verifiedClaims = await verifyIdentityToken(tokens.id_token)
    const userInfo = await fetchUserInfo(tokens.access_token)
    const claims = { ...verifiedClaims, ...userInfo }
    const slackId = claims.slack_id || claims.sub

    if (!slackId) {
      throw new Error('Missing slack_id claim')
    }

    if (!req.session.github) {
      throw new Error('Missing GitHub state in session')
    }

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slack: slackId,
        github: req.session.github,
        name: claims.name,
        email: claims.email,
        verification_status: claims.verification_status,
        ysws_eligible: claims.ysws_eligible,
      }),
    })

    metrics.increment("success.hackclub_auth", 1);
    req.session.github = null
    req.session.oidcState = null

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
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(payload, '*')
          }
        } catch (err) {}

        setTimeout(function () {
          window.close()
          document.body.innerHTML = '<p>Sign-in complete. You can close this tab and return to the guide.</p>'
        }, 200)
      })()
    </script>
  </body>
</html>`

    return res.status(200).type('html').send(bridgeHtml)
  } catch (error) {
    console.error(error)
    metrics.increment("errors.hackclub_auth", 1);
    return res.redirect(302, "/failed-hackclub-auth")
  }
})

app.listen(PORT, server => console.log('server is running on port', PORT))
