import Header from "@/components/Header";
import NavMenu from "@/components/NavMenu";
import User from "@/models/user";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // const session = await getServerSession();
  // if (!session?.user?.email) {
  //   redirect("/api/auth/signin");
  // }

  // let user = await User.findOneAndUpdate(
  //   { email: session.user.email },
  //   { $setOnInsert: { saved: [], completed: [] } },
  //   { upsert: true, new: true, setDefaultsOnInsert: true }
  // );

  return (
    <main className="flex flex-col bg-neutral-700 bg-cover w-full h-screen">
      <Header showBackground={true} />
      <NavMenu
      // session={session}
      // saved={user.saved}
      // completed={user.completed}
      />
    </main>
  );
}
