import { useEffect } from 'react'
import Scroll from 'react-scroll'

const containerStyle = {
  height: '100vh',
}

const iframeStyle = {
  width: '100%',
  height: '100%',
  margin: 0,
  border: 'none',
}

export default ({ setDinoName, progress, index, setProgress }) => {
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
      <iframe src="sketch.html" style={iframeStyle} />
    </div>
  )
}
