"use server";

import { v4 as uuidv4 } from "uuid";
import { supabase } from "supabase/client";
import { createClient } from "supabase/server";

export const uploadFiles = async (
  files: any[],
  UID: string,
  pathname: string
) => {
  const supaServ = await createClient();

  const groupId = uuidv4(); // A single ID for this batch of files
  const uploadedFiles = [];

  for (const file of files) {
    const { data, error } = await supaServ.storage
      .from("files")
      .upload(`files/${groupId}/${file.name}`, file);

    if (error) {
      console.error("Upload error:", error);
      continue;
    }

    uploadedFiles.push({
      id: uuidv4(),
      group_id: groupId,
      owner_id: UID,
      file_url: data.path,
      created_at: new Date(Date.now()),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
    });
  }

  // If no files were uploaded, return an error
  if (uploadedFiles.length === 0) {
    throw new Error("No files were uploaded successfully.");
  }

  // Store file metadata in Supabase
  await supaServ.from("files").insert(uploadedFiles);

  // Return path for QR code generation
  const finalPath = pathname + "/file/" + groupId;
  return finalPath;
};

export const fetchFiles = async (group_id: string) => {
  const { data } = await supabase
    .from("files")
    .select("*")
    .eq("group_id", group_id);

  return data;
};
