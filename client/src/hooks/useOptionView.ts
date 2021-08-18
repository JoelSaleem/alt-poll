import { useRouter } from "next/router";

const OPTION_VIEWS = ["create", "update", "list"] as const;

export const useOptionView = (): [
  typeof OPTION_VIEWS[number],
  (newView: typeof OPTION_VIEWS[number]) => void
] => {
  const { query, pathname, push } = useRouter();
  const view = query.view;

  const setView = (newView: typeof OPTION_VIEWS[number]) => {
    if (typeof window != "undefined") {
      push({ pathname, query: { ...query, view: newView } });
    }
  };

  // @ts-ignore
  if (typeof view != "string" || !OPTION_VIEWS.includes(view)) {
    setView("list");
  }

  return [view, setView];
};
