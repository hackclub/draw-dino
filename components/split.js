import ProgressButton from './progressButton'

const subStyle = {
  fontStyle: 'italic',
  opacity: 0.7,
}

const imageStyle = {
  maxWidth: '90%',
  maxHeight: '90%',
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

      .side {
        text-align: center;
        color: white;
        background: #333;
        position: relative;
        min-height: 50vh;
        max-height: 50vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow-y: hidden;
        box-sizing: border-box;
      }
      @media (min-width: 992px) {
        .side {
          max-height: 100%;
          overflow-y: auto;
        }
      }

      .right {
        text-align: left;
        max-height: 100%;
        padding: 3em;
        background: #eee;
        background: linear-gradient(#eee, #eaeaea);
        color: #222;
        overflow-y: auto;
      }
    `}</style>
    <div className="container">
      <div className="side">
        {image && (
          <>
            <a target="_blank" href={imageLink}>
              <img src={image} style={imageStyle} />
            </a>
            <p style={subStyle}>{subtitle || image}</p>
          </>
        )}
      </div>
      <div className="side right">
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
