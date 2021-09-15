import { Container } from "@chakra-ui/layout";
import { OptionDbProps } from "@js-alt-poll/common";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Sortable from "sortablejs";
import { Card } from "./Card";
import { Opt } from "./Votes";

export const DragAndDropList = ({ options }: { options: Opt[] }) => {
  const [list, setList] = useState(options);

  return (
    <ReactSortable
      animation={100}
      list={list.map((item) => ({ ...item, id: item.opt_id }))}
      setList={setList}
    >
      {list?.map(({ opt_title, opt_descr }) => (
        <Card id={opt_title} depth={2} margin="2">
          <Container padding="3" cursor="pointer">
            <div>{opt_title}</div>
            <div>{opt_descr}</div>
          </Container>
        </Card>
      ))}
    </ReactSortable>
  );
};
