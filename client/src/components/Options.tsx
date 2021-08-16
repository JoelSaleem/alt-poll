import { Box, Center, Heading, Input } from "@chakra-ui/react";
import { OptionDbProps } from "@js-alt-poll/common";
import * as React from "react";

export const Options = () => {
  const options: OptionDbProps[] = [
    {
      created_at: "10-10-10",
      description: "desc",
      title: "title",
      id: "1",
      poll_id: "2",
      user_id: "adfadsf",
      version: 2,
    },
    {
      created_at: "10-10-10",
      description: "desc",
      title: "title",
      id: "2",
      poll_id: "2",
      user_id: "adfadsf",
      version: 2,
    },
  ];
  const [title, setTitle] = React.useState("");
  return (
    <div>
      <Center>
        <Heading>Option</Heading>
      </Center>

      {/* <Box>
        title:
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Box> */}
    </div>
  );
};
