import { useEffect } from 'react'
import Scroll from 'react-scroll'

import ProgressButton from './progressButton'

const containerStyle = {
  height: '100vh',
  position: 'relative',
}

const iframeStyle = {
  width: '100%',
  height: '100%',
  margin: 0,
  border: 'none',
}

const progressStyle = {
  position: 'absolute',
  marginBottom: '10%',
  marginRight: '10%',
  bottom: 0,
  right: 0,
  width: '10em',
}

export default ({ setDinoName, progress, index, setProgress, username }) => {
  useEffect(() => {
    window.addEventListener(
      'message',
      e => {
        if (e.data.filename && e.data.blob) {
          const dinoName = e.data.filename.replace('.png', '')
          setDinoName(dinoName)

          if (progress < index + 1) {
            setProgress(index + 1)
          }
          Scroll.animateScroll.scrollToBottom()
        }
      },
      false
    )
  })

  return (
    <div style={containerStyle}>
      <iframe src={`sketch.html?username=${username}`} style={iframeStyle} />
      <ProgressButton
        setProgress={setProgress}
        index={index}
        progress={progress}
        style={progressStyle}
      >
        <img
          src={index == progress ? 'next-white.png' : 'back-white.png'}
          style={{ width: '100%' }}
        />
      </ProgressButton>
    </div>
  )
}
