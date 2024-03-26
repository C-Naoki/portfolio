import React from 'react'

import { ServerStyleSheets } from '@material-ui/styles'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import type { DocumentContext, DocumentInitialProps } from 'next/document'

class Document extends NextDocument {
  static async getInitialProps (ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = async () =>
      await originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
      })

    const initialProps = await NextDocument.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
    }
  }

  render (): JSX.Element {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
