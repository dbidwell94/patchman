import { useEffect } from "react";
import { nanoid } from "nanoid";
import { useRequestBody } from "@/hooks/useRequestBody";
import KeyValueTableInput, { KeyedTableValue, useKeyValueTableInputState } from "@/components/KeyValueTableInput";

interface ParamsBuilderProps {}

export default function ParamsBuilder(props: ParamsBuilderProps) {
  const [[requestBody, setRequestBody]] = useRequestBody();

  const { items, setItems, editItem, addItem, deleteItem } = useKeyValueTableInputState([]);

  useEffect(() => {
    const initialState: KeyedTableValue[] = [];
    Object.keys(requestBody.params).forEach((key) => {
      initialState.push({
        id: nanoid(),
        key,
        value: requestBody.params[key],
      });
    });
    setItems(initialState);
  }, []);

  useEffect(() => {
    const newRequestBodyParams: typeof requestBody.params = {};
    items.forEach((param) => {
      newRequestBodyParams[param.key] = param.value;
    });
    setRequestBody((prev) => ({ ...prev, params: newRequestBodyParams }));
  }, [items]);

  return <KeyValueTableInput items={items} onDelete={deleteItem} onAdded={addItem} editItem={editItem} />;
}
