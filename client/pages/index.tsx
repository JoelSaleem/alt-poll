import { QueryClient, QueryClientProvider } from "react-query";
import { GridItem, Grid, useColorMode } from "@chakra-ui/react";
import { Card } from "../src/components/Card";

const client = new QueryClient();

// purple 900, 700, 200

const App: React.FC = () => {
  return (
    <>
      <Grid
        h="100%"
        templateRows="200px 1fr 5%"
        templateColumns="1fr 8fr 1fr"
        gap={4}
      >
        {/* <Box bg="brand.accent">Hello world</Box>
          <Box bg="brand.main">Hello world</Box>
          <Box bg="brand.shadow">Hello world</Box> */}
        <GridItem colSpan={3}>
          <Card depth={1}>Hello world</Card>
        </GridItem>
        <GridItem colStart={2} colEnd={3}>
          <Card depth={1}>
            <div style={{ height: "50%", padding: "20px" }}>
              <Card depth={2}>Hello world</Card>
            </div>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
};

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </>
  );
}
