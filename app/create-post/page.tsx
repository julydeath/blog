"use client";
import { useState } from "react";

export default function CreatePost() {
  const [input, setInput] = useState("");

  const generateContent = async () => {
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
      console.log({ data });
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your title"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={generateContent}>Generate</button>
    </div>
  );
}
