import React, { useContext, useState, createContext, PropsWithChildren } from "react";
import { useResponseBody } from "@/hooks/useResponseBody";
import { invoke } from "@tauri-apps/api/tauri";
import type { IResponse } from "@/hooks/useResponseBody";

export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
  Options = "OPTIONS",
}

export interface IRequestContext {
  url: string;
  params: Record<string, string>;
  headers: Record<string, number | string>;
  method: HttpMethod;
  body?: string;
}

type IRequestContextReturn = [IRequestContext, React.Dispatch<React.SetStateAction<IRequestContext>>];

const RequestBodyContext = createContext<IRequestContextReturn>([
  {
    url: "",
    params: {},
    headers: {},
    body: undefined,
    method: HttpMethod.Get,
  },
  () => {},
]);

export function useRequestBody(): [IRequestContextReturn, () => Promise<void>] {
  const [_, setResponseBody] = useResponseBody();
  const [requestBody, setRequestBody] = useContext(RequestBodyContext);

  async function send() {
    let toReturn: IResponse | null = null;
    try {
      toReturn = await invoke<IResponse>("make_request", { req: requestBody });
    } catch (err: any) {
      if (err.status || err.url) {
        toReturn = { body: null, headers: {}, url: err.url || "", status: err.status || 500 };
      } else {
        throw err;
      }
    }
    setResponseBody(toReturn);
  }

  return [[requestBody, setRequestBody], send];
}

export default function RequestBodyProvider(props: PropsWithChildren) {
  const requestState = useState<IRequestContext>({
    url: "",
    params: {},
    headers: {},
    body: undefined,
    method: HttpMethod.Get,
  });

  return <RequestBodyContext.Provider value={requestState}>{props.children}</RequestBodyContext.Provider>;
}
