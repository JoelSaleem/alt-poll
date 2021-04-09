import { QueryClient, QueryClientProvider } from "react-query";
import { Box, Button, Center, Grid, useColorMode } from "@chakra-ui/react";

const client = new QueryClient();

// purple 900, 700, 200

const App: React.FC = () => {
  return (
    <>
      <Grid h="100%">
        <Box bg="red.200">Hello world</Box>
      </Grid>
    </>
  );
};

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <QueryClientProvider client={client}>
        {/* <button onClick={toggleColorMode}>toggle</button> */}
        <App />
      </QueryClientProvider>
    </>
  );
}
