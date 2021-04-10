import { QueryClient, QueryClientProvider } from "react-query";
import {
  GridItem,
  Grid,
  Heading,
  useColorMode,
  Flex,
  Center,
} from "@chakra-ui/react";
import { Card } from "../src/components/Card";
import { Button } from "../src/components/Button";

const client = new QueryClient();

// purple 900, 700, 200

const App: React.FC = () => {
  return (
    <Grid
      h="100%"
      templateRows="100px 1fr 5%"
      templateColumns="1fr 8fr 1fr"
      gap={4}
    >
      <GridItem colSpan={3}>
        <Card depth={1}>
          <Center h="100%">
            <Heading>Polls</Heading>
          </Center>
          <Button variant="primary">hellow</Button>
          <Button variant="secondary">hellow</Button>
        </Card>
      </GridItem>
      <GridItem colStart={2} colEnd={3}>
        <Card depth={1}>
          <div style={{ height: "50%", padding: "20px" }}>
            <Card depth={2}>Hello world</Card>
          </div>
        </Card>
      </GridItem>
    </Grid>
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
