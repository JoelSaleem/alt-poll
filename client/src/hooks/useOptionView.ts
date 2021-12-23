import { useRouter } from "next/router";

const OPTION_VIEWS = ["create", "update", "list"] as const;

export const useOptionView = (): [
  typeof OPTION_VIEWS[number],
  (
    newView: typeof OPTION_VIEWS[number],
    query?: { [key: string]: string }
  ) => void
] => {
  const { query, pathname, push } = useRouter();
  const view = query.view;

  const setView = (newView: typeof OPTION_VIEWS[number], query: any = {}) => {
    if (typeof window != "undefined") {
      push({ pathname, query: { ...query, view: newView } });
    }
  };

  // @ts-ignore
  if (!view || typeof view != "string" || !OPTION_VIEWS.includes(view)) {
    setView("list", { ...query });
  }

  return [view as typeof OPTION_VIEWS[number], setView];
};
