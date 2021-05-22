import { useMutation, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import { useState } from "react";
import { hasClient } from "./_app";

const App: React.FC = () => {
  const [text, setText] = useState("");
  const [path, setPath] = useState("https://alt-poll.dev/");

  const { mutateAsync: post, data: postData, error: postErr } = useMutation(
    () => {
      return axios.post(path, JSON.parse(text));
    }
  );
  const { mutateAsync: put, data: putData, error: putErr } = useMutation(() => {
    return axios.put(path, JSON.parse(text));
  });
  const { mutateAsync: get, data: getData, error: getErr } = useMutation(() => {
    return axios.get(path, JSON.parse(text));
  });

  console.log(
    "%c post ",
    "background: purple; color: white",
    postData,
    postErr
  );
  console.log("%c put ", "background: purple; color: white", putData, putErr);

  return (
    <div>
      <input value={path} onChange={(e) => setPath(e.target.value)} />
      <button onClick={() => get()}>get</button>
      <button onClick={() => post()}>post</button>
      <button onClick={() => put()}>put</button>
      <textarea onChange={(e) => setText(e.target.value)} value={text} />
      <style jsx>{`
        input {
          color: black;
        }
        textarea {
          color: black;
        }
      `}</style>
    </div>
  );
};

export default function Home({ queryClient }: hasClient) {
  console.log("here");
  return (
    <>
      <App />
      <ReactQueryDevtools />
    </>
  );
}
