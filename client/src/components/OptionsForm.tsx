import * as React from "react";
import { Box, Center, Input } from "@chakra-ui/react";
import { OptionDbProps } from "@js-alt-poll/common";
import { Button } from "./Button";

interface OptionsFormProps {
  onBack: () => void;
  onSubmit: (data: Partial<OptionDbProps>) => void;
  initialTitle?: string;
  initialDesc?: string;
}

export const OptionsForm: React.FC<OptionsFormProps> = ({
  onBack,
  onSubmit,
  initialDesc,
  initialTitle,
}) => {
  const [title, setTitle] = React.useState(initialTitle);
  const [description, setDescription] = React.useState(initialDesc);
  return (
    <>
      <Box>
        Title
        <Input />
      </Box>

      <Box>
        Description
        <Input />
      </Box>

      <Center>
        <Button onClick={onBack}>Back</Button>
        <Button onSubmit={() => onSubmit({})}>Save</Button>
      </Center>
    </>
  );
};
