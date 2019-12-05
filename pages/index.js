import { useState, useEffect } from 'react'
import AutosizeInput from 'react-input-autosize'

import Step from '../components/step'
import Meta from '../components/meta'
import Intro from '../components/intro'
import Ending from '../components/ending'
import SketchEmbed from '../components/sketchEmbed'
import Split from '../components/split'

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
  // const [progress, setProgress] = useState(() => {
  //   const params = {}
  //   window.location.search.replace('?', '').split('&').every(kvString => {
  //     let [key, value] = kvString.split('=')
  //     params[key] = value
  //   })

  //   return progress || 0
  // })
  // useEffect(() => {
  //   const params = {}
  //   window.location.search.replace('?', '').split('&').every(kvString => {
  //     let [key, value] = kvString.split('=')
  //     params[key] = value
  //   })

  //   if (progress == 0) {
  //     setProgress(params['progress'])
  //   }
  // })

  const getName = () => dinoName.replace(/[\s\.]/g, '-') || 'YOUR-DINO-NAME'
  const getFilename = () => getName() + '.png'

  const easterEggs = [
    'https://youtu.be/kRpODt0rflA',
    'https://youtu.be/Cw_f4OgW0vQ',
    'https://youtu.be/SXDcpkbkItw',
    'https://youtu.be/51reoULiSjI',
  ]
  const eggLink = easterEggs[Math.floor(easterEggs.length * Math.random())]

  return (
    <>
      <Meta />
      <Step revealed={0 <= progress}>
        <Intro setProgress={setProgress} index={0} progress={progress} />
      </Step>

      <Step revealed={1 <= progress}>
        <Split
          image="steps/motivational-dino.png"
          subtitle="you’ve got this"
          imageLink={eggLink}
          setProgress={setProgress}
          index={1}
          progress={progress}
        >
          <h1>Pull Requests</h1>
          <p>
            The first step is to make our dino. Don't worry about setup– we've
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
      <Step revealed={2 <= progress}>
        <SketchEmbed
          setDinoName={setDinoName}
          index={2}
          progress={progress}
          setProgress={setProgress}
        />
      </Step>
      <Step revealed={3 <= progress}>
        <Split
          image="steps/drawing-dino.gif"
          imageLink="steps/drawing-dino.gif"
          subtitle={getFilename()}
          setProgress={setProgress}
          index={3}
          progress={progress}
        >
          <p>
            Draw your dino by sketching it{' '}
            <a target="_blank" href="/sketch.html">
              here
            </a>{' '}
            (or use your own drawing tools). Once you've got one, type the name
            of the dino here:
          </p>
          <AutosizeInput
            type="text"
            value={dinoName}
            onChange={e => setDinoName(e.target.value)}
            placeholder="drawing-dino"
            inputStyle={styleInput}
          />
        </Split>
      </Step>
      <Step revealed={4 <= progress}>
        <Split
          image="steps/star.gif"
          imageLink="steps/star.mp4"
          subtitle="✨⭐️✨"
          index={4}
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
        </Split>
      </Step>
      <Step revealed={5 <= progress}>
        <Split
          image="steps/new-branch.gif"
          imageLink="steps/new-branch.mp4"
          subtitle="Create Branch: drawing-dino"
          index={5}
          progress={progress}
          setProgress={setProgress}
        >
          <p>Find and click the dropdown “Branch: master ▼”.</p>
          <p>
            Type in <strong>{getName()}</strong>
          </p>
          <p>Click “Create branch: {getName()}”</p>
        </Split>
      </Step>
      <Step revealed={6 <= progress}>
        <Split
          image="steps/upload.gif"
          imageLink="steps/upload.mp4"
          subtitle="Upload your masterpiece"
          index={6}
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
        </Split>
      </Step>
      <Step revealed={7 <= progress}>
        <Split
          image="steps/start-editing-readme.gif"
          imageLink="steps/start-editing-readme.mp4"
          subtitle="Find README.md"
          index={7}
          progress={progress}
          setProgress={setProgress}
        >
          <p>Scroll through the list of files & find “README.md”</p>
          <p>To edit the file, click it & click the ✎ icon.</p>
        </Split>
      </Step>
      <Step revealed={8 <= progress}>
        <Split
          image="steps/edit-readme.gif"
          imageLink="steps/edit-readme.mp4"
          subtitle="Add your dino in the README.md"
          index={8}
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
        </Split>
      </Step>
      <Step revealed={9 <= progress}>
        <Split
          image="steps/create-pr.gif"
          imageLink="steps/create-pr.mp4"
          index={9}
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
        </Split>
      </Step>
      <Step revealed={10 <= progress}>
        <Ending />
      </Step>
    </>
  )
}
