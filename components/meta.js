import Head from 'next/head'

const fontImport = (family, weight, file) => `
@font-face {
  font-family: '${family}';
  ${weight &&
    `
    font-weight: ${weight};
  `}
  src: url('fonts/${file}.woff2') format('woff2'),
       url('fonts/${file}.woff') format('woff'),
       url('fonts/${file}.ttf') format('truetype');
}
`

export default () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
analytics.load("hC3Aqw2aDmtvj0mPaLy7lk1ARPJqCAQd");
analytics.page();
}}();
      `,
        }}
      />
      <link rel="shortcut icon" type="image/x-icon" href="dinoisseur.png" />
      <title>Draw Dino</title>
    </Head>
    <style jsx global>{`

      @import url('https://fonts.googleapis.com/css?family=Bellefair&display=swap');
      // @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
      // @import url('https://fonts.googleapis.com/css?family=Limelight&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Yesteryear&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Dancing+Script&display=swap');
      // ${fontImport('Phantom Sans', '400', 'PhantomSans0.6-Regular')}
      // ${fontImport('Phantom Sans', '500', 'PhantomSans0.6-Book')}
      // ${fontImport('Phantom Sans', '600', 'PhantomSans0.6-Medium')}
      // ${fontImport('Phantom Sans', '700', 'PhantomSans0.6-Semibold')}
      ${fontImport('Phantom Sans', '800', 'PhantomSans0.6-Bold')}
      // ${fontImport('Phantom Sans', null, 'PhantomSans0.6-Italic')}

      html {
        background: black;
      }
      body {
        margin: 0;
        font-family: 'Bellefair', serif;
      }

      h1, h2, h3 {
        font-family: 'Phantom Sans';
        font-weight: 800;
      }

      p {
        font-size: 1.5em;
      }

      pre {
        background: rgba(0,0,0,0.1);
        font-size: 2em;
        border-radius: 0.5rem;
        padding: 1em;
        text-align: left;
      }

      a {
        color: inherit;
      }

      ::-moz-selection {
        color: black;
        background: #ddd;
        text-shadow: none;
      }
      ::selection {
        color: black;
        background: #ddd;
        text-shadow: none;
      }

    `}</style>
  </>
)
