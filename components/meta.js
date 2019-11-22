import Head from 'next/head'

export default () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
      body {
        margin: 0;
        font-family: 'Roboto', sans-serif;
      }

      @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    `}</style>
  </>
)