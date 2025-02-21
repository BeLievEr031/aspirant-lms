import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

interface EditorComponentProps {
    initialData: OutputData;  // Accept initial data as a prop
    onSave: (data: OutputData) => void;
}

const EditorComponent: React.FC<EditorComponentProps> = ({ initialData, onSave }) => {
    const editorRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                holder: "editor-js",
                autofocus: true,
                tools: {}, // Add tools as needed
                data: initialData || {},  // Load initial data
                onChange: async () => {
                    if (editorRef.current) {
                        const savedData = await editorRef.current.save();
                        onSave(savedData);
                    }
                },
            });
        }

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [onSave, initialData]); // Reinitialize when initialData changes

    return <div id="editor-js" className="border p-4" />;
};

export default EditorComponent;
