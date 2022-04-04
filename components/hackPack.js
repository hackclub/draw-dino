import ProgressButton from "./progressButton";
import FilmGrain from "./filmGrain";

const containerStyle = {
  width: "100%",
  height: "100vh",
  minHeight: "30em",
  overflow: "hidden",
  margin: 0,
  background: "black",
  fontFamily: "'Bellefair', serif",
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
};

const bannerStyle = {
  background: "#222",
  boxShadow: "0 0 15vh 15vh #222",
  textAlign: "center",
  color: "white",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  padding: "1em",
};

const footerStyle = {
  fontSize: "0.5em",
  textShadow: `
1px 1px 1px #ddd,
2px 2px 1px #ccc,
0 0 1em black`,
};

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

      .slack-logo,
      .portrait,
      .portrait-decoration {
        filter: blur(0px);
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
            style={{ position: "absolute", top: 0, left: 0 }}
          />
          <img
            src="decorative-corner.png"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              transform: "rotate(90deg)",
            }}
          />
          <img
            src="decorative-corner.png"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "rotate(180deg)",
            }}
          />
          <img
            src="decorative-corner.png"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              transform: "rotate(270deg)",
            }}
          />
          <p
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: "4em" }}
          >
            Optional
          </p>
          <p>
            Orpheus says: <br />
            “Get GitHub Pro through the Hack Pack!”
          </p>
          <a
            href="https://hack.af/pack?ref=draw-dino"
            target="_blank"
            style={{ display: "block", textDecoration: "none" }}
          >
            <img
              className="portrait"
              src="github.svg"
              style={{ borderRadius: "10%", height: "5em" }}
            />
            <p style={{ opacity: 0.5, marginTop: 0 }}>
              Includes GitHub Pro, free domains, server credits, and much more!
            </p>
            <p>Click here to get the Hack Pack</p>
          </a>
          <ProgressButton
            index={index}
            progress={progress}
            setProgress={setProgress}
          >
            <div className="vertical-float">
              <p style={{ margin: 0, fontSize: "3em" }}>Click to Continue</p>
              <img
                src="decorative-bottom.png"
                style={{ width: "400px", maxWidth: "100%", margin: "0 auto" }}
              />
            </div>
          </ProgressButton>
          <div style={footerStyle}>
            <p>© MMXXI — THE HACK FOUNDATION</p>
            <p>NO RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
      <FilmGrain />
    </div>
  </>
);
