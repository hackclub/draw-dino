import ProgressButton from './progressButton'

const sideStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'white',
  background: '#333',
  position: 'relative',
  maxHeight: '100%',
}

const rightStyle = {
  padding: '3em',
  background: '#eee',
  background: 'linear-gradient(#eee, #eaeaea)',
  color: '#222',
  overflowY: 'auto',
}

const subStyle = {
  fontStyle: 'italic',
  opacity: 0.7,
}

const imageStyle = {
  maxWidth: '90%',
  borderRadius: '0.5em',
  boxShadow: 'rgba(0, 0, 0, 1) 0 0 1em, rgba(255, 255, 255, 0.1) 0 0 5em',
}

const progressStyle = {
  position: 'absolute',
  marginBottom: '10%',
  marginRight: '10%',
  bottom: 0,
  right: 0,
  width: '10em',
}

export default ({
  subtitle,
  image,
  imageLink,
  setProgress,
  progress,
  index,
  children,
}) => (
  <>
    <style jsx>{`
      .container {
        width: 100%;
        height: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      @media (min-width: 992px) {
        .container {
          overflow: hidden;
          display: grid;
          grid-template-columns: 50% 50%;
        }
      }
    `}</style>
    <div className="container">
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
        <ProgressButton
          setProgress={setProgress}
          index={index}
          progress={progress}
          style={progressStyle}
        >
          <img
            src={index == progress ? 'next-black.png' : 'back-black.png'}
            style={{ width: '100%' }}
          />
        </ProgressButton>
      </div>
    </div>
  </>
)
