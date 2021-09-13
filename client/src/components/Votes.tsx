import { Container } from "@chakra-ui/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { isLocalDev } from "../isLocalDev";
import { Card } from "./Card";
import { DragAndDropList } from "./DragAndDropList";

type Opt = {
  otp_title: string;
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
            otp_title: "abc",
            opt_descr: "asdf",
            poll_descr: "poll descr",
            poll_title: "my poll",
          },
          {
            otp_title: "vote for m3",
            opt_descr: "asdfdasfasdf",
            poll_descr: "poll descr",
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
      voting page
      {data?.map(({ opt_descr, otp_title, poll_descr, poll_title }) => {
        return (
          <Card depth={2} margin="2">
            <Container padding="3">
              <div>{otp_title}</div>
              <div>{opt_descr}</div>
            </Container>
          </Card>
        );
      })}
      <DragAndDropList />
    </div>
  );
};
