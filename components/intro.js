import ProgressButton from './progressButton'
import packageJson from '../package.json'

const containerStyle = {
  width: '100%',
  height: '100vh',
  minHeight: '30em',
  overflow: 'auto',
  margin: 0,
  background: 'black',
  fontFamily: "'Bellefair', serif",
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
}

const supertitleStyle = {
  fontFamily: "'Bellefair', serif",
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

      .title {
        font-family: 'Yesteryear', cursive;
        font-size: 4em;
        line-height: 1em;
        font-style: italic;
        margin-top: 0;
        margin-bottom: 0;
        text-shadow: 1px 1px 3px #ddd, 2px 2px 9px #555, 3px 3px 2px #999,
          4px 4px 4px #999, 6px 6px 6px #999, 6px 6px 6px #999,
          0.2em 0.2em 0.25em black;
      }
      @media (min-width: 992px) {
        .title {
          font-size: 8em;
        }
      }

      .banner {
        background: #222;
        box-shadow: 0 0 15vh 15vh #222;
        text-align: center;
        color: white;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        position: absolute;
        padding: 1em;
      }
    `}</style>
    <div style={containerStyle}>
      <div className="blur-in banner">
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
        <p style={supertitleStyle}>“HACK CLUB PRESENTS”</p>
        <p>Orpheus the Dinosaur stars in...</p>
        <h1 className="title">
          “Draw a<br />
          Dino”
        </h1>
        <p style={subtitleStyle}>
          Or, An “Inter-Active” Primer to Submit Pull Requests
        </p>
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
          <p>© <a href={packageJson.repository.url}>COPYTHIS FROM THE HACK FOUNDATION</a></p>
          <p>ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  </>
)
