"use client";

import { QrCode } from "./QrCode";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Copy, Download } from "lucide-react";
import { useQrContext } from "context/QrContext";
import { useRef } from "react";

export const QRComponent = () => {
  const { qrCodeUrl } = useQrContext();
  const qrRef = useRef<HTMLCanvasElement>(null);

  const downloadQRCode = () => {
    if (!qrRef.current) return;

    const canvas = qrRef.current;
    const pngUrl = canvas.toDataURL("image/png"); // Convert canvas to PNG

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCodeUrl);
  };

  return (
    <Card className="md:m-10 sm:m-7 p-5">
      <div>
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Your QR Code
        </h3>
        <p className="text-sm text-muted-foreground">
          Share this QR code to provide access to your file
        </p>
      </div>
      <div className="flex flex-col items-center content-around">
        <QrCode link={qrCodeUrl} ref={qrRef} />
        <p className="text-sm text-muted-foreground m-2 pt-1">
          Scan this QR code or use the options below to share your file
        </p>
      </div>
      <div className="flex justify-around">
        <Button
          variant="outline"
          className="flex flex-auto flex-col p-10 px-40 mx-20 text-indigo-800"
          onClick={handleCopy}
        >
          <Copy />
          <div>Copy Link</div>
        </Button>
        {/* <Button
          variant="outline"
          className="flex flex-col p-10 px-40 text-indigo-800"
        >
          <Share2 />
          <div>Share QR</div>
        </Button> */}
        <Button
          variant="outline"
          className="flex flex-auto flex-col p-10 px-40 mx-20 text-indigo-800"
          onClick={downloadQRCode}
        >
          <Download />
          <div>Download QR</div>
        </Button>
      </div>
    </Card>
  );
};
