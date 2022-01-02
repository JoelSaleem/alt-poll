import { Box, Center, Heading, Input } from "@chakra-ui/react";
import { OptionDbProps } from "@js-alt-poll/common";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import { useQuery } from "react-query";
import { useOptionView } from "../hooks/useOptionView";
import { isLocalDev } from "../isLocalDev";
import { Button } from "./Button";
import { ListItemWrapper } from "./ListItemWrapper";
import { OptionsCreate } from "./OptionsCreate";
import { OptionsForm } from "./OptionsForm";
import { OptionsUpdate } from "./OptionsUpdate";

export const Options = () => {
  const { push, pathname, query } = useRouter();
  const [view, setView] = useOptionView();

  const { data, isLoading } = useQuery<OptionDbProps[]>("options", async () => {
    if (!isLocalDev) {
      const d = await axios.get(`/api/polls/${query.pollId}/options`);
      return d.data;
    }

    const data: OptionDbProps[] = [
      {
        created_at: "adsf",
        description: "asdf",
        id: "2",
        poll_id: "1",
        title: "234",
        user_id: "2",
        version: 3,
      },
    ];
    return data;
  });

  const isValidIdParam = (id: string | string[] | undefined) =>
    !Array.isArray(id) && !!id;

  return (
    <div>
      {(() => {
        if (view == "list") {
          return (
            <>
              {data?.map(({ title, description, id }) => {
                return (
                  <ListItemWrapper
                    onClick={() => {
                      setView("update", {
                        pollId: query.pollId as string,
                        optionId: id,
                      });
                    }}
                    key={id}
                  >
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
                    push({ query: { id: query.pollId }, pathname: "/" });
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    // @ts-ignore
                    setView("create", { pollId: query.pollId });
                  }}
                >
                  Add Option
                </Button>
              </Center>
            </>
          );
        } else if (view == "create" && query.pollId) {
          return (
            <OptionsCreate
              // @ts-ignore
              onBack={() => setView("list", { ...query })}
              pollId={query.pollId as string}
            />
          );
        } else if (
          view == "update" &&
          isValidIdParam(query.pollId) &&
          isValidIdParam(query.optionId)
        ) {
          return (
            <OptionsUpdate
              // @ts-ignore
              onBack={() => setView("list", { ...query })}
              optionId={query.optionId as string}
              pollId={query.pollId as string}
            />
          );
        } else {
          // setView("list". {...query});
        }
      })()}
    </div>
  );
};
