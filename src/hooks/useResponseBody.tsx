import { createContext, useState, useContext, SetStateAction, Dispatch, PropsWithChildren } from "react";

type ResponseContextManagedState = Response | null;

export interface Response {
  status: number;
  headers: Record<string, string>;
  body: string | null;
  url: string;
  requestTimeMs: number;
}

const ResponseContext = createContext<
  [ResponseContextManagedState, Dispatch<SetStateAction<ResponseContextManagedState>>]
>([null, () => {}]);

export function useResponseBody() {
  return useContext(ResponseContext);
}

export default function ResponseBodyProvider(props: PropsWithChildren) {
  const responseState = useState<ResponseContextManagedState>(null);

  return <ResponseContext.Provider value={responseState}>{props.children}</ResponseContext.Provider>;
}
