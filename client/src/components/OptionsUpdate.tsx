import * as React from "react";
import { OptionDbProps } from "@js-alt-poll/common";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { OptionsForm, OptionsFormProps } from "./OptionsForm";
import axios from "axios";
import { isLocalDev } from "../isLocalDev";

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
    if (!isLocalDev) {
      const r = await axios.get(`/api/polls/${pollId}/options/${optionId}`);
      return r.data;
    }
    return {
      created_at: "adsf",
      description: "asdf",
      id: "2",
      poll_id: "1",
      title: "234",
      user_id: "2",
      version: 3,
    };
  });

  const { mutate: updateOption, isLoading } = useMutation(async () => {
    await axios.put(`/api/polls/${pollId}/options/${optionId}`, {
      ...opt,
    });

    // await queryClient.refetchQueries("polls");
    onBack();
  });

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
