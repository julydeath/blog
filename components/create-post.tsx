import Editor from "./editor";

export default function CreatePost() {
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
          name="input"
        />
        <button className="px-4 py-2 rounded-lg bg-black text-white border border-gray-800">
          Generate
        </button>
      </div>

      <Editor />
    </>
  );
}
