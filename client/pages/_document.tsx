import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "../src/theme";
export default class Document extends NextDocument {
  render() {
    return (
      <>
        <Html lang="en" style={{ height: "100%" }}>
          <Head />
          <body style={{ height: "100%" }}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Main />
            <NextScript />
            <style global jsx>{`
              html,
              body,
              body > div:first-child,
              div#__next,
              div#__next > div {
                height: 100%;
              }
            `}</style>
          </body>
        </Html>
      </>
    );
  }
}
