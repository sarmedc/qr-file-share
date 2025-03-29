"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { UUIDTypes } from "uuid";

export type FileMetadata = {
  file_url: string;
  file_name: string;
  file_size: string;
  file_date: string;
};
export type File = {
  id: UUIDTypes;
  group_id: string;
  expires_at: Date;
  created_at: Date;
  metadata: FileMetadata;
};

interface QrContextProps {
  selectedFiles: any[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<any[]>>;
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  qrCodeUrl: string;
  setQrCodeUrl: React.Dispatch<React.SetStateAction<string>>;
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  handleSetQrCodeUrl: (url: string) => void;
  UID: string;
  setUID: React.Dispatch<React.SetStateAction<string>>;
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
  const [UID, setUID] = useState("");

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
        UID,
        setUID,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useQrContext = () => useContext(Context);
