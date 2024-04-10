import { oneDarkTheme, oneDarkHighlightStyle } from "@codemirror/theme-one-dark";
import { json } from "@codemirror/lang-json";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { EditorView, keymap, lineNumbers, highlightActiveLine, dropCursor } from "@codemirror/view";
import { closeBrackets } from "@codemirror/autocomplete";
import { useEffect, useRef } from "react";
import { foldGutter, syntaxHighlighting, bracketMatching } from "@codemirror/language";
import { EditorState, Extension } from "@codemirror/state";
import { xml } from "@codemirror/lang-xml";
import { html } from "@codemirror/lang-html";

const font16 = EditorView.theme({
  "&": { fontSize: "12pt", fontFamily: "Ubuntu", minHeight: "100%", width: "100%" },
  ".cm-content": {
    fontFamily: "Ubuntu Mono",
    minHeight: "100%",
    width: "100%",
  },
});

export enum SupportedLanguage {
  None = "",
  JSON = "json",
  XML = "xml",
  HTML = "html",
}

const supportedLanguageMap = {
  [SupportedLanguage.None]: null,
  [SupportedLanguage.JSON]: json(),
  [SupportedLanguage.XML]: xml(),
  [SupportedLanguage.HTML]: html(),
};

interface IEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  language?: SupportedLanguage;
  /**
   * Change this to force Editor to refresh with new content
   */
  stateMemo?: any;
}

export default function Editor(props: IEditorProps) {
  let { language } = props;
  if (!language) language = SupportedLanguage.None;
  const rootElement = useRef(null);

  useEffect(() => {
    if (!rootElement.current) return;

    const extensions: Extension[] = [
      EditorView.domEventHandlers({
        input: (evt) => {
          const newText = (evt.target as HTMLElement).innerText || "";
          props.onChange(newText);
        },
      }),
      EditorView.lineWrapping,
      oneDarkTheme,
      font16,
      keymap.of([...defaultKeymap, indentWithTab]),
      lineNumbers(),
      foldGutter(),
      closeBrackets(),
      highlightActiveLine(),
      dropCursor(),
      syntaxHighlighting(oneDarkHighlightStyle),
      bracketMatching(),
      EditorState.readOnly.of(Boolean(props.readOnly)),
    ];
    if (language) extensions.push(supportedLanguageMap[language]);

    const view = new EditorView({
      parent: rootElement.current,
      extensions,
      doc: props.value,
    });

    return () => {
      view?.destroy();
    };
  }, [rootElement.current, language, props.stateMemo]);

  return <div style={{ height: "100%", width: "100%" }} ref={rootElement} />;
}
