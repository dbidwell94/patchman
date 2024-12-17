import { atom, useAtom } from "jotai";

type ResponseContextManagedState = Response | null;

export interface Response {
  status: number;
  headers: Record<string, string>;
  body: string | null;
  url: string;
  requestTimeMs: number;
}

export const responseStateAtom = atom<ResponseContextManagedState>(null);

export function useResponseBody() {
  return useAtom(responseStateAtom);
}
