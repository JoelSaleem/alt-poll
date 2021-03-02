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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState("");
  const [closed, setClosed] = useState("");

  const { mutateAsync, data, error, status, isLoading } = useMutation(() => {
    return axios.post(path, {
      open: open == "true",
      closed: closed == "true",
      title,
      description,
    });
  });
  const { mutateAsync: updateMut } = useMutation(() => {
    return axios.put(path, {
      open: open == "true",
      closed: closed == "true",
      title,
      description,
    });
  });

  const {
    mutateAsync: createOption,
    error: optErr,
    data: optData,
  } = useMutation(() => {
    return axios.post(path, {
      title: "some title",
    });
  });

  console.log("%c stuff ", "background: purple; color: white", optErr, optData);

  return (
    <>
      <div>
        <button
          onClick={() => {
            createOption();
          }}
        >
          click
        </button>
        <input value={path} onChange={(e) => setPath(e.target.value)} />
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input value={open} onChange={(e) => setOpen(e.target.value)} />
        <input value={closed} onChange={(e) => setClosed(e.target.value)} />
        <button
          onClick={async () => {
            await mutateAsync();
          }}
        >
          create
        </button>
        <button
          onClick={async () => {
            await updateMut();
          }}
        >
          update
        </button>
      </div>
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
