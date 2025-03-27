"use client";

import { useQrContext } from "context/QrContext";
import { UploadComponent } from "@/components/UploadComponent";
import { QRComponent } from "@/components/QRComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";

export const HomePage = ({ uid }: { uid: string }) => {
  const { qrCodeUrl, tab, setTab, setUID } = useQrContext();

  const handleTabChange = (value: string) => {
    setTab(value);
  };

  useEffect(() => {
    if (!uid) return;
    setUID(uid);
  }, [uid, setUID]);

  return (
    <Tabs defaultValue="upload" value={tab} onValueChange={handleTabChange}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger value="qr" disabled={qrCodeUrl === ""}>
          QR Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="upload">
        <UploadComponent />
      </TabsContent>
      <TabsContent value="qr">
        <QRComponent />
      </TabsContent>
    </Tabs>
  );
};
