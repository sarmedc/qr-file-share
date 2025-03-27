import { redirect } from "next/navigation";
import { QrContext } from "context/QrContext";
import { HomePage } from "@/components/HomePage";
import { createClient } from "supabase/server";
import { signOut } from "./login/actions";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        QR File Share
      </h2>
      <button onClick={signOut}>Log Out</button>
      <QrContext>
        <HomePage uid={user?.id} />
      </QrContext>
    </div>
  );
}
