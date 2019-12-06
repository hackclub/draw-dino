const containerStyle = {
  width: '100%',
  overflow: 'scrollY',
}

const hiddenStyle = {
  display: 'none',
}

export default ({ revealed, children }) => (
  <div style={revealed ? containerStyle : hiddenStyle}>{children}</div>
)
