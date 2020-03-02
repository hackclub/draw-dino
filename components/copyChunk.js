export default ({ children }) => {
  const select = e => {
    e.preventDefault()
    const range = document.createRange()
    const sel = window.getSelection()
    range.selectNodeContents(e.target)
    sel.removeAllRanges()
    sel.addRange(range)
    document.createRange()
  }

  return (
    <>
      <style jsx>{`
        pre {
          display: inline;
          padding: 1rem;
          font-size: 1rem;
        }

        pre::selection {
          color: white;
          background: rgb(56, 117, 171);
        }
      `}</style>
      <pre onClick={select}>{children}</pre>
    </>
  )
}
