// _document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            async
            defer
            data-website-id="38902b1d-8825-4759-ae44-ac9203733e54"
            src="https://tracking.bryanching.net/unagi.js"
          ></script>
        </body>
      </Html>
    )
  }
}
