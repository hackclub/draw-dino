const containerStyle = {
  width: '100%',
}

const hiddenStyle = {
  display: 'none',
}

export default ({ revealed, children }) => (
  <div style={revealed ? containerStyle : hiddenStyle}>{children}</div>
)
