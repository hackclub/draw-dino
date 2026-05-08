import crypto from 'crypto'
import { NextApiRequest } from 'next'

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

interface DiscoveryDocument {
  token_endpoint: string
  authorization_endpoint: string
  userinfo_endpoint?: string
}

let discoveryPromise: Promise<DiscoveryDocument> | null = null

export async function getDiscovery(): Promise<DiscoveryDocument> {
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

function base64UrlEncode(value: Buffer | string): string {
  const buffer = typeof value === 'string' ? Buffer.from(value) : value
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function base64UrlDecode(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padLength = (4 - (normalized.length % 4)) % 4
  const padded = normalized + '='.repeat(padLength)
  return Buffer.from(padded, 'base64').toString('utf8')
}

function signPayload(payload: string, secret: string): string {
  return base64UrlEncode(
    crypto.createHmac('sha256', secret).update(payload).digest()
  )
}

export function getStateSecret(): string | undefined {
  return (
    process.env.HCA_STATE_SECRET ||
    process.env.PASSPORT_SESSION_SECRET ||
    process.env.HACKCLUB_CLIENT_SECRET
  )
}

interface StateValue {
  github: string
  oidcState: string
  createdAt: number
}

export function createSignedStateCookie(value: StateValue, secret: string): string {
  const payload = base64UrlEncode(JSON.stringify(value))
  const signature = signPayload(payload, secret)
  return `${payload}.${signature}`
}

export function readCookie(req: NextApiRequest, name: string): string {
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

export function verifySignedStateCookie(token: string, secret: string): StateValue | null {
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

interface CookieOptions {
  maxAge?: number
  path?: string
  sameSite?: 'Strict' | 'Lax' | 'None'
  httpOnly?: boolean
  secure?: boolean
}

export function serializeCookie(name: string, value: string, options: CookieOptions = {}): string {
  const attrs = [`${name}=${encodeURIComponent(value)}`]

  if (options.maxAge != null) attrs.push(`Max-Age=${options.maxAge}`)
  if (options.path) attrs.push(`Path=${options.path}`)
  if (options.sameSite) attrs.push(`SameSite=${options.sameSite}`)
  if (options.httpOnly) attrs.push('HttpOnly')
  if (options.secure) attrs.push('Secure')

  return attrs.join('; ')
}

export function clearStateCookieHeader(): string {
  return serializeCookie(HCA_STATE_COOKIE, '', {
    maxAge: 0,
    path: '/api/hca',
    sameSite: 'Lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
}

interface TokenResponse {
  access_token: string
  id_token: string
  token_type: string
  expires_in: number
}

export async function exchangeCodeForTokens({ code, redirectUri }: { code: string; redirectUri: string }): Promise<TokenResponse> {
  const discovery = await getDiscovery()
  const response = await fetch(discovery.token_endpoint, {
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

export async function fetchUserInfo(accessToken: string): Promise<Record<string, any>> {
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

export function parseJwtPayload(token: string): Record<string, any> {
  if (!token || typeof token !== 'string') return {}

  const parts = token.split('.')
  if (parts.length < 2) return {}

  try {
    return JSON.parse(base64UrlDecode(parts[1]))
  } catch {
    return {}
  }
}
