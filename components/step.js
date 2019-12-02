import Scroll from 'react-scroll'

import ProgressButton from './progressButton'

const containerStyle = {
  width: '100%',
  height: '100vh',
  minHeight: '30em',
  maxHeight: '1024px',
  overflow: 'hidden',
  background: 'white',
  display: 'grid',
  gridTemplateColumns: '50% 50%',
}

const sideStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'white',
  background: '#333',
  position: 'relative',
}

const rightStyle = {
  padding: '3em',
  background: '#eee',
  background: 'linear-gradient(#eee, #eaeaea)',
  color: '#222',
}

const subStyle = {
  fontStyle: 'italic',
  opacity: 0.7,
}

const imageStyle = {
  maxWidth: '100%',
  borderRadius: '0.5em',
  boxShadow: 'rgba(0, 0, 0, 1) 0 0 1em, rgba(255, 255, 255, 0.1) 0 0 5em',
}

const hiddenStyle = {
  display: 'none',
}

export default ({
  index,
  progress,
  setProgress,
  subtitle,
  image,
  imageLink,
  children,
}) => {
  const isHidden = index > progress

  if (isHidden) {
    return null
  }

  const handleClick = () => {
    if (progress < index + 1) {
      setProgress(index + 1)
    }
    Scroll.animateScroll.scrollToBottom()
  }

  return (
    <div style={isHidden ? hiddenStyle : containerStyle} index={index}>
      <div style={sideStyle}>
        {image && (
          <>
            <a target="_blank" href={imageLink}>
              <img src={image} style={imageStyle} />
            </a>
            <p style={subStyle}>{subtitle || image}</p>
          </>
        )}
      </div>
      <div style={{ ...sideStyle, ...rightStyle }}>
        {children}
        <ProgressButton onClick={handleClick} active={index == progress} />
      </div>
    </div>
  )
}
