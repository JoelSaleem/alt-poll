import { Box, Center, Heading, Input } from "@chakra-ui/react";
import { OptionDbProps } from "@js-alt-poll/common";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import { useQuery } from "react-query";
import { useOptionView } from "../hooks/useOptionView";
import { isLocalDev } from "../isLocalDev";
import { Button } from "./Button";
import { ListItemWrapper } from "./ListItemWrapper";
import { OptionsCreate } from "./OptionsCreate";
import { OptionsForm } from "./OptionsForm";
import { OptionsUpdate } from "./OptionsUpdate";

/* 
[
{id: "97", title: "asd", rank: 0, description: "as"},
{id: "101", title: "asd", rank: 1, description: "as"},
{id: "99", title: "ASD", rank: 2, description: "sdd"},
{id: "100", title: "ASD", rank: 0, description: "sdd"},
{id: "98", title: "asdf", rank: 1, description: "asdf"},
{id: "102", title: "asdf", rank: 2, description: "asdf"}
]

*/

export const Results = () => {
  const { query } = useRouter();
  const { data, isLoading } = useQuery(
    ["votesForPoll", [query.id]],
    async () => {
      const r = await axios.get(`/api/votes?pollId=${query.id}`);
      return r.data;
    }
  );

  console.log("%c data ", "background: purple; color: white", data);
  return <div>Results</div>;
};
