"use server";
import Header from "@/components/Header";
import QuizWindow from "@/components/QuizWindow";
import { QData } from "@/types/Question";
import { getServerSession } from "next-auth";

export default async function Home({ params }: { params: { id: string[] } }) {
  // user data
  // TODO: pass user email to QuizWindow for saving/completing
  const session = await getServerSession();
  let saved: string[] = [];
  let completed: string[] = [];
  if (session?.user?.email) {
    const userQuery: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user.email}`;
    await fetch(userQuery, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        saved = data.response.saved;
        completed = data.response.completed;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // question data
  const questionNum: string = params.id ? params.id[0] : "217"; // default question number
  const questionQuery: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/question/${questionNum}`;
  let qData = {} as QData;
  await fetch(questionQuery, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
    cache: "no-store",
  })
    .then((res) => res.json())
    .then((data) => {
      qData = data.response;
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <main className="flex flex-col bg-neutral-700 bg-cover w-full h-screen">
      <Header showBackground={true} />
      <QuizWindow saved={saved} completed={completed} qData={qData} />
    </main>
  );
}
