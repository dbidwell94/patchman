import { styled } from "@mui/material";
import Editor from "react-simple-code-editor";
import React from "react";

const WrappedStyledEditor = styled(Editor)`
  width: 100%;
  height: 100%;
  font-family: "Ubuntu Mono", monospace;
  font-size: 18px;
  &::selection {
    border: none;
  }
`;

type EditorProps = React.ComponentProps<typeof Editor>;

export default function StyledEditor(props: EditorProps) {
  return (
    <div style={{ width: "100%", height: "auto", minHeight: "100%" }}>
      <WrappedStyledEditor {...props} inputMode={"text"} />
    </div>
  );
}
