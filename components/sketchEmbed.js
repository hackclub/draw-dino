import { useEffect } from 'react'
import Scroll from 'react-scroll'

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

const continueMessage = {
  color: 'white',
  textAlign: 'center',
  textShadow: '0px 0px 8px black',
  position: 'absolute',
  marginBottom: '10%',
  marginRight: '10%',
  bottom: 0,
  right: 0,
}

export default ({ setDinoName, progress, index, setProgress, filePrefix }) => {
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
      <p style={continueMessage}>
        Finish and save your dino drawing to continue
      </p>
      <iframe
        src={`sketch.html?filePrefix=${filePrefix}`}
        style={iframeStyle}
      />
    </div>
  )
}
