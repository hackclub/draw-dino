const containerStyle = {
  width: '100%',
  height: '100vh',
  minHeight: '30em',
  maxHeight: '1024px',
  overflow: 'hidden',
  margin: 0,
  background: 'black',
  fontFamily: "'Bellefair', serif",
}

const bannerStyle = {
  background: '#222',
  boxShadow: '0 0 15vh inherit',
  textAlign: 'center',
  color: 'white',
  display: 'inline-block',
  margin: '0 auto',
}

const supertitleStyle = {
  fontFamily: "'Bellefair', serif",
}

const titleStyle = {
  fontSize: '8em',
  textShadow: `
1px 1px 1px #ddd,
2px 2px 1px #ccc,
3px 3px 1px #bbb,
0 0 1em black`,
}

const subtitleStyle = {
  fontSize: '4em',
}

const footerStyle = {
  fontSize: '0.5em',
  fontWeight: 'bold',
  textShadow: `
1px 1px 1px #ddd,
2px 2px 1px #ccc,
0 0 1em black`,
}

export default () => (
  <>
    <canvas></canvas>
    <div style={containerStyle}>
      <div style={bannerStyle}>
        <p style={supertitleStyle}>Orpheus the Dinosaur in...</p>
        <h1 style={titleStyle}>“Requesting a&nbsp;Pull”</h1>
        <p style={subtitleStyle}>
          An “Inter-Active” Primer to Submit Pull Requests
        </p>
        <p>A HACK CLUB PRODUCTION</p>
        <div style={footerStyle}>
          <p>© COPYWRONG THE HACK FOUNDATION</p>
          <p>ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  </>
)
