"use client";

import { useEffect } from "react";
import { supabase } from "supabase/client";
import { useQrContext, File } from "@/src/context/QrContext";
import { fetchFiles } from "app/file/[group_id]/actions";
import { Download } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

export const FileList = ({ group_id }: { group_id: string }) => {
  const { files, setFiles } = useQrContext();

  useEffect(() => {
    const handleFetch = async () => {
      const data = await fetchFiles(group_id);
      setFiles(data || []);
    };

    if (group_id) {
      handleFetch();
    }
  }, [group_id, setFiles]);

  function downloadFile(link: string, file_name: string) {
    const linkEl = document.createElement("a");
    linkEl.href = link; // Change to your file URL
    linkEl.download = file_name; // Set the filename
    document.body.appendChild(linkEl);
    linkEl.click();
    document.body.removeChild(linkEl);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Download Files</CardTitle>
        <CardDescription>
          View and download your retrieved files
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {files && files.length > 0 ? (
            files.map((file: File, index) => {
              const { file_name, file_size, file_date } = file.metadata;
              const link = supabase.storage
                .from("uploads")
                .getPublicUrl(file_name) as unknown as string;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>X</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{file_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {file_size} • {file_date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => downloadFile(link, file_name)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No files found or expired.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
