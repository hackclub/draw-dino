export default ({ onClick, index, progress }) => {
  const active = index == progress

  return (
    <>
      <style jsx>{`
        button {
          // background: linear-gradient(to right, rgba(36,31,31,1) 0%, rgba(36,31,31,1) 32%, rgba(74,71,70,1) 100%);
          // color: #fff;
          background: none;
          border: none;
          font-family: 'Bellefair', serif;
          font-size: 1.5rem;
          font-weight: ${active ? 'bold' : 'regular'};
          opacity: ${active ? 1 : 0.6};
          position: absolute;
          margin-bottom: 6em;
          margin-right: 6em;
          bottom: 0;
          right: 0;
          text-align: left;
          cursor: pointer;
        }

        button:hover {
          opacity: 0.8;
        }

        p {
          font-size: 1rem;
        }
      `}</style>
      <button onClick={onClick}>
        Continue...
        <p>to step {index + 2}</p>
      </button>
    </>
  )
}
