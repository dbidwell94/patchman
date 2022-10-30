import { highlight, languages } from "prismjs";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { useRequestBody } from "@/hooks/useRequestBody";
import StyledEditor from "@/components/StyledEditor";

export default function RequestBodyBuilder() {
  const [[requestBody, setRequestBody]] = useRequestBody();
  const theme = useTheme();
  const [body, setBody] = useState(requestBody.body || "");

  useEffect(() => {
    setRequestBody((prev) => ({ ...prev, body }));
  }, [body]);

  return (
    <StyledEditor
      className="language-javascript"
      highlight={(code) => highlight(code, languages.js, "json")}
      value={body}
      onValueChange={(newBody) => setBody(newBody)}
      style={{
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
      placeholder="No Request Body"
      tabSize={1}
      insertSpaces={true}
      ignoreTabKey={false}
      padding={1}
    />
  );
}
