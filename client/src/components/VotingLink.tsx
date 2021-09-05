import { useEffect, useState } from "react";
import { useCopyToClipboard } from "react-use";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useEffectOnce } from "react-use";
import { Input } from "@chakra-ui/input";
import Icon from "@chakra-ui/icon";
import { LinkIcon } from "@chakra-ui/icons";
import { Center, Flex } from "@chakra-ui/layout";
import { Button } from "./Button";

export const VotingLink = () => {
  const {
    query: { pollId },
  } = useRouter();

  const [, copyToClipboard] = useCopyToClipboard();

  const {
    mutate: getOtp,
    isLoading,
    data,
  } = useMutation(async () => {
    if (!pollId) return;
    const res = await axios.post(`/api/votes/${pollId}/otp/`);
    return res.data;
  });

  useEffectOnce(() => {
    getOtp();
  });

  console.log("%c data ", "background: purple; color: white", data);
  const votingUrl = `https://alt-poll.dev/votes?otp=${data?.id}`;
  return (
    <div>
      your voting link:
      {data?.id && (
        <Flex>
          <Input
            disabled
            style={{ cursor: "pointer", opacity: 0.9 }}
            value={votingUrl}
          />
          <Center pl="2">
            <Button onClick={() => copyToClipboard(votingUrl)}>
              <LinkIcon />
            </Button>
          </Center>
        </Flex>
      )}
    </div>
  );
};
