import { FileList } from "@/components/FilesList";

export default async function File({
  params,
}: {
  params: Promise<{ group_id: string }>;
}) {
  const { group_id } = await params;

  return <FileList group_id={group_id} />;
}
