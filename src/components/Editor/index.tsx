import { oneDarkTheme, oneDarkHighlightStyle } from "@codemirror/theme-one-dark";
import { json } from "@codemirror/lang-json";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { EditorView, keymap, lineNumbers, highlightActiveLine, dropCursor } from "@codemirror/view";
import { closeBrackets } from "@codemirror/autocomplete";
import { useEffect, useRef, useState } from "preact/hooks";
import { foldGutter, syntaxHighlighting, bracketMatching } from "@codemirror/language";
import { createRef } from "preact";
import CodeMirror from "codemirror";

interface IEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export default function Editor(props: IEditorProps) {
  const rootElement = useRef(null);

  const [codeView, setCodeView] = useState<EditorView | null>(null);

  useEffect(() => {
    if (!rootElement.current) return;

    const view = new EditorView({
      parent: rootElement.current,
      extensions: [
        EditorView.domEventHandlers({
          input: (evt) => {
            const newText = (evt.target as HTMLElement).innerText || "";
            props.onChange(newText);
          },
        }),
        EditorView.lineWrapping,
        json(),
        oneDarkTheme,
        keymap.of([...defaultKeymap, indentWithTab]),
        lineNumbers(),
        foldGutter(),
        closeBrackets(),
        highlightActiveLine(),
        dropCursor(),
        syntaxHighlighting(oneDarkHighlightStyle),
        bracketMatching(),
      ],
      doc: props.value,
    });

    setCodeView(view);

    return () => {
      view?.destroy();
      setCodeView(null);
    };
  }, [rootElement.current]);

  return <div style={{ height: "100%" }} ref={rootElement} />;
}
