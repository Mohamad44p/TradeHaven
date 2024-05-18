"use client";

import { type JSONContent, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function ProductDescription({ content }: { content: JSONContent }) {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: "text- text-muted-foreground dark:text-white",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
}