import { useState } from "react";
import { PollCreate } from "../../types";

export const usePollForm = (poll?: PollCreate) => {
  const initialTitle = poll?.title || "";
  const initialOpen = poll?.open || false;
  const initialClosed = poll?.closed || false;
  const initialDescription = poll?.description || "";

  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(initialOpen);
  const [closed, setClosed] = useState(initialClosed);
  const [description, setDescription] = useState(initialDescription);

  return {
    title,
    setTitle,
    open,
    setOpen,
    closed,
    setClosed,
    description,
    setDescription,
  };
};
