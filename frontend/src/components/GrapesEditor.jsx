import { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import websitePlugin from "grapesjs-preset-webpage";
import basicBlockPlugin from "grapesjs-blocks-basic";
import formPlugin from "grapesjs-plugin-forms";

const GrapesEditor = ({ html }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      height: "100vh",
      width: "auto",
      fromElement: false,
      storageManager: false,
      plugins: [websitePlugin, basicBlockPlugin, formPlugin],
      pluginsOpts: {},
    });

    // editor.addComponents(html)
    editor.setComponents(html)

    return () => {
      editor.destroy();
    };
  }, [html]);

  return <div ref={editorRef} />;
};

export default GrapesEditor;
