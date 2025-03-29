import { redirect } from "next/navigation";
import { QrContext } from "context/QrContext";
import { HomePage } from "@/components/HomePage";
import { createClient } from "supabase/server";

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
      <QrContext>
        <HomePage uid={user?.id} />
      </QrContext>
    </div>
  );
}
