import { Input } from "@chakra-ui/input";
import { Box, Center, Heading, Text } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import { Textarea } from "@chakra-ui/textarea";
import { PollDbProps } from "@js-alt-poll/common";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { PollCreate } from "../../types";
import { usePollForm } from "../hooks/usePollForm";
import { Button } from "./Button";
import { PollForm } from "./PollForm";

export const PollUpdate = ({
  poll,
  onBack,
}: {
  poll: PollCreate & Partial<PollDbProps>;
  onBack: () => void;
}) => {
  const { push } = useRouter();
  const {
    title,
    description,
    open,
    closed,
    setTitle,
    setDescription,
    setOpen,
    setClosed,
  } = usePollForm(poll);
  const queryClient = useQueryClient();

  const { mutate: updatePoll, isLoading } = useMutation(async () => {
    await axios.put(`/api/polls/${poll.id}`, {
      title,
      open,
      closed,
      description,
    });

    await queryClient.invalidateQueries("polls");
    onBack();
  });

  return (
    <>
      <PollForm
        onBack={onBack}
        setClosed={setClosed}
        setDescription={setDescription}
        setOpen={setOpen}
        setTitle={setTitle}
        onSubmit={updatePoll}
        poll={{ title, closed, open, description, id: poll.id }}
        isLoading={isLoading}
      />
      {closed ? (
        <Center padding={"4"}>
          <Button
            onClick={() => {
              push({
                pathname: "/results",
                query: {
                  pollId: poll.id,
                },
              });
            }}
          >
            Results
          </Button>
        </Center>
      ) : null}
    </>
  );
};
