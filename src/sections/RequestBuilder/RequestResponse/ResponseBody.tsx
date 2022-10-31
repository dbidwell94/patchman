import { useResponseBody } from "@/hooks/useResponseBody";
import Editor from "@/components/CodeMirror";

export default function ResponseBody() {
  const [body, _] = useResponseBody();

  return <Editor value={body?.body || ""} onChange={() => {}} readOnly />;
}
