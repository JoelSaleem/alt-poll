import { Input } from "@chakra-ui/input";
import { Box, Center, Heading, Text } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import { Textarea } from "@chakra-ui/textarea";
import { PollDbProps } from "@js-alt-poll/common";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "./Button";

export const PollForm = ({ poll }: { poll: PollDbProps }) => {
  const { pathname, query, push } = useRouter();
  const {
    title: initialTitle,
    open: initialOpen,
    closed: initialClosed,
    description: initialDescription,
  } = poll;

  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(initialOpen);
  const [closed, setClosed] = useState(initialClosed);
  const [description, setDescription] = useState(initialDescription);

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
        <Button
          variant="secondary"
          onClick={() => {
            delete query.id;
            push({
              pathname,
              query,
            });
          }}
        >
          Back
        </Button>
        <Button onClick={() => {}}>Save</Button>
        <Button>Send voting link</Button>
      </Center>
    </div>
  );
};
