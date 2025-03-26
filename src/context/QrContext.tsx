"use client";

import { createContext, useContext, useState } from "react";

interface QrContextProps {
  selectedFiles: FileList;
  setSelectedFiles: React.Dispatch<React.SetStateAction<FileList>>;
  qrCodeUrl: string;
  setQrCodeUrl: React.Dispatch<React.SetStateAction<string>>;
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  handleSetQrCodeUrl: (url: string) => void;
}

const Context = createContext<QrContextProps>({} as QrContextProps);

export function QrContext({ children }) {
  const [selectedFiles, setSelectedFiles] = useState<FileList>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [tab, setTab] = useState("upload");

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
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useQrContext = () => useContext(Context);
