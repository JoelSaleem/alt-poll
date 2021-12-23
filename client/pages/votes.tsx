import { Box } from "@chakra-ui/react";
import { UserDbProps } from "@js-alt-poll/common";
import { ReactQueryDevtools } from "react-query/devtools";
import { PageLayout } from "../src/components/PageLayout";
import { Votes } from "../src/components/Votes";
import { UserProvider } from "../src/components/UserProvider";

const App = ({ user }: { user?: UserDbProps }) => {
  return (
    <PageLayout title="Vote" userId={user?.id}>
      <Box padding={3}>
        <Votes />
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
