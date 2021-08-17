import { Box, Center, Heading, Input } from "@chakra-ui/react";
import { OptionDbProps } from "@js-alt-poll/common";
import { useRouter } from "next/router";
import * as React from "react";
import { Button } from "./Button";
import { ListItemWrapper } from "./ListItemWrapper";

type OptionViews = "create" | "update" | "list";

export const Options = () => {
  const options: OptionDbProps[] = [
    {
      created_at: "10-10-10",
      description: "desc",
      title: "title d",
      id: "1",
      poll_id: "2",
      user_id: "adfadsf",
      version: 2,
    },
    {
      created_at: "10-10-10",
      description: "descd ",
      title: "title",
      id: "2",
      poll_id: "2",
      user_id: "adfadsf",
      version: 2,
    },
  ];
  const [title, setTitle] = React.useState("");
  const { push, pathname, query } = useRouter();
  const [optionView, setOptionView] = React.useState<OptionViews>("list");

  return (
    <div>
      <Center>
        <Heading>Options</Heading>
      </Center>

      {(() => {
        if (optionView == "list") {
          return (
            <>
              {options.map(({ title, description, id }) => {
                return (
                  <ListItemWrapper>
                    <div>
                      <b>{title}</b>
                    </div>
                    <div>{description}</div>
                  </ListItemWrapper>
                );
              })}
              <Center>
                <Button
                  variant="secondary"
                  onClick={() => {
                    delete query.view;
                    push({ query: { ...query }, pathname });
                  }}
                >
                  Back
                </Button>
              </Center>
            </>
          );
        } else if (optionView == "create") {
          return <div>Create</div>;
        } else if (optionView == "update") {
          return <div>Update</div>;
        }
      })()}
    </div>
  );
};
