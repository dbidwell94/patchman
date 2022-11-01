import { useEffect, useState } from "react";
import { useRequestBody } from "@/hooks/useRequestBody";
import Editor, { SupportedLanguage } from "@/components/Editor";

export default function RequestBodyBuilder() {
  const [[requestBody, setRequestBody]] = useRequestBody();
  const [body, setBody] = useState(requestBody.body || "");

  useEffect(() => {
    setRequestBody((prev) => ({ ...prev, body }));
  }, [body]);

  return <Editor value={body} onChange={(code) => setBody(code)} language={SupportedLanguage.JSON} />;
}
