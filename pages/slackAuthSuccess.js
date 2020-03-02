import Meta from '../components/meta'

export default () => {
  if (process.browser) {
    window.close()
  }
  return (
    <>
      <Meta />
      <p>Success! Go ahead and close this window</p>
    </>
  )
}
