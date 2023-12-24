import Header from "@/components/Header";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedRoute() {
  const session = await getServerSession();
  if (session?.user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/account");
  }

  return (
    <main className="flex flex-col bg-neutral-700 bg-cover w-full h-screen">
      <Header />
      <h1>TODO: build admin page</h1>
    </main>
  );
}
