// from this tutorial: https://redstapler.co/css-film-grain-effect/

const maskStyle = {
  position: 'absolute',
  top: '-20%',
  bottom: '-20%',
  right: '-20%',
  left: '-20%',
  pointerEvents: 'none',
  zIndex: '999',
  backgroundImage:
    'url(data:image/png;base64,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)',
}
const containerStyle = {
  position: 'absolute',
  overflow: 'hidden',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  pointerEvents: 'none',
}
export default () => (
  <>
    <style jsx>{`
      @keyframes grain {
        0% {
          transform: translate(0, 0);
        }
        10% {
          transform: translate(-5%, -10%);
        }
        20% {
          transform: translate(9%, 4%);
        }
        30% {
          transform: translate(-1%, 7%);
        }
        40% {
          transform: translate(3%, -15%);
        }
        50% {
          transform: translate(-5%, -10%);
        }
        60% {
          transform: translate(12%, 9%);
        }
        70% {
          transform: translate(-5%, -10%);
        }
        80% {
          transform: translate(9%, 4%);
        }
        90% {
          transform: translate(-1%, 7%);
        }
        100% {
          transform: translate(3%, -15%);
        }
      }

      .grain {
        animation: grain 1.5s steps(6) infinite;
      }
    `}</style>
    <div style={containerStyle}>
      <div style={maskStyle} className="grain"></div>
    </div>
  </>
)
