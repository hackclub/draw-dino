import { FC, ReactNode } from 'react'
import Scroll from 'react-scroll'

interface ProgressButtonProps {
  children: ReactNode
  setProgress: (progress: number) => void
  index: number
  progress: number
  [key: string]: any
}

const ProgressButton: FC<ProgressButtonProps> = ({ children, setProgress, index, progress, ...props }) => {
  const active = index == progress

  const onClick = () => {
    if (progress < index + 1) {
      setProgress(index + 1)
    }
    Scroll.animateScroll.scrollToBottom()
  }

  return (
    <>
      <style jsx>{`
        button {
          font-family: 'Bellefair', serif;
          background: none;
          border: none;
          opacity: ${active ? 1 : 0.6};
          cursor: pointer;
        }

        button:hover {
          opacity: 0.8;
        }
      `}</style>
      <button onClick={onClick} {...props}>
        {children}
      </button>
    </>
  )
}

export default ProgressButton
