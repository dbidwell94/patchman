import StyledEditor from "@/components/StyledEditor";
import { useResponseBody } from "@/hooks/useResponseBody";
import { highlight, languages } from "prismjs";
import { useTheme } from "@mui/material";

export default function ResponseBody() {
  const theme = useTheme();
  const [body, _] = useResponseBody();

  return (
    <StyledEditor
      value={body?.body || "No Data"}
      style={{
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
      readOnly
      onValueChange={() => {}}
      highlight={(code) => highlight(code, languages.js, "json")}
      tabSize={1}
      insertSpaces={true}
      ignoreTabKey={false}
      padding={0}
    />
  );
}
