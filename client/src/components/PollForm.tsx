import { Box, Center, Heading, Text } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import { Textarea } from "@chakra-ui/textarea";
import { PollDbProps } from "@js-alt-poll/common";
import { useRouter } from "next/router";
import { Button } from "./Button";

export const PollForm = ({ poll }: { poll: PollDbProps }) => {
  const { pathname, query, push } = useRouter();
  const { title, open, closed, description } = poll;

  return (
    <div>
      <Center>
        <Heading>{title}</Heading>
      </Center>
      <Box>
        Open: <Switch isChecked={open} />
      </Box>
      <Box>
        Closed: <Switch isChecked={closed} />
      </Box>
      <Text>Description</Text>
      <Textarea value={description} />

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
        <Button>Save</Button>
        <Button>Send voting link</Button>
      </Center>
    </div>
  );
};
