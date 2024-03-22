import { createContext, useState, useContext, SetStateAction, Dispatch, PropsWithChildren } from "react";

type IResponseContextManagedState = IResponse | null;

export interface IResponse {
  status: number;
  headers: Record<string, string>;
  body: string | null;
  url: string;
  requestTimeMs: number;
}

const ResponseContext = createContext<
  [IResponseContextManagedState, Dispatch<SetStateAction<IResponseContextManagedState>>]
>([null, () => {}]);

export function useResponseBody() {
  return useContext(ResponseContext);
}

export default function ResponseBodyProvider(props: PropsWithChildren) {
  const responseState = useState<IResponseContextManagedState>(null);

  return <ResponseContext.Provider value={responseState}>{props.children}</ResponseContext.Provider>;
}
