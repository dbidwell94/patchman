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
    if (!body?.headers) return SupportedLanguage.None;
    const contentHeader = body.headers["content-type"] || body.headers["Content-Type"];
    if (!contentHeader) return SupportedLanguage.None;

    if (contentHeader.includes("json")) {
      return SupportedLanguage.JSON;
    } else if (contentHeader.includes("xml")) {
      return SupportedLanguage.XML;
    } else if (contentHeader.includes("html")) {
      return SupportedLanguage.HTML;
    } else {
      return SupportedLanguage.None;
    }
  }, [body?.headers]);

  return <Editor value={value} onChange={() => {}} readOnly language={contentType} stateMemo={forceRefresh} />;
}
