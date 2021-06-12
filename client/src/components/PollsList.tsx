import { PollDbProps } from "@js-alt-poll/common";
import { useRouter } from "next/router";
import { Card } from "./Card";

export const PollsList = ({ polls }: { polls: PollDbProps[] }) => {
  const { query, push, pathname } = useRouter();

  return (
    <>
      {polls?.map(({ title, description, open, id }) => (
        <Card
          key={id}
          depth={2}
          margin={2}
          maxH={24}
          padding={3}
          hoverColour={"brand.accent"}
          activeColour={"brand.superAccent"}
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
        </Card>
      ))}
    </>
  );
};
