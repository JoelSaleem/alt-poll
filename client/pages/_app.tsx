import "../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  console.log(Component, typeof Component);

  console.log(pageProps);
  return <Component {...pageProps} />;
}

export default MyApp;
