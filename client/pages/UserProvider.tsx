import { UserDbProps } from "@js-alt-poll/common";
import axios from "axios";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

export const UserProvider: React.FC = ({ children }) => {
  const { data } = useQuery("user", async () => {
    const res = await axios.get("https://alt-poll.dev/auth/current_user", {
      withCredentials: true,
    });
    return res.data;
  });

  const user = data as UserDbProps | undefined;

  if (React.isValidElement(children)) {
    // return React.cloneElement(children as ReactElement<any>, {});
    return React.cloneElement(children as ReactElement<any>, { user });
  }
  return null;
};
