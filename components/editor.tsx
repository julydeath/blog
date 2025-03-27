"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const mkdStr = `
# Markdown Editor

---

**Hello world!!!**
## Hello

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
`;

export default function Editor() {
  const [value, setValue] = useState<string | undefined>(mkdStr);

  return (
    <div>
      <MDEditor height={1000} value={value} onChange={setValue} />
    </div>
  );
}
