"use server";
import Header from "@/components/Header";
import AccountWindow from "@/components/AccountWindow";

import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  let savedList: string[] = [];
  let completedList: string[] = [];
  let user: any;
  if (session?.user?.email) {
    console.log(session.user.email);
    const userQuery: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user.email}`;
    user = await fetch(userQuery, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        savedList = data.response.saved;
        completedList = data.response.completed;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <main className="flex flex-col items-center bg-neutral-700 bg-cover w-full h-screen">
      <Header showBackground={true} />
      <AccountWindow savedList={savedList} completedList={completedList} />
    </main>
  );
}
