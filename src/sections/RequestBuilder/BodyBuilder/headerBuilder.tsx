import KeyValueTableInput, { useKeyValueTableInputState, IKeyedTableValue } from "@/components/KeyValueTableInput";
import { useRequestBody } from "@/hooks/useRequestBody";
import { useEffect } from "react";
import { nanoid } from "nanoid";

export default function HeaderBuilder() {
  const [requestBody, setRequestBody] = useRequestBody();
  const { items, deleteItem, setItems, editItem, addItem } = useKeyValueTableInputState(
    Object.keys(requestBody.headers).map((headerKey) => ({
      key: headerKey,
      id: nanoid(),
      value: requestBody.headers[headerKey].toString(),
    }))
  );

  useEffect(() => {
    const newHeaders: Record<string, string> = {};
    items.forEach((item) => (newHeaders[item.key] = item.value));
    setRequestBody((prev) => ({ ...prev, headers: newHeaders }));
  }, [items]);

  return <KeyValueTableInput items={items} onDelete={deleteItem} onAdded={addItem} editItem={editItem} />;
}
