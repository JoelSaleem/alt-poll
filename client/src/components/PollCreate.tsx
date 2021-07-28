import { Center } from "@chakra-ui/react";
import { PollDbProps } from "@js-alt-poll/common";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { PollCreate as PollCreateType } from "../../types";
import { usePollForm } from "../hooks/usePollForm";
import { Button } from "./Button";
import { PollForm } from "./PollForm";

interface PollCreateProps {
  onBack: () => void;
}

export const PollCreate: React.FC<PollCreateProps> = ({ onBack }) => {
  const {
    closed,
    description,
    open,
    setClosed,
    setDescription,
    setOpen,
    setTitle,
    title,
  } = usePollForm();
  const queryClient = useQueryClient();

  const { mutate: createPoll, isLoading } = useMutation(async () => {
    await axios.post(`/api/polls`, {
      title,
      open,
      closed,
      description,
    });

    await queryClient.refetchQueries("polls");
    onBack();
  });

  return (
    <div>
      <PollForm
        onBack={onBack}
        poll={{ closed, description, open, title }}
        setClosed={setClosed}
        setDescription={setDescription}
        setTitle={setTitle}
        setOpen={setOpen}
        onSubmit={createPoll}
        isLoading={isLoading}
      />
    </div>
  );
};
