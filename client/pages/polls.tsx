// import axios from "axios";
import { Box, Center } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { PageLayout } from "../src/components/PageLayout";
import { Card } from "../src/components/Card";
import { Button } from "../src/components/Button";
import { ReactQueryDevtools } from "react-query/devtools";
import { PollDbProps, UserDbProps } from "@js-alt-poll/common";
import { UserProvider } from "./UserProvider";
import { useRouter } from "next/router";
import { PollsList } from "../src/components/PollsList";
import { PollCreate } from "../src/components/PollCreate";
import { PollUpdate } from "../src/components/PollUpdate";
import { Options } from "../src/components/Options";
import axios from "axios";
import { isLocalDev } from "../src/isLocalDev";

const App = ({ user }: { user?: UserDbProps }) => {
  const { push, pathname, query } = useRouter();
  const { data: polls } = useQuery("polls", async () => {
    if (!isLocalDev) {
      const res = await axios.get("https://alt-poll.dev/api/polls", {
        withCredentials: true,
      });
      return res.data as PollDbProps[];
    }

    const d: PollDbProps[] = [
      {
        closed: true,
        open: true,
        created_at: "2021-05-22T16:39:59.771Z",
        description: "some poll",
        id: "1",
        title: "abc",
        user_id: "1",
        version: 1,
      },
      {
        closed: false,
        open: true,
        created_at: "2021-05-22T16:39:59.771Z",
        description: "some poll",
        id: "2",
        title: "this is my title",
        user_id: "1",
        version: 3,
      },
    ];
    return d;
  });

  const selectedPollId = query.id;
  const selectedPoll =
    selectedPollId && polls?.find(({ id }) => id == selectedPollId);

  const renderButton = (title: string, onClick: () => void) => {
    return (
      <Center>
        <Button onClick={onClick}>{title}</Button>
      </Center>
    );
  };

  // todo: refactor poll routing into hook
  const showCreateView = () => {
    push({
      pathname,
      query: { ...query, view: "create" },
    });
  };

  const showPollsList = () => {
    delete query.view;
    delete query.id;
    push({
      pathname,
      query,
    });
  };

  return (
    <PageLayout title="My Polls" userId={user?.id}>
      <Box padding={3}>
        {(() => {
          if (selectedPoll && !query.view) {
            return <PollUpdate poll={selectedPoll} onBack={showPollsList} />;
          } else if (!query.view) {
            return (
              <>
                {/* TODO: clean up to show display logic */}
                {polls && <PollsList polls={polls} />}
                {renderButton("Create Poll", showCreateView)}
              </>
            );
          } else if (query.view == "create") {
            return <PollCreate onBack={showPollsList} />;
          }
        })()}
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
