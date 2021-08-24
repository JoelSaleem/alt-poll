import * as React from "react";
import { OptionDbProps } from "@js-alt-poll/common";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { OptionsForm, OptionsFormProps } from "./OptionsForm";
import axios from "axios";

interface OptionsCreateProps
  extends Omit<
    OptionsFormProps,
    "initialDesc" | "initialTitle" | "onDataChange" | "onSubmit"
  > {
  pollId: string;
}

export const OptionsCreate: React.FC<OptionsCreateProps> = ({
  onBack,
  pollId,
}) => {
  const [option, setOption] = React.useState({ title: "", description: "" });

  const queryClient = useQueryClient();

  const { mutate: createOption, isLoading } = useMutation(async () => {
    await axios.post(`/api/polls/${pollId}/options`, { ...option });

    await queryClient.refetchQueries("options");
    onBack();
  });

  return (
    <OptionsForm
      onBack={onBack}
      onDataChange={({ title, description }) => {
        setOption({ title: title ?? "", description: description ?? "" });
      }}
      onSubmit={createOption}
    />
  );
};
