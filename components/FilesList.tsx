"use client";

import { useEffect } from "react";
import { supabase } from "supabase/client";
import { useQrContext, File } from "@/src/context/QrContext";
import { fetchFiles } from "@/lib/utils";

export const FileList = ({ group_id }: { group_id: string }) => {
  const { files, setFiles } = useQrContext();

  useEffect(() => {
    if (group_id) fetchFiles(group_id, setFiles);
  }, [group_id, setFiles]);

  return (
    <div>
      {files && files.length > 0 ? (
        files.map((file: File) => {
          const link = supabase.storage
            .from("uploads")
            .getPublicUrl(file.file_url) as unknown as string;
          return (
            <a key={file.file_url} href={link} download>
              {file.file_url.split("/").pop()}
            </a>
          );
        })
      ) : (
        <p>No files found or expired.</p>
      )}
    </div>
  );
};
