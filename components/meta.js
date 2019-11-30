import Head from 'next/head'

const fontImport = (family, weight, file) => (`
@font-face {
  font-family: '${family}';
  font-weight: ${weight};
  src: url('fonts/${file}.woff2') format('woff2'),
       url('fonts/${file}.woff') format('woff'),
       url('fonts/${file}.ttf') format('truetype');
}
`)

export default () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
      ${fontImport('Phantom Sans', '400', 'PhantomSans0.6-Regular')}
      ${fontImport('Phantom Sans', '500', 'PhantomSans0.6-Book')}
      ${fontImport('Phantom Sans', '600', 'PhantomSans0.6-Medium')}
      ${fontImport('Phantom Sans', '700', 'PhantomSans0.6-Semibold')}
      ${fontImport('Phantom Sans', '800', 'PhantomSans0.6-Bold')}
      ${fontImport('Phantom Sans', 'italic', 'PhantomSans0.6-Italic')}


      body {
        margin: 0;
        font-family: 'Phantom Sans', 'Roboto', sans-serif;
      }


      h1, h2, h3 {
        font-family: 'Phantom Sans';
        font-weight: 800;
      }

      a {
        color: inherit;
        font-weight: bold;
      }


    `}</style>
  </>
)