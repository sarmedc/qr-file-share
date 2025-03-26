"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Upload as UploadIcon } from "lucide-react";

export const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop,
  });

  const files = selectedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

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
      <div>
        <Label>File</Label>
        <section className="container">
          <div
            {...getRootProps({
              className:
                "dropzone flex-1 flex flex-col items-center p-10 border-2 border-dashed border-primary/20 rounded-lg bg-muted/50 text-gray-400 outline-none transition-all duration-200 ease-in-out",
            })}
          >
            <input {...getInputProps()} />
            <UploadIcon />
            <p>Drag and drop your files here, or click to browse</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        </section>
      </div>
      <Button>Upload and Generate QR</Button>
    </Card>
  );
};

<div className="">{/* Content here */}</div>;
