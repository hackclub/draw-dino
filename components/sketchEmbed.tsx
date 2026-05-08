import { FC, useEffect } from 'react'
import Scroll from 'react-scroll'

interface SketchEmbedProps {
  setDinoName: (name: string) => void
  progress: number
  index: number
  setProgress: (progress: number) => void
  filePrefix: string
}

const containerStyle = {
  height: '100vh',
  position: 'relative' as const,
}

const iframeStyle = {
  width: '100%',
  height: '100%',
  margin: 0,
  border: 'none' as const,
}

const continueMessage = {
  color: 'white',
  textAlign: 'center' as const,
  textShadow: '0px 0px 8px black',
  position: 'absolute' as const,
  marginBottom: '10%',
  marginRight: '10%',
  bottom: 0,
  right: 0,
}

const SketchEmbed: FC<SketchEmbedProps> = ({ setDinoName, progress, index, setProgress, filePrefix }) => {
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.filename && e.data.blob) {
        const dinoName = e.data.filename.replace('.png', '')
        setDinoName(dinoName)

        if (progress < index + 1) {
          setProgress(index + 1)
        }
        Scroll.animateScroll.scrollToBottom()
      }
    }

    window.addEventListener('message', handleMessage, false)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [progress, index, setProgress, setDinoName])

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

export default SketchEmbed
