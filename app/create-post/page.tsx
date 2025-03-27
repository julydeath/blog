import CreatePost from "@/components/create-post";
import Editor from "@/components/editor";

export default function Page() {
  return (
    <div className="flex flex-col gap-20 w-full">
      <CreatePost />
    </div>
  );
}
