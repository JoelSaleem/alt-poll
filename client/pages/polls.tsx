import axios from "axios";
import { Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { PageLayout } from "../src/components/PageLayout";
import { Card } from "../src/components/Card";
import { Button } from "../src/components/Button";
import { ReactQueryDevtools } from "react-query/devtools";
import { PollDbProps, UserDbProps } from "@js-alt-poll/common";
import { UserProvider } from "./UserProvider";

const App = ({ user }: { user?: UserDbProps }) => {
  const { data } = useQuery("user", async () => {
    // const res = await axios.get("https://alt-poll.dev/polls", {
    //   withCredentials: true,
    // });
    // return res.data;
    const d: PollDbProps[] = [
      {
        closed: false,
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

  console.log("%c data ", "background: purple; color: white", data);
  return (
    <PageLayout title="My Polls" userId={user?.id}>
      <Box padding={3}>
        {data?.map(({ title, description, open }) => (
          <Card
            depth={2}
            margin={2}
            maxH={24}
            padding={3}
            hoverColour={"brand.accent"}
          >
            <div>
              <b>{title}</b>
            </div>
            <div>{description}</div>
            <div>Open: {open + ""}</div>
          </Card>
        ))}
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
