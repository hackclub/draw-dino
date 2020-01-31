import packageJson from '../package.json'

const containerStyle = {
  width: '100%',
  height: '100vh',
  minHeight: '30em',
  overflow: 'hidden',
  margin: 0,
  background: 'black',
  fontFamily: "'Bellefair', serif",
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
}

const bannerStyle = {
  background: '#222',
  boxShadow: '0 0 15vh 15vh #222',
  textAlign: 'center',
  color: 'white',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  padding: '1em',
}

const titleStyle = {
  fontFamily: "'Yesteryear', cursive",
  fontSize: '8em',
  padding: '1em',
  paddingBottom: 0,
  fontStyle: 'italic',
  marginTop: 0,
  marginBottom: 0,
  textShadow: `
1px 1px 3px #ddd,
2px 2px 9px #555,
3px 3px 2px #999,
4px 4px 4px #999,
6px 6px 6px #999,
6px 6px 6px #999,
0.2em 0.2em 0.25em black`,
}

const footerStyle = {
  fontSize: '0.5em',
  textShadow: `
0px 0px 2px #ddd,
1px 1px 2px #ccc,
0 0 1em black`,
}

export default () => (
  <>
    <style jsx>{`
      div > div > * {
        animation: blur_in;
        animation-duration: 1s;
      }

      img {
        filter: blur(1px);
      }

      p,
      h1 {
        text-shadow: 0 0 0.1rem #eee;
        color: white;
      }

      a {
        font-size: 1em;
        text-decoration: none;
      }
      a > img {
        height: 6em;
      }
      a > p {
        margin-top: 0;
      }
    `}</style>
    <div style={containerStyle}>
      <div style={bannerStyle}>
        <img
          src="decorative-corner.png"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        <img
          src="decorative-corner.png"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            transform: 'rotate(90deg)',
          }}
        />
        <img
          src="decorative-corner.png"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            transform: 'rotate(180deg)',
          }}
        />
        <img
          src="decorative-corner.png"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: 'rotate(270deg)',
          }}
        />
        <h1 style={titleStyle}>The End</h1>
        <p style={{ fontSize: '2em' }}>
          Orpheus says: <br />
          “That's all for now folks!”
        </p>
        <img
          src="decorative-bottom.png"
          style={{ width: '400px', maxWidth: '100%', margin: '0 auto' }}
        />
        <div style={footerStyle}>
          <p>© <a href={packageJson.repository.url}>COPYTHIS FROM THE HACK FOUNDATION</a></p>
          <p>ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  </>
)
