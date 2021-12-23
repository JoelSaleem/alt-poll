import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theme";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

export interface hasClient {
  queryClient: QueryClient;
}

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
