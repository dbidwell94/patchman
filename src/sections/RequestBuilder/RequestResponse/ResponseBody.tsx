import { useResponseBody } from "@/hooks/useResponseBody";
import Editor, { SupportedLanguage } from "@/components/Editor";
import { useEffect, useMemo, useState } from "react";

export default function ResponseBody() {
  const [body, _] = useResponseBody();
  const [forceRefresh, setForceRefresh] = useState({});

  const value = useMemo<string>(() => {
    if (!body?.body) return "";
    try {
      const obj = JSON.parse(body.body);
      return JSON.stringify(obj, null, 2);
    } catch (err) {
      return body.body || "";
    }
  }, [body?.body]);

  useEffect(() => {
    setForceRefresh({});
  }, [value]);

  const contentType = useMemo<SupportedLanguage>(() => {
    const type = body?.headers?.["content-type"] || body?.headers?.["Content-Type"];
    if (!type) return SupportedLanguage.None;

    if (type.includes("json")) {
      return SupportedLanguage.JSON;
    } else if (type.includes("xml")) {
      return SupportedLanguage.XML;
    } else if (type.includes("html")) {
      return SupportedLanguage.HTML;
    } else {
      return SupportedLanguage.None;
    }
  }, [body?.headers?.["content-type"], body?.headers?.["Content-Type"]]);

  return <Editor value={value} onChange={() => {}} readOnly language={contentType} stateMemo={forceRefresh} />;
}
