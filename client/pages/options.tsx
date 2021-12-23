import { Box } from "@chakra-ui/react";
import { UserDbProps } from "@js-alt-poll/common";
import { ReactQueryDevtools } from "react-query/devtools";
import { Options } from "../src/components/Options";
import { PageLayout } from "../src/components/PageLayout";
import { UserProvider } from "../src/components/UserProvider";

const App = ({ user }: { user?: UserDbProps }) => {
  return (
    <PageLayout title="Options" userId={user?.id}>
      <Box padding={3}>
        <Options />
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
