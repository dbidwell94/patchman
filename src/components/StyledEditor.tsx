import { styled } from "@mui/material";
import Editor from "react-simple-code-editor";
import { ComponentProps } from "preact/compat";

const WrappedStyledEditor = styled(Editor)`
  width: 100%;
  height: 100%;
  font-family: "Ubuntu Mono", monospace;
  font-size: 18px;
  &::selection {
    border: none;
  }
`;

type EditorProps = Omit<ComponentProps<typeof Editor>, "ref">;

export default function StyledEditor(props: EditorProps) {
  return (
    <div style={{ width: "100%", height: "auto", minHeight: "100%" }}>
      <WrappedStyledEditor {...props} inputMode={"text"} />
    </div>
  );
}
