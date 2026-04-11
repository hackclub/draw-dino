import crypto from 'crypto'

const HCA_AUTH_DISCOVERY_URL =
  process.env.HACKCLUB_AUTH_DISCOVERY_URL ||
  'https://auth.hackclub.com/.well-known/openid-configuration'

export const HCA_STATE_COOKIE = 'draw_dino_hca_state'
export const HCA_STATE_TTL_SECONDS = 10 * 60
export const HCA_SCOPES = [
  'openid',
  'profile',
  'email',
  'slack_id',
  'verification_status',
]

let discoveryPromise

export async function getDiscovery() {
  if (!discoveryPromise) {
    discoveryPromise = fetch(HCA_AUTH_DISCOVERY_URL).then(async (res) => {
      if (!res.ok) {
        throw new Error(`Failed to load discovery document: ${res.status}`)
      }

      return res.json()
    })
  }

  return discoveryPromise
}

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padLength = (4 - (normalized.length % 4)) % 4
  const padded = normalized + '='.repeat(padLength)
  return Buffer.from(padded, 'base64').toString('utf8')
}

function signPayload(payload, secret) {
  return base64UrlEncode(
    crypto.createHmac('sha256', secret).update(payload).digest()
  )
}

export function getStateSecret() {
  return (
    process.env.HCA_STATE_SECRET ||
    process.env.PASSPORT_SESSION_SECRET ||
    process.env.HACKCLUB_CLIENT_SECRET
  )
}

export function createSignedStateCookie(value, secret) {
  const payload = base64UrlEncode(JSON.stringify(value))
  const signature = signPayload(payload, secret)
  return `${payload}.${signature}`
}

export function readCookie(req, name) {
  const header = req.headers.cookie
  if (!header) return ''

  const cookies = header.split(';')
  for (const cookie of cookies) {
    const [rawKey, ...rest] = cookie.trim().split('=')
    if (rawKey === name) {
      return decodeURIComponent(rest.join('='))
    }
  }

  return ''
}

export function verifySignedStateCookie(token, secret) {
  if (!token) return null

  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null

  const expected = signPayload(payload, secret)

  const expectedBuffer = Buffer.from(expected)
  const signatureBuffer = Buffer.from(signature)
  if (expectedBuffer.length !== signatureBuffer.length) return null
  if (!crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) return null

  try {
    return JSON.parse(base64UrlDecode(payload))
  } catch {
    return null
  }
}

export function serializeCookie(name, value, options = {}) {
  const attrs = [`${name}=${encodeURIComponent(value)}`]

  if (options.maxAge != null) attrs.push(`Max-Age=${options.maxAge}`)
  if (options.path) attrs.push(`Path=${options.path}`)
  if (options.sameSite) attrs.push(`SameSite=${options.sameSite}`)
  if (options.httpOnly) attrs.push('HttpOnly')
  if (options.secure) attrs.push('Secure')

  return attrs.join('; ')
}

export function clearStateCookieHeader() {
  return serializeCookie(HCA_STATE_COOKIE, '', {
    maxAge: 0,
    path: '/api/hca',
    sameSite: 'Lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
}

export async function exchangeCodeForTokens({ code, redirectUri }) {
  const { token_endpoint: tokenEndpoint } = await getDiscovery()
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.HACKCLUB_CLIENT_ID,
      client_secret: process.env.HACKCLUB_CLIENT_SECRET,
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

export async function fetchUserInfo(accessToken) {
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

export function parseJwtPayload(token) {
  if (!token || typeof token !== 'string') return {}

  const parts = token.split('.')
  if (parts.length < 2) return {}

  try {
    return JSON.parse(base64UrlDecode(parts[1]))
  } catch {
    return {}
  }
}
