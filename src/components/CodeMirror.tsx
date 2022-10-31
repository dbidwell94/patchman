import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html";
import { xml } from "@codemirror/lang-xml";
import { useRef, useEffect } from "preact/hooks";
import { githubDark } from "@uiw/codemirror-theme-github";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";

interface IEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

const extensions = [json(), html()];

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
