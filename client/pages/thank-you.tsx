import { Box, Heading, Center } from "@chakra-ui/react";
import { UserDbProps } from "@js-alt-poll/common";
import { ReactQueryDevtools } from "react-query/devtools";
import { PageLayout } from "../src/components/PageLayout";
import { Votes } from "../src/components/Votes";
import { UserProvider } from "./UserProvider";

const App = ({ user }: { user?: UserDbProps }) => {
  return (
    <PageLayout title="Thank you!" userId={user?.id}>
      <Box padding={3} height="80%">
        <Center>
          <Heading>Thank you for voting!</Heading>
        </Center>
      </Box>
      <ReactQueryDevtools />
    </PageLayout>
  );
};

export default function Home() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
