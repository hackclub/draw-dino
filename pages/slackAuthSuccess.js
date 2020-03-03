import Meta from '../components/meta'

export default () => {
  if (process.browser) {
    window.close()
  }
  return (
    <>
      <Meta />
      <p style={{ color: 'white' }}>
        Success! Once you submit your pull request you'll automatically have access to the badge on Slack.
      </p>
      <p style={{ color: 'white' }}>
        Now close this window and return to the workshop...
      </p>
    </>
  )
}
