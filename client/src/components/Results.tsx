import { Box, Center, Heading, Input } from "@chakra-ui/react";
import { OptionDbProps } from "@js-alt-poll/common";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import { useQuery } from "react-query";
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

const results: Vote[] = [
  {
    id: "104",
    option_id: "51",
    title: "a",
    rank: 1,
    description: "",
    voter_id: "ckucpq9f6000a10mt6duogkui",
  },
  {
    id: "112",
    option_id: "51",
    title: "a",
    rank: 3,
    description: "",
    voter_id: "ckucpqm24000b10mtgslr76zs",
  },
  {
    id: "116",
    option_id: "51",
    title: "a",
    rank: 1,
    description: "",
    voter_id: "ckucpqsqv000c10mt4u68ddex",
  },
  {
    id: "123",
    option_id: "51",
    title: "a",
    rank: 2,
    description: "",
    voter_id: "ckucpqyfp000d10mt72f16wxr",
  },
  {
    id: "128",
    option_id: "51",
    title: "a",
    rank: 1,
    description: "",
    voter_id: "ckucpr2dm000e10mt79dth9e2",
  },
  {
    id: "103",
    option_id: "52",
    title: "b",
    rank: 0,
    description: "",
    voter_id: "ckucpq9f6000a10mt6duogkui",
  },
  {
    id: "113",
    option_id: "52",
    title: "b",
    rank: 4,
    description: "",
    voter_id: "ckucpqm24000b10mtgslr76zs",
  },
  {
    id: "118",
    option_id: "52",
    title: "b",
    rank: 3,
    description: "",
    voter_id: "ckucpqsqv000c10mt4u68ddex",
  },
  {
    id: "122",
    option_id: "52",
    title: "b",
    rank: 1,
    description: "",
    voter_id: "ckucpqyfp000d10mt72f16wxr",
  },
  {
    id: "131",
    option_id: "52",
    title: "b",
    rank: 4,
    description: "",
    voter_id: "ckucpr2dm000e10mt79dth9e2",
  },
  {
    id: "107",
    option_id: "53",
    title: "d",
    rank: 4,
    description: "",
    voter_id: "ckucpq9f6000a10mt6duogkui",
  },
  {
    id: "110",
    option_id: "53",
    title: "d",
    rank: 1,
    description: "",
    voter_id: "ckucpqm24000b10mtgslr76zs",
  },
  {
    id: "115",
    option_id: "53",
    title: "d",
    rank: 0,
    description: "",
    voter_id: "ckucpqsqv000c10mt4u68ddex",
  },
  {
    id: "125",
    option_id: "53",
    title: "d",
    rank: 4,
    description: "",
    voter_id: "ckucpqyfp000d10mt72f16wxr",
  },
  {
    id: "127",
    option_id: "53",
    title: "d",
    rank: 0,
    description: "",
    voter_id: "ckucpr2dm000e10mt79dth9e2",
  },
  {
    id: "106",
    option_id: "54",
    title: "e",
    rank: 3,
    description: "",
    voter_id: "ckucpq9f6000a10mt6duogkui",
  },
  {
    id: "111",
    option_id: "54",
    title: "e",
    rank: 2,
    description: "",
    voter_id: "ckucpqm24000b10mtgslr76zs",
  },
  {
    id: "117",
    option_id: "54",
    title: "e",
    rank: 2,
    description: "",
    voter_id: "ckucpqsqv000c10mt4u68ddex",
  },
  {
    id: "121",
    option_id: "54",
    title: "e",
    rank: 0,
    description: "",
    voter_id: "ckucpqyfp000d10mt72f16wxr",
  },
  {
    id: "129",
    option_id: "54",
    title: "e",
    rank: 2,
    description: "",
    voter_id: "ckucpr2dm000e10mt79dth9e2",
  },
  {
    id: "108",
    option_id: "55",
    title: "b",
    rank: 5,
    description: "",
    voter_id: "ckucpq9f6000a10mt6duogkui",
  },
  {
    id: "114",
    option_id: "55",
    title: "b",
    rank: 5,
    description: "",
    voter_id: "ckucpqm24000b10mtgslr76zs",
  },
  {
    id: "120",
    option_id: "55",
    title: "b",
    rank: 5,
    description: "",
    voter_id: "ckucpqsqv000c10mt4u68ddex",
  },
  {
    id: "124",
    option_id: "55",
    title: "b",
    rank: 3,
    description: "",
    voter_id: "ckucpqyfp000d10mt72f16wxr",
  },
  {
    id: "132",
    option_id: "55",
    title: "b",
    rank: 5,
    description: "",
    voter_id: "ckucpr2dm000e10mt79dth9e2",
  },
  {
    id: "105",
    option_id: "56",
    title: "f",
    rank: 2,
    description: "",
    voter_id: "ckucpq9f6000a10mt6duogkui",
  },
  {
    id: "109",
    option_id: "56",
    title: "f",
    rank: 0,
    description: "",
    voter_id: "ckucpqm24000b10mtgslr76zs",
  },
  {
    id: "119",
    option_id: "56",
    title: "f",
    rank: 4,
    description: "",
    voter_id: "ckucpqsqv000c10mt4u68ddex",
  },
  {
    id: "126",
    option_id: "56",
    title: "f",
    rank: 5,
    description: "",
    voter_id: "ckucpqyfp000d10mt72f16wxr",
  },
  {
    id: "130",
    option_id: "56",
    title: "f",
    rank: 3,
    description: "",
    voter_id: "ckucpr2dm000e10mt79dth9e2",
  },
];

export const Results = () => {
  const { query } = useRouter();

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

  React.useEffect(() => {
    let b: any = [];

    for (const [optId, votes] of Object.entries(votesForOption)) {
      b.push({ optId, votes: votes.length });
    }

    setBars([...b]);
  }, [votesForOption, round, data]);

  return (
    <>
      <div
        onClick={() => {
          advanceRound();
        }}
      >
        adv
      </div>
      <div
        onClick={() => {
          console.log(
            "%c winnder ",
            "background: blue; color: white",
            getWinner()
          );
        }}
      >
        winnder
      </div>
      <BarChart height={300} width={500} data={bars} />
    </>
  );
};
