import { useContext, useState, createContext, PropsWithChildren } from "react";

export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
  Options = "OPTIONS",
}

interface IRequestContext {
  url: string;
  params: Record<string, string>;
  headers: Record<string, number | string>;
  method: HttpMethod;
  body?: string;
}

const RequestBodyContext = createContext<
  [IRequestContext, React.Dispatch<React.SetStateAction<IRequestContext>>]
>([
  {
    url: "",
    params: {},
    headers: {},
    body: undefined,
    method: HttpMethod.Get,
  },
  () => {},
]);

export function useRequestBody() {
  return useContext(RequestBodyContext);
}

export default function RequestBodyProvider(props: PropsWithChildren) {
  const requestState = useState<IRequestContext>({
    url: "",
    params: {},
    headers: {},
    body: undefined,
    method: HttpMethod.Get,
  });

  return (
    <RequestBodyContext.Provider value={requestState}>
      {props.children}
    </RequestBodyContext.Provider>
  );
}
