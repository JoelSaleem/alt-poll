import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useEffectOnce } from "react-use";

export const VotingLink = () => {
  const {
    query: { pollId },
  } = useRouter();

  const {
    mutate: getOtp,
    isLoading,
    data,
  } = useMutation(async () => {
    if (!pollId) return;
    const res = await axios.post(`/api/votes/${pollId}/otp/`);
    return res.data;
  });

  useEffectOnce(() => {
    getOtp();
  });


  console.log("%c data ", "background: purple; color: white", data);
  return <div>your voting link: {data?.id}</div>;
};
