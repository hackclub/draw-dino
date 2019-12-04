import { useState } from 'react'
import AutosizeInput from 'react-input-autosize'

import Step from '../components/step'
import Meta from '../components/meta'
import Intro from '../components/intro'

const styleColored = {
  fontWeight: 'bold',
}

const styleInput = {
  borderRadius: '10px',
  fontSize: '1.5rem',
}

const quoteStyle = {
  ...styleColored,
  color: '#333',
}

const subtitleStyle = {
  fontStyle: 'italic',
  opacity: 0.6,
}

export default () => {
  const [dinoName, setDinoName] = useState('')
  const [progress, setProgress] = useState(0)

  const getName = () => dinoName.replace(/[\s\.]/g, '-') || 'YOUR-DINO-NAME'
  const getFilename = () => getName() + '.png'

  const easterEggs = [
    'https://youtu.be/kRpODt0rflA',
    'https://youtu.be/Cw_f4OgW0vQ',
    'https://youtu.be/SXDcpkbkItw',
    'https://youtu.be/51reoULiSjI',
  ]
  const eggLink = easterEggs[Math.floor(easterEggs.length * Math.random())]

  let i = 0

  return (
    <>
      <Meta />
      <Intro />
      {/* <Step
        image="steps/motivational-dino.png"
        imageLink={eggLink}
        index={i++}
        progress={progress}
        setProgress={setProgress}
      >
        <h1>Pull Requests</h1>
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
      </Step> */}
      <Step
        image="steps/drawing-dino.gif"
        imageLink="steps/drawing-dino.gif"
        subtitle={getFilename()}
        index={i++}
        progress={progress}
        setProgress={setProgress}
      >
        <p>
          Draw your dino by sketching it <a target="_blank" href="/sketch.html">here</a> (or use
          your own drawing tools). Once you've got one, type the name of the
          dino here:
        </p>
        <AutosizeInput
          type="text"
          value={dinoName}
          onChange={e => setDinoName(e.target.value)}
          placeholder="drawing-dino"
          inputStyle={styleInput}
        />
      </Step>
      <Step
        image="steps/star.gif"
        imageLink="steps/star.mp4"
        subtitle="✨⭐️✨"
        index={i++}
        progress={progress}
        setProgress={setProgress}
      >
        <p>
          Now go to{' '}
          <a target="_blank" href="https://github.com/hackclub/dinosaurs">
            https://github.com/hackclub/dinosaurs
          </a>{' '}
          and click “star”.
        </p>
      </Step>
      <Step
        image="steps/new-branch.gif"
        imageLink="steps/new-branch.mp4"
        subtitle="Create Branch: drawing-dino"
        index={i++}
        progress={progress}
        setProgress={setProgress}
      >
        <p>Find and click the dropdown “Branch: master ▼”.</p>
        <p>
          Type in <strong>{getName()}</strong>
        </p>
        <p>Click “Create branch: {getName()}”</p>
        {/* <p>
            <em>
              If it doesn't include "Create branch", that name is already taken.
              Choose a new name
            </em>
          </p>
          <AutosizeInput
            type="text"
            value={dinoName}
            onChange={e => changeDinoName(e.target.value)}
            placeholder="dancing-dino"
          /> */}
      </Step>
      <Step
        image="steps/upload.gif"
        imageLink="steps/upload.mp4"
        subtitle="Upload your masterpiece"
        index={i++}
        progress={progress}
        setProgress={setProgress}
      >
        <p>Click “Upload files” and add your dino image</p>
        <p>
          Below “Commit changes”, type{' '}
          <span style={quoteStyle}>“Add {getFilename()}”</span> in the first
          text box
        </p>
        <p>
          Then click{' '}
          <span style={{ ...styleColored, color: 'rgb(52, 208, 88)' }}>
            COMMIT CHANGES
          </span>
        </p>
      </Step>
      <Step
        image="steps/start-editing-readme.gif"
        imageLink="steps/start-editing-readme.mp4"
        subtitle="Find README.md"
        index={i++}
        progress={progress}
        setProgress={setProgress}
      >
        <p>Scroll through the list of files & find “README.md”</p>
        <p>To edit the file, click it & click the ✎ icon.</p>
      </Step>
      <Step
        image="steps/edit-readme.gif"
        imageLink="steps/edit-readme.mp4"
        subtitle="Add your dino in the README.md"
        index={i++}
        progress={progress}
        setProgress={setProgress}
      >
        <p>Add the following lines to the bottom of the file:</p>
        <pre>
          <code>
            "{getName()}"
            <br />
            <br />
            ![]({getFilename()})
          </code>
        </pre>
        <p>
          Below “Commit changes”, type{' '}
          <strong>Add {getName()} to README</strong> in the first text box
        </p>
        <p>
          Then click{' '}
          <span style={{ ...styleColored, color: 'rgb(52, 208, 88)' }}>
            COMMIT CHANGES
          </span>
        </p>
      </Step>
      <Step
        image="steps/create-pr.gif"
        imageLink="steps/create-pr.mp4"
        index={i++}
        progress={progress}
        setProgress={setProgress}
      >
        <p>
          Go back to{' '}
          <a target="_blank" href="https://github.com/hackclub/dinosaurs">
            https://github.com/hackclub/dinosaurs
          </a>{' '}
          and click{' '}
          <span style={{ ...styleColored, color: 'rgb(52, 208, 88)' }}>
            Compare & pull request
          </span>
          .
        </p>
        <p>
          {' '}
          Then click{' '}
          <span style={{ ...styleColored, color: 'rgb(52, 208, 88)' }}>
            Create pull request
          </span>
        </p>
      </Step>
      <Step index={i++} progress={progress} setProgress={setProgress}>
        <h1>Get the badge</h1>
        <p>
          Type in your Slack username, but{' '}
          <strong>be careful not to @tag</strong> if you have a different
          username between Slack and GitHub you might be notifying someone
          random.
        </p>
      </Step>
    </>
  )
}
