import { Octokit } from '@octokit/core'
import { createAppAuth } from '@octokit/auth-app'

export async function inviteToDinoisseurTeam(
  username: string
): Promise<string | undefined> {
  const appId = process.env.GITHUB_APP_ID
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY
  const installationId = process.env.GITHUB_APP_INSTALLATION_ID

  if (!appId || !privateKey || !installationId) {
    console.error('GitHub App is not configured for team invites')
    return undefined
  }

  try {
    const appOctokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId,
        privateKey: privateKey.replace(/\\n/g, '\n'),
        installationId,
      },
    })

    const invite = await appOctokit.request(
      'PUT /orgs/{org}/teams/{team_slug}/memberships/{username}',
      {
        org: 'hackclub',
        team_slug: 'Dinoisseurs',
        username,
        role: 'member',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )

    return invite.data.state
  } catch (error) {
    console.error('Dinoisseur team invite failed', error)
    return undefined
  }
}
