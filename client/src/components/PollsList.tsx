import { PollDbProps } from "@js-alt-poll/common";
import { useRouter } from "next/router";
import { Card } from "./Card";
import { ListItemWrapper } from "./ListItemWrapper";

export const PollsList = ({ polls }: { polls: PollDbProps[] }) => {
  const { query, push, pathname } = useRouter();

  return (
    <>
      {polls?.map(({ title, description, open, id }) => (
        <ListItemWrapper
          onClick={() => {
            delete query.view;
            push({
              pathname,
              query: { ...query, id },
            });
          }}
        >
          <div>
            <b>{title}</b>
          </div>
          <div>{description}</div>
          <div>Open: {open + ""}</div>
        </ListItemWrapper>
      ))}
    </>
  );
};
