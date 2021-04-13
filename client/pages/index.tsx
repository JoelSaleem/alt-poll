import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { useColorMode } from "@chakra-ui/react";
import { PageLayout } from "../src/components/PageLayout";
import { Card } from "../src/components/Card";
import { Button } from "../src/components/Button";
import { GetServerSideProps } from "next";
import { ReactQueryDevtools } from "react-query/devtools";

const client = new QueryClient();

// purple 900, 700, 200

const App: React.FC = () => {
  const router = useRouter();
  return (
    <PageLayout title="Polls">
      <ReactQueryDevtools />
      <div style={{ height: "50%", padding: "20px" }}>
        <Button>Login</Button>
        <Card depth={2}>
          <Button
            onClick={() => {
              router.push("/auth/google");
            }}
            variant="secondary"
          >
            Login
          </Button>
          Hello world
        </Card>
      </div>
    </PageLayout>
  );
};

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("context", context);
  return {
    props: {},
  };
};
