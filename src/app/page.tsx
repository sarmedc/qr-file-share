import { v4 as uuidv4 } from "uuid";
import { supabase } from "supabase/index";

// const uploadFile = async (file: File) => {
//   const { data, error } = await supabase.storage
//     .from("uploads")
//     .upload(`files/${file.name}`, file);

//   if (error) {
//     console.error("Upload error:", error);
//     return;
//   }

//   // Store file reference in database
//   const fileId = uuidv4();
//   await supabase.from("files").insert({
//     id: fileId,
//     file_url: data.path,
//     expires_at: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12h expiry
//   });

//   return fileId;
// };

const uploadFiles = async (files: FileList) => {
  const groupId = uuidv4(); // A single ID for this batch of files
  const uploadedFiles = [];

  for (const file of files) {
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(`files/${groupId}/${file.name}`, file);

    if (error) {
      console.error("Upload error:", error);
      return;
    }

    uploadedFiles.push({
      file_url: data.path,
      group_id: groupId,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
    });
  }

  // Store file metadata in Supabase
  await supabase.from("files").insert(uploadedFiles);

  setQrCodeUrl(`${window.location.origin}/file/${groupId}`); // Generate QR code
};

export default function Home() {
  return (
    <div>
      <input type="file" />
    </div>
  );
}
