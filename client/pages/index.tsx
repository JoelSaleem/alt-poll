import { useQuery } from "react-query";
import { PageLayout } from "../src/components/PageLayout";
import { Card } from "../src/components/Card";
import { Button } from "../src/components/Button";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import { UserDbProps } from "@js-alt-poll/common";
import { UserProvider } from "./UserProvider";

const App = ({ user }: { user?: UserDbProps }) => {
  console.log("user from indesx", user);
  return (
    <PageLayout title="alt-poll" userId={user?.id}>
      <ReactQueryDevtools />
      <div style={{ height: "50%", padding: "20px" }}>
        <Button>Login</Button>
        <Card depth={2}>Hello world</Card>
      </div>
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
