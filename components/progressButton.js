export default ({ onClick, active }) => (
  <>
    <style jsx>{`
      button {
        // background: linear-gradient(to right, rgba(36,31,31,1) 0%, rgba(36,31,31,1) 32%, rgba(74,71,70,1) 100%);
        // color: #fff;
        background: none;
        border: none;
        font-family: 'Bellefair', serif;
        font-size: 1.5em;
        font-weight: ${active ? 'bold' : 'regular'};
        position: absolute;
        bottom: 0;
        right: 0;
      }

      button:hover {
        opacity: 0.8;
      }
    `}</style>
    <button onClick={onClick}>Continue...</button>
  </>
)
