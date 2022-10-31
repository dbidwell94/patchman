import { createContext, ComponentChildren } from "preact";
import { useState, useContext, StateUpdater } from "preact/hooks";

type IResponseContextManagedState = IResponse | null;

export interface IResponse {
  status: number;
  headers: Record<string, string>;
  body: string | null;
  url: string;
}

const ResponseContext = createContext<[IResponseContextManagedState, StateUpdater<IResponseContextManagedState>]>([
  null,
  () => {},
]);

export function useResponseBody() {
  return useContext(ResponseContext);
}

export default function ResponseBodyProvider(props: { children: ComponentChildren }) {
  const responseState = useState<IResponseContextManagedState>(null);

  return <ResponseContext.Provider value={responseState}>{props.children}</ResponseContext.Provider>;
}
