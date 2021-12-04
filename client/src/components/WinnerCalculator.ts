import { useEffect, useState } from "react";

export type Vote = {
  id: string;
  title: string;
  rank: number;
  description: string;
  option_id: string;
  voter_id: string;
};

export const useWinnerCalculator = (results: Vote[]) => {
  const [round, setRound] = useState(0);
  const [votesForOption, setVotesForOption] = useState<{
    [optionId: string]: Vote[];
  }>({});
  const [votesForVoter, setVotesForVoter] = useState<{
    [voteId: string]: Vote[];
  }>({});

  useEffect(() => {
    results.forEach((v) => {
      votesForVoter[v.voter_id] = votesForVoter[v.voter_id] || [];
      votesForVoter[v.voter_id].push(v);

      if (v.rank == 0) {
        votesForOption[v.option_id] = votesForOption[v.option_id] || [];

        votesForOption[v.option_id].push(v);
      }
    });

    for (let votes of Object.values(votesForVoter)) {
      votes.sort((a, b) => a.rank - b.rank);
    }

    console.log(votesForVoter, "v4v");
    console.log(votesForOption, "v4o");
  }, [results]);

  const getWinner = () => {
    const votes = Object.values(votesForOption);
    const totNumVotes = votes.reduce((acc, votes) => {
      return acc + votes.length;
    }, 0);

    let winner = null;
    Object.entries(votesForOption).forEach(([optId, votes]) => {
      if (votes.length >= Math.ceil(totNumVotes / 2)) {
        winner = optId;
      }
    });

    return winner;
  };

  const advanceRound = () => {
    const nextRound: { [optionId: string]: Vote[] } = {};

    // get minNumVotes
    const minNumVotes = Object.values(votesForOption)
      .map((arr) => arr.length)
      .reduce((acc, curr) => Math.min(acc, curr), Infinity);

    // filter losers
    const losers = new Set();
    for (let [optId, votes] of Object.entries(votesForOption)) {
      if (votes.length == minNumVotes) {
        losers.add(optId);
        nextRound[optId] = [];
      } else {
        nextRound[optId] = votes;
      }
    }

    // resassign votes from losers
    Object.entries(votesForOption).forEach(([optId, votes]) => {
      if (losers.has(optId)) {
        votes.forEach(({ voter_id, rank }) => {
          const votes = votesForVoter[voter_id].slice(rank + 1);

          let nextChoice = null;
          for (const choice of votes) {
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

    const newVotesForOption: {
      [optionId: string]: Vote[];
    } = {};
    for (const [optId, votes] of Object.entries(nextRound)) {
      if (votes.length) {
        newVotesForOption[optId] = votes;
      }
    }

    setRound((i) => ++i);
    setVotesForOption({ ...newVotesForOption });
  };

  return { advanceRound, getWinner, round, votesForOption, votesForVoter };
};

export class WinnerCalculator {
  public round: number;
  public votesForOption: { [optionId: string]: Vote[] };
  public votesForVoter: { [voteId: string]: Vote[] };

  constructor(public results: Vote[]) {
    this.round = 0;
    this.votesForVoter = {};
    this.votesForOption = {};

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

    this.votesForOption = {};
    for (const [optId, votes] of Object.entries(nextRound)) {
      if (votes.length) {
        this.votesForOption[optId] = votes;
      }
    }
    this.round++;
  };
}
