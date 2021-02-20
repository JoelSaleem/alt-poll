import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQuery,
  QueryClientProvider,
} from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query-devtools";
import { useState } from "react";

const client = new QueryClient();

const App: React.FC = () => {
  const [path, setPath] = useState("");
  const { mutateAsync, data, error, status, isLoading } = useMutation(() =>
    axios.post(path)
  );
  console.log(
    "%c stuff ",
    "background: purple; color: white",
    status,
    error,
    data,
    isLoading
  );

  return (
    <>
      <input value={path} onChange={(e) => setPath(e.target.value)} />
      <button
        onClick={async () => {
          await mutateAsync();
        }}
      >
        test
      </button>
    </>
  );
};

export default function Home() {
  return (
    <>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </>
  );
}
