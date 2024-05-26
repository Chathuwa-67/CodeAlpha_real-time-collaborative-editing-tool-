import { useEffect, useRef } from "react";
import Editor, { loader } from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";

function App() {
  const editorRef = useRef(null);

  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("myCustomTheme", {
        base: "hc-black",
        inherit: true, // will inherit the base theme rules
        rules: [
          { background: "1E1E1E" },
          { token: "comment", foreground: "7F848E", fontStyle: "italic" },
          { token: "keyword", foreground: "C586C0" },
          { token: "number", foreground: "B5CEA8" },
          { token: "string", foreground: "CE9178" },
        ],
        colors: {
          "editor.background": "#232323",
          "editor.foreground": "#97c93c",
        },
      });
    });
  }, []);
