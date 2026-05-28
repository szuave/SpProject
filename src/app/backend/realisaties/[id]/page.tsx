import { notFound } from "next/navigation";
import { getRealisatieById } from "@/lib/db";
import { RealisatieEditor } from "@/components/backend/RealisatieEditor";

export const dynamic = "force-dynamic";

export default async function RealisatieEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") return <RealisatieEditor />;

  const numId = Number(id);
  if (!Number.isInteger(numId)) notFound();
  const realisatie = getRealisatieById(numId);
  if (!realisatie) notFound();

  return <RealisatieEditor realisatie={realisatie} />;
}
