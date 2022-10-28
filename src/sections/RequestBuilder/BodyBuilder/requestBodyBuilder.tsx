import { highlight, languages } from "prismjs";
import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { useTheme, styled } from "@mui/material";
import { useRequestBody } from "@/hooks/useRequestBody";

import "prismjs/themes/prism-okaidia.min.css";

const StyledEditor = styled(Editor)`
  width: 100%;
  height: 100%;
  font-family: "Ubuntu Mono", monospace;
  font-size: 18px;
  &::selection {
    border: none;
  }
`;

export default function RequestBodyBuilder() {
  const [requestBody, setRequestBody] = useRequestBody();
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
    />
  );
}
