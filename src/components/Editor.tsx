import { useCodeMirror } from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html";
import { xml } from "@codemirror/lang-xml";
import { useRef, useEffect } from "preact/hooks";
import { githubDark } from "@uiw/codemirror-theme-github";

interface IEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

const extensions = [json(), html(), xml()];

export default function Editor(props: IEditorProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const { setContainer } = useCodeMirror({
    value: props.value,
    extensions,
    minHeight: "100%",
    onChange: props.onChange,
    container: divRef.current,
    readOnly: props.readOnly,
    theme: githubDark,
    draggable: true,
  });

  useEffect(() => {
    if (!divRef.current) return;
    setContainer(divRef.current);
  }, [divRef.current]);

  return (
    <div
      style={{
        height: "100%",
      }}
      ref={divRef}
    />
  );
}
