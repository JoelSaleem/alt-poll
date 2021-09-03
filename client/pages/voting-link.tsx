import { Box } from "@chakra-ui/react";
import { UserDbProps } from "@js-alt-poll/common";
import { ReactQueryDevtools } from "react-query/devtools";
import { PageLayout } from "../src/components/PageLayout";
import { VotingLink } from "../src/components/VotingLink";
import { UserProvider } from "./UserProvider";

const App = ({ user }: { user?: UserDbProps }) => {
  return (
    <PageLayout title="Voting Link" userId={user?.id}>
      <Box padding={3}>
        <VotingLink />
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
