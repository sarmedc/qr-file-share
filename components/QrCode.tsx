import { QRCodeCanvas } from "qrcode.react";
import { Ref } from "react";

export const QrCode = ({
  link,
  ref,
}: {
  link: string;
  ref: Ref<HTMLCanvasElement>;
}) => <QRCodeCanvas value={link} size={256} ref={ref} />;
