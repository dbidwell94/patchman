import { highlight, languages } from "prismjs";
import { useState } from "react";
import Editor from "react-simple-code-editor";
import { useTheme, styled } from "@mui/material";

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
  const theme = useTheme();
  const [body, setBody] = useState("");

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
