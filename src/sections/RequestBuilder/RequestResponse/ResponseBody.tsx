import { useResponseBody } from "@/hooks/useResponseBody";
import Editor from "@/components/Editor";
import { useMemo } from "preact/hooks";

export default function ResponseBody() {
  const [body, _] = useResponseBody();

  const value = useMemo<string>(() => {
    if (!body?.body) return "";
    try {
      const obj = JSON.parse(body.body);
      return JSON.stringify(obj, null, 2);
    } catch (err) {
      return body.body || "";
    }
  }, [body?.body]);

  return <Editor value={value} onChange={() => {}} readOnly />;
}
