import { FC, useState, useEffect } from 'react'
import ProgressButton from './progressButton'
import packageJson from '../package.json'
import FilmGrain from './filmGrain'

interface IntroProps {
  index: number
  progress: number
  setProgress: (progress: number) => void
  github: string
  setGithub: (github: string) => void
  needsGithubManual: boolean
}

const containerStyle = {
  width: '100%',
  height: '100vh',
  minHeight: '30em',
  overflow: 'auto' as const,
  margin: 0,
  background: 'black',
  fontFamily: "'Bellefair', serif",
  display: 'flex' as const,
  position: 'relative' as const,
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

const ORG_INVITE_DISMISS_KEY = 'draw-dino:org-invite-disclaimer-dismissed'

const Intro: FC<IntroProps> = ({
  index,
  progress,
  setProgress,
  github,
  setGithub,
  needsGithubManual,
}) => {
  const [showOrgInviteNotice, setShowOrgInviteNotice] = useState<boolean>(false)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = window.localStorage.getItem(ORG_INVITE_DISMISS_KEY) === '1'
    } catch (err) {
      console.error(err)
    }
    setShowOrgInviteNotice(!dismissed)
  }, [])

  const dismissOrgInviteNotice = () => {
    try {
      window.localStorage.setItem(ORG_INVITE_DISMISS_KEY, '1')
    } catch (err) {
      console.error(err)
    }
    setShowOrgInviteNotice(false)
  }

  return (
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
          text-shadow:
            1px 1px 3px #ddd,
            2px 2px 9px #555,
            3px 3px 2px #999,
            4px 4px 4px #999,
            6px 6px 6px #999,
            6px 6px 6px #999,
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

        .github-input {
          font-family: 'Bellefair', serif;
          font-size: 1.2em;
          padding: 0.4em 0.8em;
          margin-top: 0.5em;
          text-align: center;
          background: #111;
          color: white;
          border: 1px solid #555;
          border-radius: 0.3em;
          max-width: 100%;
          width: 18em;
        }

        .github-input:focus {
          outline: none;
          border-color: #fff;
        }

        .github-hint {
          font-style: italic;
          opacity: 0.6;
          margin-bottom: 0;
        }

        .org-invite-banner {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100%;
          background: #1a1a2e;
          color: #eee;
          font-family: 'Bellefair', serif;
          font-style: italic;
          padding: 0.7em 1em;
          z-index: 1000;
          box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0.8em;
        }

        .org-invite-banner p {
          margin: 0;
          text-shadow: none;
          color: #eee;
          font-size: 1.1em;
        }

        .org-invite-close {
          background: none;
          border: none;
          color: #aaa;
          font-size: 1.4em;
          cursor: pointer;
          line-height: 1;
          padding: 0 0.3em;
        }

        .org-invite-close:hover {
          color: #fff;
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
          <p style={supertitleStyle}>"HACK CLUB PRESENTS"</p>
          <p>Orpheus the Dinosaur and {github} co-star in...</p>
          <h1 className="title">
            "Draw a<br />
            Dino"
          </h1>
          <p style={subtitleStyle}>
            Or, An "Inter-Active" Primer to Submit Pull Requests
          </p>
          {needsGithubManual && (
            <div>
              <p className="github-hint">
                Type your GitHub username to
                continue:
              </p>
              <input
                type="text"
                className="github-input"
                placeholder="your-github-username"
                value={github}
                onChange={(event) => setGithub(event.target.value)}
              />
            </div>
          )}
          {(!needsGithubManual || github.trim().length > 0) && (
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
          )}
          <div style={footerStyle}>
            <p>
              ©{' '}
              <a href={packageJson.repository.url}>
                COPYTHIS FROM THE HACK FOUNDATION
              </a>
            </p>
            <p>NO RIGHTS RESERVED</p>
          </div>
        </div>
        {showOrgInviteNotice && (
          <div className="org-invite-banner">
            <p>
              GitHub org invites are temporarily disabled (they'll be back
              soon!). In the meantime, please DM @mat saying that you want to be
              added (and if needed urgently, why).
            </p>
            <button
              className="org-invite-close"
              aria-label="Dismiss notice"
              onClick={dismissOrgInviteNotice}
            >
              x
            </button>
          </div>
        )}
        <FilmGrain />
      </div>
    </>
  )
}

export default Intro
