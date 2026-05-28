import { notFound } from "next/navigation";
import { getBlogById } from "@/lib/db";
import { BlogEditor } from "@/components/backend/BlogEditor";

export const dynamic = "force-dynamic";

export default async function BlogEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") return <BlogEditor />;

  const numId = Number(id);
  if (!Number.isInteger(numId)) notFound();
  const post = getBlogById(numId);
  if (!post) notFound();

  return <BlogEditor post={post} />;
}
