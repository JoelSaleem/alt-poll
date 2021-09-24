import { Center, Container, Heading, Text } from "@chakra-ui/layout";
import { typography } from "@chakra-ui/styled-system";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { isLocalDev } from "../isLocalDev";
import { DragAndDropList } from "./DragAndDropList";

export type Opt = {
  opt_id: string;
  opt_title: string;
  opt_descr: string;
  poll_title: string;
  poll_descr: string;
};

export const Votes = () => {
  const {
    query: { otp },
  } = useRouter();

  if (!otp) {
    return <div>Could not verify voting link</div>;
  }

  const { data, isLoading } = useQuery(
    ["votes", otp],
    async (): Promise<Opt[]> => {
      if (isLocalDev) {
        return [
          {
            opt_id: "asdassf",
            opt_title: "abc",
            opt_descr: "asdf",
            poll_descr: "poll descr",
            poll_title: "my poll",
          },
          {
            opt_id: "asdf",
            opt_title: "vote for m3",
            opt_descr: "asdfdasfasdf",
            poll_descr: "poll descr",
            poll_title: "my poll",
          },
          {
            opt_id: "asdfass",
            opt_title: "vote",
            opt_descr: "asdf sdfdasfasdf",
            poll_descr: "poll d asdescr",
            poll_title: "my poll",
          },
        ];
      }

      const res = await axios.get(`/api/votes/options/${otp}`);

      return res.data;
    }
  );

  if (isLoading) return <div> Loading</div>;

  const title = data && data.length > 0 ? data?.[0].poll_title : "unknown poll";

  return (
    <div>
      <Center padding="3">
        <Heading>{title}</Heading>
      </Center>
      <Center padding="3">
        <Text>Order your votes</Text>
      </Center>
      <DragAndDropList options={data ?? []} />
    </div>
  );
};
