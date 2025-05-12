"use client";

import { useState } from "react";
import Editor from "./editor";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [input, setInput] = useState<string | undefined>("");

  const generateContent = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: input,
          format: "blog", // Tell the AI to format as a blog with headings, lists, etc.
        }),
      });

      const data = await response.json();
      if (data.content) {
        setContent(data.content);
      }
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <>
      <div className="text-2xl font-bold">
        Unleash AI-Powered Blogging: Generate, Edit, and Publish Effortlessly!
      </div>
      <div className="flex gap-4">
        <input
          className="border w-full border-gray-600 focus:border-blue-400 rounded-lg py-2 px-4 text-white"
          placeholder="Enter your question"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button
          onClick={() => generateContent()}
          disabled={isGenerating || !input}
          className="px-4 py-2 rounded-lg bg-black text-white border border-gray-800 cursor-pointer disabled:bg-gray-800 disabled:cursor-not-allowed"
        >
          Generate
        </button>
      </div>

      {content && <Editor content={content} />}
    </>
  );
}
