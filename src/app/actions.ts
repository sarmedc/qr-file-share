"use server";

import { v4 as uuidv4 } from "uuid";
import { createClient } from "supabase/server";
import { convertDate, convertSize } from "@/lib/utils";

export const uploadFiles = async (files: any[], UID: string) => {
  const supabase = await createClient();

  const groupId = uuidv4(); // A single ID for this batch of files
  const uploadedFiles = [];

  for (const file of files) {
    const { data, error } = await supabase.storage
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
      created_at: new Date(Date.now()),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
      metadata: {
        file_url: data.path,
        file_name: file.name,
        file_size: convertSize(file.size),
        file_date: convertDate(file.lastModified),
      },
    });
  }

  // If no files were uploaded, return an error
  if (uploadedFiles.length === 0) {
    throw new Error("No files were uploaded successfully.");
  }

  // Store file metadata in Supabase
  await supabase.from("files").insert(uploadedFiles);

  // Return path for QR code generation
  const finalPath = process.env.NEXT_PUBLIC_URL + "/file/" + groupId;
  return finalPath;
};
