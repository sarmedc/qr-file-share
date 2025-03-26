import { QrContext } from "context/QrContext";
import { HomePage } from "@/components/HomePage";

export default function Home() {
  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        QR File Share
      </h2>
      <QrContext>
        <HomePage />
      </QrContext>
    </div>
  );
}
