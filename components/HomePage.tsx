"use client";

import { useQrContext } from "context/QrContext";
import { UploadComponent } from "@/components/UploadComponent";
import { QRComponent } from "@/components/QRComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const HomePage = () => {
  const { qrCodeUrl, tab, setTab } = useQrContext();

  const handleTabChange = (value: string) => {
    setTab(value);
  };

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
