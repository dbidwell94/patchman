import { atom, useAtom } from "jotai";
import { Response, useResponseBody } from "./useResponseBody";
import { RequestContext } from "./useRequestBody";
import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

type RustResult<T, E> = { Ok: T } | { Err: E };

type ErrResult = {
  status: number;
  url: string;
  requestTimeMs: number;
};

export type RequestHistoryItem = [RequestContext, Date, RustResult<Response, ErrResult>];

export type RequestHistory = RequestHistoryItem[];

export type HistoryState = {
  index: number;
  history: RequestHistoryItem;
}[];

export const requestHistoryAtom = atom<HistoryState>([]);

export function useRequestHistory() {
  const [history, setHistory] = useAtom(requestHistoryAtom);
  const [responseBody] = useResponseBody();

  useEffect(() => {
    invoke<RequestHistory>("get_request_history").then((history) => {
      const normalizedHistory = history.map((history, index) => {
        const date = new Date(history[1]);
        return { index, history: [history[0], date, history[2]] } as HistoryState[number];
      });
      setHistory(normalizedHistory);
    });
  }, [responseBody]);

  return history;
}

export function useDeleteHistoryItem() {
  const [, setHistory] = useAtom(requestHistoryAtom);

  return async (index: number) => {
    await invoke("delete_history_item", { index });
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };
}
