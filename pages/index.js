import { useState, useEffect } from 'react'

import Step from '../components/step'
import Meta from '../components/meta'
import Intro from '../components/intro'
import HackPack from '../components/hackPack'
import Slack from '../components/slack'
import Ending from '../components/ending'
import SketchEmbed from '../components/sketchEmbed'
import Split from '../components/split'
import Selectable from '../components/selectable'

const styleInput = {
  borderRadius: '10px',
  fontSize: '1.5rem',
}

const quoteStyle = {
  color: '#333',
}

const subtitleStyle = {
  fontStyle: 'italic',
  opacity: 0.6,
}

const GITHUB_OAUTH_URL = process.env.NEXT_PUBLIC_GITHUB_OAUTH_URL;

export default () => {
  const [dinoName, setDinoName] = useState('')
  const [progress, setProgress] = useState(0)
  const [github, setGithub] = useState(Date.now().toString(36)) // we're putting some random value here in case we can't later figure out what the user's github username is
  const [inviteStatus, setInviteStatus] = useState('')

  const slack = true;

  useEffect(() => {
    const result = {}
    window.location.search
      .replace('?', '')
      .split('&')
      .forEach((kvString) => {
        const [key, value] = kvString.split('=')
        result[key] = value
      })

    const { username, inviteStatus } = result
    if (username) {
      setGithub(username)
    } else {
      window.location.replace(`${GITHUB_OAUTH_URL}?destination=${location.origin}`)
    }
    if (inviteStatus) {
      setInviteStatus(inviteStatus)
    }
  })

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
            And we've got the best collection anywhere in the universe™. Anyone
            who sends us a dino drawing will earn the dinoisseur badge, as well
            as get an exclusive emoji on Slack.
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

      {/*
      <Step revealed={index <= progress}>
        <HackPack
          setProgress={setProgress}
          index={index}
          progress={progress}
        />
      </Step>
      */}
      {/* console.log(index++) */}

      <Step revealed={index <= progress}>
        <Ending />
      </Step>
    </>
  )
}
