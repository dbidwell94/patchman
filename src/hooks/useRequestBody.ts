import { useResponseBody } from "@/hooks/useResponseBody";
import { invoke } from "@tauri-apps/api/core";
import type { Response } from "@/hooks/useResponseBody";
import { atom, useAtom } from "jotai";

export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
  Options = "OPTIONS",
}

export interface RequestContext {
  url: string;
  params: Record<string, string>;
  headers: Record<string, number | string>;
  method: HttpMethod;
  body?: string;
}

export const initialRequestState: RequestContext = {
  url: "",
  params: {},
  headers: {},
  body: undefined,
  method: HttpMethod.Get,
};

export const requestStateAtom = atom<RequestContext>(initialRequestState);

export function useRequestBody() {
  const [_, setResponseBody] = useResponseBody();
  const [requestBody, setRequestBody] = useAtom(requestStateAtom);

  async function send() {
    let toReturn: Response | null = null;
    try {
      toReturn = await invoke<Response>("make_request", { req: requestBody });
    } catch (err: any) {
      if (err.status || err.url) {
        toReturn = { body: null, headers: {}, url: err.url || "", status: err.status || 500, requestTimeMs: 0 };
      } else {
        throw err;
      }
    }
    setResponseBody(toReturn);
  }

  return [[requestBody, setRequestBody], send] as const;
}
