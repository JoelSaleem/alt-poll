import { Input } from "@chakra-ui/input";
import { Box, Center, Heading, Text } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import { Textarea } from "@chakra-ui/textarea";
import { PollDbProps } from "@js-alt-poll/common";
import axios from "axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { PollCreate } from "../../types";
import { Button } from "./Button";

interface PollFormProps {
  poll: PollCreate & Partial<PollDbProps>;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setClosed: Dispatch<SetStateAction<boolean>>;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PollForm: React.FC<PollFormProps> = ({
  poll,
  setTitle,
  setDescription,
  setOpen,
  setClosed,
  onBack,
  onSubmit,
  isLoading,
}) => {
  const { title, open, closed, description } = poll;

  return (
    <div>
      <Center>
        <Heading>Poll</Heading>
      </Center>

      <Box>
        title:
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Box>

      <Box>
        Open:
        <Switch isChecked={open} onChange={(e) => setOpen(e.target.checked)} />
      </Box>

      <Box>
        Closed:
        <Switch
          isChecked={closed}
          onChange={(e) => setClosed(e.target.checked)}
        />
      </Box>

      <Text>Description</Text>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Center>
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        {isLoading ? (
          "// TODO: spinner"
        ) : (
          <Button onClick={onSubmit}>Save</Button>
        )}
        <Button>Send voting link</Button>
      </Center>
    </div>
  );
};
