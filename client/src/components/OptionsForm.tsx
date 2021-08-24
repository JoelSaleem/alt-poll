import * as React from "react";
import { Box, Center, Input } from "@chakra-ui/react";
import { OptionDbProps } from "@js-alt-poll/common";
import { Button } from "./Button";

export interface OptionsFormProps {
  onBack: () => void;
  onDataChange: (data: Partial<OptionDbProps>) => void;
  initialTitle?: string;
  initialDesc?: string;
  onSubmit: () => void;
}

export const OptionsForm: React.FC<OptionsFormProps> = ({
  onBack,
  onDataChange,
  onSubmit,
  initialDesc,
  initialTitle,
}) => {
  const [title, setTitle] = React.useState(initialTitle);
  const [description, setDescription] = React.useState(initialDesc);

  React.useEffect(() => {
    if (title != null && description != null) {
      onDataChange({ title, description });
    }
  }, [title, description]);

  React.useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDesc);
  }, [initialTitle, initialDesc]);

  return (
    <>
      <Box>
        Title
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Box>

      <Box>
        Description
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>

      <Center>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onSubmit}>Save</Button>
      </Center>
    </>
  );
};
