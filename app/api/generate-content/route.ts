// app/api/generate-content/route.ts
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }

  const { query, format } = await request.json();

  try {
    const systemPrompt =
      format === "blog"
        ? `You are a professional MDX content writer. Create a well-structured MDX blog post about the topic provided.
         Include:
         - Frontmatter with title and date
         - A compelling introduction
         - Multiple heading sections using markdown syntax (# for h1, ## for h2, etc.)
         - Bullet points or numbered lists where appropriate
         - Paragraphs with rich information
         - A conclusion section
         - Proper markdown formatting for readability

         For code examples:
         - Include plenty of code snippets that are relevant to the topic
         - Use triple backtick markdown syntax with language specification (e.g. \`\`\`javascript)
         - Provide comments in the code to explain important parts
         - Make sure the code is correctly indented and formatted
         
         MDX Structure:
         1. Start with frontmatter between triple-dash lines (---)
         2. Begin content with a main heading (#)
         3. Use multiple sections with clear headings (##, ###)
         4. Include practical code examples in each relevant section
         5. Add explanations for each code snippet
         6. End with a conclusion or summary

         FORMAT THE CONTENT USING MDX/MARKDOWN SYNTAX as follows:
         - Start with frontmatter:
           ---
           title: 'Your Title Here'
           date: 'YYYY-MM-DD'
           ---
         - Use # for h1, ## for h2, ### for h3 (not HTML tags)
         - Use standard markdown for paragraphs (no tags needed)
         - Use - or * for bullet points
         - Use 1. 2. 3. for numbered lists
         - Use > for blockquotes
         - Use \`\`\`language for code blocks (where language is javascript, typescript, python, etc.)
         `
        : "You are a helpful blog post writer. Create content about the provided topic.";

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: query,
        },
      ],
      temperature: 0.7,
    });

    return NextResponse.json({ content: response.choices[0].message.content });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
