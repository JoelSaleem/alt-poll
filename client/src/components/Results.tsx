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

export const Results = () => {
  return <div>Results</div>;
};
