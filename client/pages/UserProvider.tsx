import { UserDbProps } from "@js-alt-poll/common";
import axios from "axios";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { isLocalDev } from "../src/isLocalDev";

export const UserProvider: React.FC = ({ children }) => {
  const { data } = useQuery("user", async () => {
    if (!isLocalDev) {
      const res = await axios.get("https://alt-poll.dev/auth/current_user", {
        withCredentials: true,
      });
      return res.data;
    }

    const u: UserDbProps = {
      created_at: "10-10-10",
      google_id: "asdfadsf",
      id: "asdf",
      name: "asdf",
    };
  });

  const user = data as UserDbProps | undefined;

  if (React.isValidElement(children)) {
    // return React.cloneElement(children as ReactElement<any>, {});
    return React.cloneElement(children as ReactElement<any>, { user });
  }
  return null;
};
