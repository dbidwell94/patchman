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

export type RequestHistory = [RequestContext, Date, RustResult<Response, ErrResult>][];

const initialRequestHistory: RequestHistory = [];

export const requestHistoryAtom = atom<RequestHistory>(initialRequestHistory);

export function useRequestHistory() {
  const [history, setHistory] = useAtom(requestHistoryAtom);
  const [responseBody] = useResponseBody();

  useEffect(() => {
    invoke<RequestHistory>("get_request_history").then((history) => {
      const normalizedHistory = history.map((history) => {
        const date = new Date(history[1]);
        return [history[0], date, history[2]] as RequestHistory[number];
      });
      setHistory(normalizedHistory);
    });
  }, [responseBody]);

  return history;
}
