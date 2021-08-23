import * as React from "react";
import { OptionDbProps } from "@js-alt-poll/common";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { OptionsForm, OptionsFormProps } from "./OptionsForm";
import axios from "axios";

interface OptionsUpdateProps
  extends Omit<
    OptionsFormProps,
    "initialDesc" | "initialTitle" | "onDataChange" | "onSubmit"
  > {
  pollId: string;
  optionId: string;
}

export const OptionsUpdate: React.FC<OptionsUpdateProps> = ({
  onBack,
  pollId,
  optionId,
}) => {
  const [opt, setOpt] = React.useState({ title: "", description: "" });

  const { data } = useQuery(["option", optionId], async () => {
    return axios.get(`/api/polls/${pollId}/options/${optionId}`);
  });

  const { mutate: updateOption, isLoading } = useMutation(async () => {
    await axios.put(`/api/polls/${pollId}/options/${optionId}`, {
      ...opt,
    });

    // await queryClient.refetchQueries("polls");
    onBack();
  });

  console.log("%c data ", "background: purple; color: white", data);
  return (
    <OptionsForm
      onBack={onBack}
      onDataChange={({ title = "", description = "" }) =>
        setOpt({ title, description })
      }
      onSubmit={updateOption}
    />
  );
};
