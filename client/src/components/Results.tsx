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

type Vote = {
  id: string;
  title: string;
  rank: number;
  description: string;
  option_id: string;
  voter_id: string;
};

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

class WinnerCalculator {
  public round: number;
  public votesForOption: { [optionId: string]: Vote[] };
  public votesForVoter: { [voteId: string]: Vote[] };

  constructor(public results: Vote[]) {
    this.round = 0;
    this.votesForVoter = {};
    this.votesForOption = {};

    // console.log("%c res ", "background: purple; color: white", results);

    results.forEach((v) => {
      this.votesForVoter[v.voter_id] = this.votesForVoter[v.voter_id] || [];
      this.votesForVoter[v.voter_id].push(v);

      if (v.rank == 0) {
        this.votesForOption[v.option_id] =
          this.votesForOption[v.option_id] || [];

        this.votesForOption[v.option_id].push(v);
      }
    });

    for (let votes of Object.values(this.votesForVoter)) {
      votes.sort((a, b) => a.rank - b.rank);
    }

    console.log(this.votesForVoter, "v4v");
    console.log(this.votesForOption, "v4o");
  }

  getWinner = () => {
    const votes = Object.values(this.votesForOption);
    const totNumVotes = votes.reduce((acc, votes) => {
      return acc + votes.length;
    }, 0);

    console.log("%c tot ", "background: purple; color: white", totNumVotes);
    let winner = null;
    Object.entries(this.votesForOption).forEach(([optId, votes]) => {
      if (votes.length >= Math.ceil(totNumVotes / 2)) {
        winner = optId;
      }
    });

    return winner;
  };

  advanceRound = () => {
    const nextRound: { [optionId: string]: Vote[] } = {};

    // get minNumVotes
    const minNumVotes = Object.values(this.votesForOption)
      .map((arr) => arr.length)
      .reduce((acc, curr) => Math.min(acc, curr), Infinity);

    // filter losers
    const losers = new Set();
    for (let [optId, votes] of Object.entries(this.votesForOption)) {
      if (votes.length == minNumVotes) {
        losers.add(optId);
        nextRound[optId] = [];
      } else {
        nextRound[optId] = votes;
      }
    }

    // resassign votes from losers
    Object.entries(this.votesForOption).forEach(([optId, votes]) => {
      if (losers.has(optId)) {
        votes.forEach(({ voter_id, rank }) => {
          const votesForVoter = this.votesForVoter[voter_id].slice(rank + 1);

          let nextChoice = null;
          for (const choice of votesForVoter) {
            if (choice.option_id in nextRound) {
              nextChoice = choice;
              break;
            }
          }

          if (nextChoice) {
            nextRound[nextChoice.option_id].push(nextChoice);
          }
        });
      }
    });

    console.log("%c this ", "background: purple; color: white", nextRound);
    this.votesForOption = {};
    for (const [optId, votes] of Object.entries(nextRound)) {
      if (votes.length) {
        this.votesForOption[optId] = votes;
      }
    }
    console.log(
      "%c this ",
      "background: purple; color: white",
      this.votesForOption
    );
    this.round++;
  };
}

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

  const a = new WinnerCalculator(data ?? []);
  const winner = a.getWinner();
  console.log("%c winner ", "background: purple; color: white", winner);
  a.advanceRound();

  console.log("%c winner ", "background: purple; color: white", a.getWinner());
  a.advanceRound();
  console.log("%c winner ", "background: purple; color: white", a.getWinner());

  // console.log(
  //   "%c data ",
  //   "background: purple; color: white",
  //   JSON.stringify(data, null, 2)
  // );
  return <div>Results</div>;
};
