const containerStyle = {
  width: '100%',
  height: '100vh',
  background: 'white',
  display: 'grid',
  gridTemplateColumns: '50% 50%'
}

const sideStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'white',
  background: '#333'
}

const rightStyle = {
  padding: '3em',
  background: '#eee',
  background: 'linear-gradient(#eee, #eaeaea)',
  color: '#222'
}

const subStyle = {
  fontStyle: 'italic',
  opacity: 0.7
}

const imageStyle = {
  maxWidth: '100%',
  borderRadius: '0.5em',
  boxShadow: 'rgba(0, 0, 0, 1) 0 0 1em, rgba(255, 255, 255, 0.1) 0 0 5em'
}

const Step = ({ subtitle, image, imageLink, children }) => (
  <div style={containerStyle}>
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
    <div style={{ ...sideStyle, ...rightStyle }}>{children}</div>
  </div>
)

export default Step
