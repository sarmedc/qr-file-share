import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDropzone } from "react-dropzone";

export const Upload = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      <h1>Upload a File</h1>
      <p>Upload a file to generate a shareable QR code</p>
      <Label>File</Label>
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
      <Button>Upload and Generate QR</Button>
    </div>
  );
};
