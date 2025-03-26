"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { UUIDTypes } from "uuid";

export type File = {
  id: UUIDTypes;
  group_id: string;
  file_url: string;
  expires_at: Date;
  created_at: Date;
};

interface QrContextProps {
  selectedFiles: any[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<any[]>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  qrCodeUrl: string;
  setQrCodeUrl: React.Dispatch<React.SetStateAction<string>>;
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  handleSetQrCodeUrl: (url: string) => void;
}

interface Props {
  children?: ReactNode;
}

const Context = createContext<QrContextProps>({} as QrContextProps);

export function QrContext({ children }: Props) {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [tab, setTab] = useState("upload");
  const [files, setFiles] = useState<any[]>([]);

  const handleSetQrCodeUrl = (url: string) => {
    setQrCodeUrl(url);
    setTab("qr");
  };

  return (
    <Context.Provider
      value={{
        selectedFiles,
        setSelectedFiles,
        qrCodeUrl,
        setQrCodeUrl,
        handleSetQrCodeUrl,
        tab,
        setTab,
        files,
        setFiles,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useQrContext = () => useContext(Context);
