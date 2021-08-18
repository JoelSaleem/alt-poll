import { Box, Center, Heading, Input } from "@chakra-ui/react";
import { OptionDbProps } from "@js-alt-poll/common";
import { useRouter } from "next/router";
import * as React from "react";
import { useOptionView } from "../hooks/useOptionView";
import { Button } from "./Button";
import { ListItemWrapper } from "./ListItemWrapper";
import { OptionsForm } from "./OptionsForm";

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
  const { push, pathname, query } = useRouter();
  const [view, setView] = useOptionView();

  return (
    <div>
      {(() => {
        if (view == "list") {
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
                    push({ query: { id: query.pollId }, pathname: "/polls" });
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    setView("create");
                  }}
                >
                  Add Option
                </Button>
              </Center>
            </>
          );
        } else if (view == "create") {
          return (
            <OptionsForm onBack={() => setView("list")} onSubmit={() => {}} />
          );
        } else if (view == "update") {
          return (
            <OptionsForm onBack={() => setView("list")} onSubmit={() => {}} />
          );
        }
      })()}
    </div>
  );
};
