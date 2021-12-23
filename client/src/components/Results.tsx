import { Box, Center, Heading, Input, Text } from "@chakra-ui/react";
import { OptionDbProps } from "@js-alt-poll/common";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import { useQuery } from "react-query";
import { useMeasure } from "react-use";
import { useOptionView } from "../hooks/useOptionView";
import { isLocalDev } from "../isLocalDev";
import { BarChart } from "./BarChart";
import { Button } from "./Button";
import { ListItemWrapper } from "./ListItemWrapper";
import { OptionsCreate } from "./OptionsCreate";
import { OptionsForm } from "./OptionsForm";
import { OptionsUpdate } from "./OptionsUpdate";
import {
  useWinnerCalculator,
  Vote,
  WinnerCalculator,
} from "./WinnerCalculator";

const results = [
  {
    id: "25",
    option_id: "8",
    title: "a",
    rank: 0,
    description: "",
    voter_id: "ckxgbna93000110loeo02ehpe",
  },
  {
    id: "26",
    option_id: "11",
    title: "d",
    rank: 1,
    description: "",
    voter_id: "ckxgbna93000110loeo02ehpe",
  },
  {
    id: "27",
    option_id: "12",
    title: "e",
    rank: 2,
    description: "",
    voter_id: "ckxgbna93000110loeo02ehpe",
  },
  {
    id: "28",
    option_id: "10",
    title: "c",
    rank: 3,
    description: "",
    voter_id: "ckxgbna93000110loeo02ehpe",
  },
  {
    id: "29",
    option_id: "9",
    title: "b",
    rank: 4,
    description: "",
    voter_id: "ckxgbna93000110loeo02ehpe",
  },
  {
    id: "30",
    option_id: "8",
    title: "a",
    rank: 0,
    description: "",
    voter_id: "ckxgbnk40000310lo1rg76tav",
  },
  {
    id: "31",
    option_id: "11",
    title: "d",
    rank: 1,
    description: "",
    voter_id: "ckxgbnk40000310lo1rg76tav",
  },
  {
    id: "32",
    option_id: "10",
    title: "c",
    rank: 2,
    description: "",
    voter_id: "ckxgbnk40000310lo1rg76tav",
  },
  {
    id: "33",
    option_id: "12",
    title: "e",
    rank: 3,
    description: "",
    voter_id: "ckxgbnk40000310lo1rg76tav",
  },
  {
    id: "34",
    option_id: "9",
    title: "b",
    rank: 4,
    description: "",
    voter_id: "ckxgbnk40000310lo1rg76tav",
  },
  {
    id: "35",
    option_id: "10",
    title: "c",
    rank: 0,
    description: "",
    voter_id: "ckxgbnsuw000510logxd68kln",
  },
  {
    id: "36",
    option_id: "8",
    title: "a",
    rank: 1,
    description: "",
    voter_id: "ckxgbnsuw000510logxd68kln",
  },
  {
    id: "37",
    option_id: "12",
    title: "e",
    rank: 2,
    description: "",
    voter_id: "ckxgbnsuw000510logxd68kln",
  },
  {
    id: "38",
    option_id: "11",
    title: "d",
    rank: 3,
    description: "",
    voter_id: "ckxgbnsuw000510logxd68kln",
  },
  {
    id: "39",
    option_id: "9",
    title: "b",
    rank: 4,
    description: "",
    voter_id: "ckxgbnsuw000510logxd68kln",
  },
  {
    id: "40",
    option_id: "8",
    title: "a",
    rank: 0,
    description: "",
    voter_id: "ckxgbo4u4000710lo3dg39yyz",
  },
  {
    id: "41",
    option_id: "11",
    title: "d",
    rank: 1,
    description: "",
    voter_id: "ckxgbo4u4000710lo3dg39yyz",
  },
  {
    id: "42",
    option_id: "9",
    title: "b",
    rank: 2,
    description: "",
    voter_id: "ckxgbo4u4000710lo3dg39yyz",
  },
  {
    id: "43",
    option_id: "12",
    title: "e",
    rank: 3,
    description: "",
    voter_id: "ckxgbo4u4000710lo3dg39yyz",
  },
  {
    id: "44",
    option_id: "10",
    title: "c",
    rank: 4,
    description: "",
    voter_id: "ckxgbo4u4000710lo3dg39yyz",
  },
  {
    id: "45",
    option_id: "10",
    title: "c",
    rank: 0,
    description: "",
    voter_id: "ckxgboap4000910lo1xgrc6dy",
  },
  {
    id: "46",
    option_id: "8",
    title: "a",
    rank: 1,
    description: "",
    voter_id: "ckxgboap4000910lo1xgrc6dy",
  },
  {
    id: "47",
    option_id: "11",
    title: "d",
    rank: 2,
    description: "",
    voter_id: "ckxgboap4000910lo1xgrc6dy",
  },
  {
    id: "48",
    option_id: "12",
    title: "e",
    rank: 3,
    description: "",
    voter_id: "ckxgboap4000910lo1xgrc6dy",
  },
  {
    id: "49",
    option_id: "9",
    title: "b",
    rank: 4,
    description: "",
    voter_id: "ckxgboap4000910lo1xgrc6dy",
  },
];

export const Results = () => {
  const { query, push } = useRouter();

  // TODO: if no query.id

  const { data, isLoading } = useQuery(
    ["votesForPoll", [query.id]],
    async () => {
      if (isLocalDev) return results;

      const r = await axios.get(`/api/votes?pollId=${query.id}`);
      return r.data;
    }
  );

  const [bars, setBars] = React.useState<any>([]);
  const { advanceRound, getWinner, round, votesForOption, votesForVoter } =
    useWinnerCalculator(data ?? []);

  const [ref, { width, height }] = useMeasure();
  console.log("{ width, height }", { width, height });

  React.useEffect(() => {
    let b: any = [];

    for (const [optId, votes] of Object.entries(votesForOption)) {
      b.push({ optId, votes: votes.length, title: votes?.[0].title });
    }

    setBars([...b]);
  }, [votesForOption, round, data]);

  const winner =
    (getWinner() != null && votesForOption[getWinner() ?? 0]?.[0]?.title) ||
    "??";

  return (
    <>
      <Center>
        <Text fontSize="5xl">Winner: {winner}</Text>
      </Center>
      <Center ref={(c) => c && ref(c)} height="100%">
        <BarChart height={height * 0.6} width={width * 0.8} data={bars} />
      </Center>

      <Center>
        <Button
          style={{ margin: 4 }}
          onClick={() => push({ pathname: "/polls", query: { ...query } })}
        >
          Back
        </Button>
        {Object.keys(votesForOption).length > 1 ? (
          <Button style={{ margin: 4 }} onClick={advanceRound}>
            Next round
          </Button>
        ) : null}
      </Center>
    </>
  );
};
