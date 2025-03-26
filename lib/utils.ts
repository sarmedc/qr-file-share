import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "supabase/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadFiles = async (
  files: FileList,
  setQrCodeUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  const groupId = uuidv4(); // A single ID for this batch of files
  const uploadedFiles = [];

  for (const file of files) {
    const { data, error } = await supabase.storage
      .from("files")
      .upload(`files/${groupId}/${file.name}`, file);

    if (error) {
      console.error("Upload error:", error);
      return;
    }

    uploadedFiles.push({
      id: uuidv4(),
      group_id: groupId,
      file_url: data.path,
      created_at: new Date(Date.now()),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
    });
  }

  // Store file metadata in Supabase
  await supabase.from("files").insert(uploadedFiles);

  setQrCodeUrl(`${window.location.origin}/file/${groupId}`); // Generate QR code
};

export const fetchFiles = async (group_id: string, setFiles) => {
  const { data } = await supabase
    .from("files")
    .select("*")
    .eq("group_id", group_id);

  setFiles(data || []);
};
