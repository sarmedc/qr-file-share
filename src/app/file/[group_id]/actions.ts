"use server";

import { createClient } from "supabase/server";

export const fetchFiles = async (group_id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("files")
    .select("*")
    .eq("group_id", group_id);

  if (error) {
    console.error("Select error:", error);
    return;
  }

  return data;
};
