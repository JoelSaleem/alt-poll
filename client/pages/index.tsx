import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import { PageLayout } from "../src/components/PageLayout";
import { Card } from "../src/components/Card";
import { Button } from "../src/components/Button";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import { UserDbProps } from "@js-alt-poll/common";
// purple 900, 700, 200

const App: React.FC = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery("user", async () => {
    const res = await axios.get("https://alt-poll.dev/auth/current_user");
    console.log("%c res ", "background: purple; color: white", res);
    return res.data;
  });

  const user = data as UserDbProps | undefined;
  return (
    <PageLayout title="Polls" userId={user?.id}>
      <ReactQueryDevtools />
      <div style={{ height: "50%", padding: "20px" }}>
        <Button>Login</Button>
        <Card depth={2}>Hello world</Card>
      </div>
    </PageLayout>
  );
};

export default function Home() {
  return <App />;
}

// export const getServerSideProps: GetServerSideProps = async (context) => {

//   return {
//     props: {},
//   };
// };
