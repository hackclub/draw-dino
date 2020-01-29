import ProgressButton from './progressButton'

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

const supertitleStyle = {
  fontFamily: "'Bellefair', serif",
}

const titleStyle = {
  fontFamily: "'Yesteryear', cursive",
  fontSize: '8em',
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

const subtitleStyle = {
  fontSize: '2em',
}

const footerStyle = {
  fontSize: '0.5em',
  textShadow: `
1px 1px 1px #ddd,
2px 2px 1px #ccc,
0 0 1em black`,
}

export default ({ index, progress, setProgress }) => (
  <>
    <style jsx>{`
      @keyframes blur-in {
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

      .blur-in {
        animation: blur-in 1s;
      }

      img {
        filter: blur(1px);
      }

      p,
      h1 {
        text-shadow: 0 0 0.1rem #eee;
        color: white;
      }

      button {
        animation: vertical-float;
        animation-duration: 1s;
      }

      @keyframes vertical-float {
        0% {
          transform: translateY(-10px);
        }
        50% {
          transform: translateY(10px);
        }
        100% {
          transform: translateY(-10px);
        }
      }

      .vertical-float {
        animation: vertical-float 5s infinite !important;
      }
      .vertical-float:hover {
        animation-play-state: paused !important;
      }
    `}</style>
    <div style={containerStyle}>
      <div style={bannerStyle} className="blur-in">
        <div className="">
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
          <p
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: '4em' }}
          >
            Opt'nl
          </p>
          <p style={{ fontSize: '2em' }}>
            Orpheus says: <br />
            “Sign in to Slack for an exclusive emoji!”
          </p>
          <a
            href="https://slack.com/oauth/authorize?scope=incoming-webhook&client_id=2210535565.713809622784"
            target="_blank"
            style={{ display: 'block', textDecoration: 'none' }}
          >
            <p>Click here to sign into Slack</p>
            <img src="slack.svg" />
          </a>
          <ProgressButton
            index={index}
            progress={progress}
            setProgress={setProgress}
          >
            <div className="vertical-float">
              <p style={{ margin: 0, fontSize: '3em' }}>Click to Continue</p>
              <img
                src="decorative-bottom.png"
                style={{ width: '400px', maxWidth: '100%', margin: '0 auto' }}
              />
            </div>
          </ProgressButton>
          <div style={footerStyle}>
            <p>© COPYWRONG THE HACK FOUNDATION</p>
            <p>ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </div>
  </>
)
