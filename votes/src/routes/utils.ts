import { OptionFromOtp } from "../db/queries";

export type Vote = { optId: string; rank: number };

export const throwIfInvalidVotes = (
  votes: Vote[],
  optionsFromOtp: OptionFromOtp[],
  otp: string
) => {
  // Validation:
  // all votes have: optionId, rank (get pollId from otp)
  // all ranks are unique
  // all ranks are between 0 - optionsCount - 1

  const optionsSet = new Set();
  optionsFromOtp.forEach(({ opt_id }) => {
    optionsSet.add(opt_id);
  });

  const voteOptions = new Set();
  votes.forEach(({ optId }) => {
    voteOptions.add(optId);
  });
  console.log(optionsSet, votes);

  if (voteOptions.size != optionsFromOtp.length) {
    throw new Error(`Received wrong number or duplicate options.`);
  }

  if (votes.length != optionsSet.size) {
    throw new Error(
      `Invalid number of votes. Expected: ${optionsSet.size}, received: ${votes.length}`
    );
  }

  console.log(optionsSet, votes);

  const rankSet = new Set();
  votes.forEach(({ optId, rank }) => {
    if (!optionsSet.has(optId)) {
      throw new Error(`Could not find optionId: ${optId} for otp: ${otp}`);
    }

    if (rankSet.has(rank)) {
      throw new Error("You have selected two options with the same rank.");
    }

    if (rank < 0 || rank >= optionsSet.size) {
      throw new Error(`Invalid rank: ${rank} for option: ${optId}`);
    }

    rankSet.add(rank);
  });
};
