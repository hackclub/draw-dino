import { useState, useEffect } from 'react'
import Scroll from 'react-scroll'

import Step from '../components/step'
import Meta from '../components/meta'
import Intro from '../components/intro'
import Slack from '../components/slack'
import Ending from '../components/ending'
import SketchEmbed from '../components/sketchEmbed'
import Split from '../components/split'
import Selectable from '../components/selectable'


const subtitleStyle = {
  fontStyle: 'italic',
  opacity: 0.6,
}

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
const GITHUB_SESSION_USERNAME_KEY = 'draw-dino:github-username'

export default () => {
  const [dinoName, setDinoName] = useState('')
  const [progress, setProgress] = useState(0)
  const [github, setGithub] = useState('github-user')
  const [inviteStatus, setInviteStatus] = useState('')
  const [showAuthToast, setShowAuthToast] = useState(false)
  const [githubAuthError, setGithubAuthError] = useState('')

  const slack = true

  useEffect(() => {
    const handleAuthSuccess = () => {
      setShowAuthToast(true)
      setProgress((currentProgress) =>
        currentProgress < 2 ? 2 : currentProgress
      )
      Scroll.animateScroll.scrollToBottom()
      window.setTimeout(() => {
        setShowAuthToast(false)
      }, 4000)
    }

    const syncAuthState = async () => {
      const params = new URLSearchParams(window.location.search)
      const usernameParam = params.get('username')
      const inviteStatusParam = params.get('inviteStatus')
      const hcaAuthSuccess = params.get('hcaAuthSuccess')
      const code = params.get('code')
      const state = params.get('state')

      const cleanUrlParams = (keys) => {
        let changed = false
        keys.forEach((key) => {
          if (params.has(key)) {
            params.delete(key)
            changed = true
          }
        })

        if (!changed) return

        const nextSearch = params.toString()
        const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}`
        window.history.replaceState(null, '', nextUrl)
      }

      if (inviteStatusParam) {
        setInviteStatus(inviteStatusParam)
      }

      if (hcaAuthSuccess === '1') {
        handleAuthSuccess()
        cleanUrlParams(['hcaAuthSuccess'])
      }

      const storedUsername = window.sessionStorage.getItem(
        GITHUB_SESSION_USERNAME_KEY
      )

      if (storedUsername) {
        setGithub(storedUsername)
        setGithubAuthError('')
        return
      }

      if (usernameParam) {
        window.sessionStorage.setItem(GITHUB_SESSION_USERNAME_KEY, usernameParam)
        setGithub(usernameParam)
        setGithubAuthError('')
        return
      }

      if (code) {
        try {
          const response = await fetch('/api/github/exchange', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code,
              state,
              redirectUri: `${window.location.origin}${window.location.pathname}`,
            }),
          })

          const payload = await response.json().catch(() => null)

          if (!response.ok) {
            setGithubAuthError(
              (payload && payload.error) ||
              'GitHub sign-in failed while exchanging the OAuth code.'
            )
            return
          }

          if (payload && payload.username) {
            window.sessionStorage.setItem(
              GITHUB_SESSION_USERNAME_KEY,
              payload.username
            )
            setGithub(payload.username)
            setGithubAuthError('')
          } else {
            setGithubAuthError('GitHub sign-in succeeded but no username returned.')
          }
        } catch (error) {
          console.error(error)
          setGithubAuthError('GitHub sign-in failed. Please try again.')
        } finally {
          cleanUrlParams(['code', 'state', 'iss'])
        }

        return
      }

      if (GITHUB_CLIENT_ID) {
        window.location.replace(
          `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${window.location.origin}${window.location.pathname}`)}&scope=read:user`
        )
      } else {
        setGithubAuthError('NEXT_PUBLIC_GITHUB_CLIENT_ID is not configured.')
      }
    }

    syncAuthState()

    const onStorage = (event) => {
      if (event.key === 'draw-dino:hca-auth-success' && event.newValue) {
        handleAuthSuccess()
      }
    }

    const onMessage = (event) => {
      if (event.data && event.data.type === 'hca-auth-success') {
        handleAuthSuccess()
      }
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener('message', onMessage)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('message', onMessage)
    }
  }, [])

  const getName = () => dinoName.replace(/[^\w+]/g, '_') || 'YOUR-DINO-NAME'
  const getFilename = () => getName() + '.png'

  const easterEggs = [
    'https://youtu.be/kRpODt0rflA',
    'https://youtu.be/Cw_f4OgW0vQ',
    'https://youtu.be/SXDcpkbkItw',
    'https://youtu.be/51reoULiSjI',
    'https://youtu.be/Z9AJlTnNf_0',
  ]
  const eggLink = easterEggs[Math.floor(easterEggs.length * Math.random())]

  let index = 0
  return (
    <>
      <Meta />
      {showAuthToast && (
        <div
          style={{
            position: 'fixed',
            right: '1rem',
            bottom: '1rem',
            zIndex: 1000,
            background: '#0f5132',
            color: '#fff',
            padding: '0.8rem 1rem',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            maxWidth: '22rem',
          }}
        >
          <p style={{ margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>
            Signed in with Hack Club Auth. Moving you to the next step.
          </p>
          <p
            style={{
              margin: '0.5rem 0 0 0',
              lineHeight: 1.4,
              fontSize: '0.9rem',
            }}
          >
            To get your emoji,{' '}
            <a
              href="https://slack.hackclub.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#a8d5a8', textDecoration: 'underline' }}
            >
              join Slack!
            </a>
          </p>
        </div>
      )}
      {githubAuthError && (
        <div
          style={{
            position: 'fixed',
            right: '1rem',
            top: '1rem',
            zIndex: 1000,
            background: '#7f1d1d',
            color: '#fff',
            padding: '0.8rem 1rem',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            maxWidth: '24rem',
          }}
        >
          <p style={{ margin: 0, lineHeight: 1.4 }}>{githubAuthError}</p>
        </div>
      )}
      <Step revealed={index <= progress}>
        <Intro
          setProgress={setProgress}
          index={index}
          progress={progress}
          github={github}
        />
      </Step>
      {console.log(index++)}

      {slack && (
        <>
          <Step revealed={index <= progress}>
            <Slack
              setProgress={setProgress}
              index={index}
              progress={progress}
              github={github}
            />
          </Step>
          {console.log(index++)}
        </>
      )}

      <Step revealed={index <= progress}>
        <Split
          image="steps/dino-wallpaper.jpg"
          subtitle="Join the club"
          imageLink={eggLink}
          setProgress={setProgress}
          index={index}
          progress={progress}
        >
          <h1>We take pride in our poorly-drawn dinos™</h1>
          <p>
            And we've got the best collection anywhere in the universe™. Send us
            a dino drawing to earn the dinoisseur badge, then get an exclusive
            emoji on Slack (through Hack Club Auth)!.
          </p>
          <img
            src="dinoisseur.png"
            style={{ borderRadius: '10%', height: '3em' }}
          />
          <p>
            Hack Club stores all its code on GitHub, including{' '}
            <a
              href="https://github.com/hackclub/draw-dino/blob/06f7dabd5c125ae54a18c1b2badfbe7665d019a5/pages/index.js#L102"
              target="_blank"
            >
              this&nbsp;website
            </a>
            , {/* AHAHAHAHAH, no one shall ever find this message!!! */}
            and the best way to make changes (such as adding a dinosaur) is by
            submitting a pull request on GitHub.
          </p>
          <p>
            The first step is to make our dino. Don't worry about setup—we've
            included a full dino-drawing-a-tron below for you to use. Just click
            "next" and make that dino! You're also free to use a photo.
          </p>
          <p style={subtitleStyle}>
            If you already know how to submit PRs to the dino repo, go ahead and{' '}
            <a
              target="_blank"
              href="https://github.com/hackclub/dinosaurs/issues/29"
            >
              read this
            </a>
            .
          </p>
        </Split>
      </Step>
      {console.log(index++)}

      <Step revealed={index <= progress}>
        <SketchEmbed
          setDinoName={setDinoName}
          index={index}
          progress={progress}
          setProgress={setProgress}
          filePrefix={github}
        />
      </Step>
      {console.log(index++)}

      {inviteStatus !== 'active' && (
        <>
          <Step revealed={index <= progress}>
            <Split index={index} progress={progress} setProgress={setProgress}>
              <p>
                Now you'll need permission to edit the dinos repo. We've just
                sent you an invite, and depending on your settings, it will be
                auto-accepted or you'll need to{' '}
                <a
                  target="_blank"
                  href="https://github.com/orgs/hackclub/invitation"
                >
                  accept it here
                </a>
                . If it doesn't show up there, check your email.
              </p>
              <p>Go to the next step once you've accepted your invite.</p>
            </Split>
          </Step>
          {console.log(index++)}
        </>
      )}

      <Step revealed={index <= progress}>
        <Split
          image="steps/star.gif"
          imageLink="steps/star.mp4"
          subtitle="✨⭐️✨"
          index={index}
          progress={progress}
          setProgress={setProgress}
        >
          <p>
            Now go to{' '}
            <a target="_blank" href="https://github.com/hackclub/dinosaurs">
              https://github.com/hackclub/dinosaurs
            </a>{' '}
            and click “star”. This bookmarks the repository in GitHub.
          </p>
          <p>Afterwards, tab back to this page to continue.</p>
        </Split>
      </Step>
      {console.log(index++)}

      <Step revealed={index <= progress}>
        <Split
          image="steps/new-branch.gif"
          imageLink="steps/new-branch.mp4"
          subtitle="Create Branch: drawing-dino"
          index={index}
          progress={progress}
          setProgress={setProgress}
        >
          <p>Find and click the dropdown “Branch: main ▼”.</p>
          <p>
            Type in <Selectable>{getName()}</Selectable>
          </p>
          <p>Click “Create branch: {getName()}”</p>
        </Split>
      </Step>
      {console.log(index++)}

      <Step revealed={index <= progress}>
        <Split
          image="steps/upload.gif"
          imageLink="steps/upload.mp4"
          subtitle="Upload your masterpiece"
          index={index}
          progress={progress}
          setProgress={setProgress}
        >
          <p>Click “Add file” and add your dino image</p>
          <p>
            Below “Commit changes”, type this into the first text box:
            <Selectable>Add {getFilename()}</Selectable>
          </p>
          <p>
            Then click{' '}
            <span style={{ color: 'rgb(52, 208, 88)' }}>COMMIT CHANGES</span>
          </p>
          <p>
            Warning:{' '}
            <span style={{ color: 'rgb(208, 52, 88) !important' }}>Do not</span>{' '}
            click the green button that says "Create pull request" just yet–
            we'll get there in a couple more steps.
          </p>
        </Split>
      </Step>
      {console.log(index++)}

      <Step revealed={index <= progress}>
        <Split
          image="steps/start-editing-readme.gif"
          imageLink="steps/start-editing-readme.mp4"
          subtitle="Find README.md"
          index={index}
          progress={progress}
          setProgress={setProgress}
        >
          <p>Scroll through the list of files & find “README.md”.</p>
          <p>
            To edit the file, click it & click the <img src="github-edit.svg" />{' '}
            icon.
          </p>
        </Split>
      </Step>
      {console.log(index++)}

      <Step revealed={index <= progress}>
        <Split
          image="steps/edit-readme.gif"
          imageLink="steps/edit-readme.mp4"
          subtitle="Add your dino in the README.md"
          index={index}
          progress={progress}
          setProgress={setProgress}
        >
          <p>Add the following lines to the bottom of the file:</p>
          <Selectable>
            "{getName()}"
            <br />
            <br />
            ![]({getFilename()})
          </Selectable>
          <p>
            Below “Commit changes”, type{' '}
            <Selectable>Add {getName()} to README</Selectable> in the first text
            box
          </p>
          <p>
            Then click{' '}
            <span style={{ color: 'rgb(52, 208, 88)' }}>COMMIT CHANGES</span>
          </p>
        </Split>
      </Step>
      {console.log(index++)}

      <Step revealed={index <= progress}>
        <Split
          image="steps/create-pr.gif"
          imageLink="steps/create-pr.mp4"
          subtitle="Create a PR"
          index={index}
          progress={progress}
          setProgress={setProgress}
        >
          <p>
            Go back to{' '}
            <a target="_blank" href="https://github.com/hackclub/dinosaurs">
              https://github.com/hackclub/dinosaurs
            </a>{' '}
            and click{' '}
            <span style={{ color: 'rgb(52, 208, 88)' }}>
              Compare & pull request
            </span>
            .
          </p>
          <p>
            {' '}
            Then click{' '}
            <span style={{ color: 'rgb(52, 208, 88)' }}>
              Create pull request
            </span>
          </p>
        </Split>
      </Step>
      {console.log(index++)}

      <Step revealed={index <= progress}>
        <Ending />
      </Step>
    </>
  )
}
