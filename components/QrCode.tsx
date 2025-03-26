import { QRCodeCanvas } from "qrcode.react";

export const QrCode = ({ link }: { link: string }) => (
  <QRCodeCanvas value={link} size={256} />
);
