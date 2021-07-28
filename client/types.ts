import { PollDbProps } from "@js-alt-poll/common";

export type PollCreate = Omit<
  PollDbProps,
  "id" | "user_id" | "version" | "created_at"
>;
