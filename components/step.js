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
  background: '#eee',
}

const rightStyle = {
  color: 'white',
  padding: '3em',
  background: '#222'
}

const subStyle = {
  fontStyle: 'italic',
  opacity: 0.7
}

const imageStyle = {
  maxWidth: '100%',
  borderRadius: '0.5em',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 2em'
}

const Step = ({subtitle, image, children}) => (
  <div style={containerStyle}>
    {image && (
      <div style={sideStyle}>
        <img src={image} style={imageStyle} />
        <p style={subStyle}>{subtitle || image}</p>
      </div>
    )}
    <div style={{...sideStyle, ...rightStyle}}>
      {children}
    </div>
  </div>
)

export default Step