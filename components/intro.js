const containerStyle = {
  width: '100%',
  height: '100vh',
  minHeight: '30em',
  overflow: 'hidden',
  margin: 0,
  background: 'black',
  fontFamily: "'Bellefair', serif",
  display: 'flex',
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
    <style jsx>{`
      @keyframes blur_in {
        0% {
          filter: blur(50px);
          text-shadow: 0 0 0 0 !important;
        }
        35% {
          filter: blur(5px);
          text-shadow: 0 0 0 0 !important;
        }
        45% {
          filter: blur(20px);
          text-shadow: 0 0 0 0 !important;
        }
        75% {
          filter: blur(10px);
          text-shadow: 0 0 0 0 !important;
        }
        90% {
          filter: blur(5px);
          text-shadow: 0 0 0 0 !important;
        }
        100% {
          filter: blur(0px);
          text-shadow: 0 0 0 0 !important;
        }
      }

      p,
      h1 {
        animation: blur_in;
        animation-duration: 1s;
        text-shadow: 0 0 0.2rem #eee;
        color: transparent;
      }
    `}</style>
    <div style={containerStyle}>
      <div style={bannerStyle}>
        <p style={supertitleStyle}>“HACK CLUB PRESENTS”</p>
        <h1 style={titleStyle}>“Requesting a&nbsp;Pull”</h1>
        <p style={subtitleStyle}>
          Or, An “Inter-Active” Primer to Submit Pull Requests
        </p>
        <p>The 12-part epic, staring Orpheus the Dinosaur</p>
        <div style={footerStyle}>
          <p>© COPYWRONG THE HACK FOUNDATION</p>
          <p>ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  </>
)
