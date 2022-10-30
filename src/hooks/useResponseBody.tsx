import React, { createContext, PropsWithChildren, useContext, useState } from "react";

type IResponseContextManagedState = IResponse | null;

export interface IResponse {
  status: number;
  headers: Record<string, string>;
  body: string | null;
  url: string;
}

const ResponseContext = createContext<[IResponseContextManagedState, React.Dispatch<IResponseContextManagedState>]>([
  null,
  () => {},
]);

export function useResponseBody() {
  return useContext(ResponseContext);
}

export default function ResponseBodyProvider(props: PropsWithChildren) {
  const responseState = useState<IResponseContextManagedState>(null);

  return <ResponseContext.Provider value={responseState}>{props.children}</ResponseContext.Provider>;
}
