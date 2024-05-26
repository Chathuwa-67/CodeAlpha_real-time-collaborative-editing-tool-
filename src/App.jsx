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

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    // Initialize YJS
    const doc = new Y.Doc(); // a collection of shared objects -> Text
    // Connect to peers with WebRTC
    const provider = new WebrtcProvider("test-room", doc); // room1, room2
    const type = doc.getText("monaco"); // doc { "monaco": }
    // Bind YJS to Monaco
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
    console.log(provider.awareness);
  }

  return (
    <Editor
      height="100vh"
      width="100vw"
      theme="myCustomTheme" // Apply the custom theme here
      onMount={handleEditorDidMount}
    />
  );
}

export default App;
