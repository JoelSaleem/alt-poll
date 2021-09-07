import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { isLocalDev } from "../isLocalDev";

export const Votes = () => {
  const {
    query: { otp },
  } = useRouter();

  if (!otp) {
    return <div>Could not verify voting link</div>;
  }

  const { data } = useQuery(["votes", otp], async () => {
    if (isLocalDev) {
      return;
    }

    const res = await axios.get(`/api/votes/options/${otp}`);

    return res.data;
  });

  console.log("%c data ", "background: purple; color: white");

  return <div>voting page</div>;
};
