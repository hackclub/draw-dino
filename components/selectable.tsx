import { FC, ReactNode } from 'react'

interface SelectableProps {
  children: ReactNode
}

const Selectable: FC<SelectableProps> = ({ children }) => {
  const select = (e: React.MouseEvent<HTMLPreElement>) => {
    e.preventDefault()
    const range = document.createRange()
    const sel = window.getSelection()
    if (sel) {
      range.selectNodeContents(e.currentTarget)
      sel.removeAllRanges()
      sel.addRange(range)
    }
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

export default Selectable
