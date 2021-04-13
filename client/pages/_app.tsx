import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { QueryClient } from "react-query";

const client = new QueryClient();

export interface hasClient {
  queryClient: QueryClient;
}

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} queryClient={client} />
    </ChakraProvider>
  );
}

export default MyApp;
