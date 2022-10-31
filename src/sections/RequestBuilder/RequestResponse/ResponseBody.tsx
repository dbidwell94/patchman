import { useResponseBody } from "@/hooks/useResponseBody";
import Editor from "@/components/Editor";

export default function ResponseBody() {
  const [body, _] = useResponseBody();

  return <Editor value={body?.body || ""} onChange={() => {}} readOnly />;
}
