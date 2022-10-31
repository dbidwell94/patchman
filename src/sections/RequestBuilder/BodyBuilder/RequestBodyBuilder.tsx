import { useState, useEffect } from "react";
import { useRequestBody } from "@/hooks/useRequestBody";
import Editor from "@/components/Editor";

export default function RequestBodyBuilder() {
  const [[requestBody, setRequestBody]] = useRequestBody();
  const [body, setBody] = useState(requestBody.body || "");

  useEffect(() => {
    setRequestBody((prev) => ({ ...prev, body }));
  }, [body]);

  return <Editor value={body} onChange={(code) => setBody(code)} />;
}
