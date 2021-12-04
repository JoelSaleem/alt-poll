import { Center, Container } from "@chakra-ui/layout";
import { OptionDbProps } from "@js-alt-poll/common";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import { ReactSortable } from "react-sortablejs";
import Sortable from "sortablejs";
import { Button } from "./Button";
import { Card } from "./Card";
import { Opt } from "./Votes";

const serialiseListToVotes = (options: Opt[]) => {
  return options.map(({ opt_id }, idx) => ({ optId: opt_id, rank: idx }));
};

export const DragAndDropList = ({ options }: { options: Opt[] }) => {
  const [list, setList] = useState(options);

  const {
    query: { otp },
    push,
  } = useRouter();

  const {
    mutateAsync: vote,
    data: postData,
    error: postErr,
  } = useMutation(() => {
    const votes = serialiseListToVotes(list);
    return axios.post(`/api/votes/${otp}`, { votes });
  });


  return (
    <>
      <ReactSortable
        animation={100}
        list={list.map((item) => ({ ...item, id: item.opt_id }))}
        setList={setList}
      >
        {list?.map(({ opt_title, opt_descr }) => (
          <Card id={opt_title} depth={2} margin="2">
            <Container padding="3" cursor="grab">
              <div>{opt_title}</div>
              <div>{opt_descr}</div>
            </Container>
          </Card>
        ))}
      </ReactSortable>
      <Center>
        <Button
          onClick={async () => {
            await vote();
            push("/thank-you");
          }}
        >
          Save
        </Button>
      </Center>
    </>
  );
};
