"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Upload as UploadIcon } from "lucide-react";
import { useQrContext } from "context/QrContext";
import { uploadFiles } from "app/actions";
import { usePathname } from "next/navigation";

export const UploadComponent = () => {
  const { selectedFiles, setSelectedFiles, handleSetQrCodeUrl, UID } =
    useQrContext();
  const pathname = usePathname();
  const path = pathname === "/" ? "" : pathname;

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
    },
    [setSelectedFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop,
  });

  const files = selectedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleUpload = async () => {
    const url = await uploadFiles(selectedFiles, UID, path);
    console.log(url);
    handleSetQrCodeUrl(url || "");
  };

  return (
    <Card className="md:m-10 sm:m-7 p-5">
      <div>
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Upload a File
        </h3>
        <p className="text-sm text-muted-foreground">
          Upload a file to generate a shareable QR code
        </p>
      </div>
      <div className="">
        <Label className="mb-1">File</Label>
        <section className="container">
          <div
            {...getRootProps({
              className:
                "dropzone flex-1 flex flex-col items-center p-10 border-2 border-dashed border-primary/20 rounded-lg bg-muted/50 text-gray-400 outline-none transition-all duration-200 ease-in-out",
            })}
          >
            <input {...getInputProps()} />
            <UploadIcon />
            <p className="mt-3">
              Drag and drop your files here, or click to browse
            </p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        </section>
      </div>
      <Button onClick={handleUpload}>Upload and Generate QR</Button>
    </Card>
  );
};
