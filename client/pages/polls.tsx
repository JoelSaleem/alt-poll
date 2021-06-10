import axios from "axios";
import { Box, Center, Heading, Switch, Text, Textarea } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { PageLayout } from "../src/components/PageLayout";
import { Card } from "../src/components/Card";
import { Button } from "../src/components/Button";
import { ReactQueryDevtools } from "react-query/devtools";
import { PollDbProps, UserDbProps } from "@js-alt-poll/common";
import { UserProvider } from "./UserProvider";
import { useRouter } from "next/router";

const App = ({ user }: { user?: UserDbProps }) => {
  const { push, pathname, query } = useRouter();
  const { data } = useQuery("user", async () => {
    const res = await axios.get("https://alt-poll.dev/api/polls", {
      withCredentials: true,
    });
    console.log("%c response ", "background: purple; color: white", res);
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
    return (
      <>
        {data?.map(({ title, description, open, id }) => (
          <Card
            key={id}
            depth={2}
            margin={2}
            maxH={24}
            padding={3}
            hoverColour={"brand.accent"}
            activeColour={"brand.superAccent"}
            onClick={() => {
              delete query.view;
              push({
                pathname,
                query: { ...query, id },
              });
            }}
          >
            <div>
              <b>{title}</b>
            </div>
            <div>{description}</div>
            <div>Open: {open + ""}</div>
          </Card>
        ))}
      </>
    );
  };

  const selectedPollId = query.id;
  console.log(
    "%c data ",
    "background: purple; color: white",
    data,
    selectedPollId
  );
  const selectedPoll =
    selectedPollId && data?.find(({ id }) => id == selectedPollId);
  const renderSelectedPoll = () => {
    if (!selectedPoll) return;

    const { title, open, closed, description } = selectedPoll;

    return (
      <div>
        <Center>
          <Heading>{title}</Heading>
        </Center>
        <Box>
          Open: <Switch isChecked={open} />
        </Box>
        <Box>
          Closed: <Switch isChecked={closed} />
        </Box>
        <Text>Description</Text>
        <Textarea value={description} />

        <Center>
          <Button
            variant="secondary"
            onClick={() => {
              delete query.id;
              push({
                pathname,
                query,
              });
            }}
          >
            Back
          </Button>
          <Button>Save</Button>
          <Button>Send voting link</Button>
        </Center>
      </div>
    );
  };

  return (
    <PageLayout title="My Polls" userId={user?.id}>
      <Box padding={3}>
        {selectedPoll && renderSelectedPoll()}
        {query.view != "create" && !selectedPoll && (
          <>
            {renderPollList()}
            <Center>
              <Button
                onClick={() => {
                  push({
                    pathname,
                    query: { ...query, view: "create" },
                  });
                }}
              >
                Create Poll
              </Button>
            </Center>
          </>
        )}
        {query.view == "create" && (
          <Center>
            <Button
              onClick={() => {
                delete query.view;
                push({
                  pathname,
                  query,
                });
              }}
            >
              Back
            </Button>
          </Center>
        )}
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
