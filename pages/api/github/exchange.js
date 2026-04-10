const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'
const GITHUB_USER_URL = 'https://api.github.com/user'

export default async function githubExchange(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not supported' })
    }

    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
    const clientSecret = process.env.GITHUB_CLIENT_SECRET

    if (!clientId || !clientSecret) {
        return res.status(500).json({ error: 'GitHub OAuth is not configured' })
    }

    const { code, redirectUri } = req.body || {}

    if (!code) {
        return res.status(400).json({ error: 'Missing code' })
    }

    try {
        const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code,
                redirect_uri: redirectUri,
            }),
        })

        const tokenPayload = await tokenResponse.json()

        if (!tokenResponse.ok || !tokenPayload.access_token) {
            return res.status(400).json({
                error: tokenPayload.error_description || 'Token exchange failed',
            })
        }

        const userResponse = await fetch(GITHUB_USER_URL, {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${tokenPayload.access_token}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
        })

        const userPayload = await userResponse.json()

        if (!userResponse.ok || !userPayload.login) {
            return res.status(400).json({
                error: userPayload.message || 'Failed to fetch GitHub user',
            })
        }

        return res.status(200).json({ username: userPayload.login })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'GitHub exchange request failed' })
    }
}
