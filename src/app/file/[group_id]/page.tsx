import { redirect } from "next/navigation";
import { FileList } from "@/components/FilesList";
import { createClient } from "supabase/server";

export default async function File({
  params,
}: {
  params: Promise<{ group_id: string }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { group_id } = await params;

  return <FileList group_id={group_id} />;
}
