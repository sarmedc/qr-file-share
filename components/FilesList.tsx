"use client";

import { useState, useEffect } from "react";
import { supabase } from "supabase/client";

export const FileList = ({ group_id }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const { data } = await supabase
        .from("files")
        .select("*")
        .eq("group_id", group_id);

      setFiles(data || []);
    };

    if (group_id) fetchFiles();
  }, [group_id]);

  return (
    <div>
      {files.length > 0 ? (
        files.map((file) => (
          <a
            key={file.file_url}
            href={supabase.storage.from("uploads").getPublicUrl(file.file_url)}
            download
          >
            {file.file_url.split("/").pop()}
          </a>
        ))
      ) : (
        <p>No files found or expired.</p>
      )}
    </div>
  );
};
