export default ({ onClick, index, progress }) => {
  const active = index == progress

  return (
    <>
      <style jsx>{`
        button {
          background: none;
          border: none;
          font-family: 'Bellefair', serif;
          font-size: 1.5rem;
          font-weight: ${active ? 'bold' : 'regular'};
          opacity: ${active ? 1 : 0.6};
          position: absolute;
          margin-bottom: 10%;
          margin-right: 10%;
          bottom: 0;
          right: 0;
          text-align: left;
          cursor: pointer;
        }

        button:hover {
          opacity: 0.8;
        }

        p {
          font-size: 2rem;
          transform: rotate(-15deg);
        }

        img {
          width: 5rem;
        }
      `}</style>
      <button onClick={onClick}>
        <img src={active ? "next-black.png" : "back-black.png" } />
      </button>
    </>
  )
}
