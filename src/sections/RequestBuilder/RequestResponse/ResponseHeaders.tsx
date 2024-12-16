import KeyValueTableInput, { KeyedTableValue } from "@/components/KeyValueTableInput";
import { useResponseBody } from "@/hooks/useResponseBody";
import { useMemo } from "react";
import { nanoid } from "nanoid";

export default function ResponseHeaders() {
  const [body, _] = useResponseBody();
  const headers = useMemo<KeyedTableValue[]>(() => {
    const toReturn: KeyedTableValue[] = [];
    if (!body || !body.headers) return toReturn;

    Object.keys(body.headers).forEach((headerKey) => {
      toReturn.push({ key: headerKey, value: body.headers[headerKey], id: nanoid() });
    });
    return toReturn;
  }, [body?.headers]);

  return <KeyValueTableInput items={headers} onDelete={() => {}} onAdded={() => {}} editItem={() => {}} readonly />;
}
