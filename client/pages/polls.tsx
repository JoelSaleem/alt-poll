import axios from "axios";
import { Box, Center, Heading, Switch, Text, Textarea } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PageLayout } from "../src/components/PageLayout";
import { Card } from "../src/components/Card";
import { Button } from "../src/components/Button";
import { ReactQueryDevtools } from "react-query/devtools";
import { PollDbProps, UserDbProps } from "@js-alt-poll/common";
import { UserProvider } from "./UserProvider";
import { useRouter } from "next/router";
import { PollsList } from "../src/components/PollsList";
import { PollForm } from "../src/components/PollForm";
import { PollCreate } from "../src/components/PollCreate";
import { PollUpdate } from "../src/components/PollUpdate";

const App = ({ user }: { user?: UserDbProps }) => {
  const { push, pathname, query } = useRouter();
  const { data: polls } = useQuery("polls", async () => {
    const res = await axios.get("https://alt-poll.dev/api/polls", {
      withCredentials: true,
    });
    return res.data as PollDbProps[];
    // const d: PollDbProps[] = [
    //   {
    //     closed: false,
    //     open: true,
    //     created_at: "2021-05-22T16:39:59.771Z",
    //     description: "some poll",
    //     id: "1",
    //     title: "abc",
    //     user_id: "1",
    //     version: 1,
    //   },
    //   {
    //     closed: false,
    //     open: true,
    //     created_at: "2021-05-22T16:39:59.771Z",
    //     description: "some poll",
    //     id: "2",
    //     title: "this is my title",
    //     user_id: "1",
    //     version: 3,
    //   },
    // ];
    // return d;
  });

  const renderPollList = () => {
    if (!polls) return;
    return;
  };

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
  const queryClient = useQueryClient();

  console.log(
    "%c selectedPoll ",
    "background: purple; color: white",
    selectedPoll
  );

  return (
    <PageLayout title="My Polls" userId={user?.id}>
      <Box padding={3}>
        {selectedPoll && (
          <PollUpdate poll={selectedPoll} onBack={showPollsList} />
        )}
        {query.view != "create" && !selectedPoll && (
          <>
            {/* TODO: clean up to show display logic */}
            {polls && <PollsList polls={polls} />}
            {renderButton("Create Poll", showCreateView)}
          </>
        )}
        {query.view == "create" && <PollCreate onBack={showPollsList} />}
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
