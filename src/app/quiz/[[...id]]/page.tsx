"use server";
import Header from "@/components/Header";
import QuizWindow from "@/components/QuizWindow";
import { QData } from "@/types/Question";
import { getServerSession } from "next-auth";
import { useEffect } from "react";

export default async function Home({ params }: { params: { id: string[] } }) {
  // question data
  const questionNum: string[] = params.id ? params.id : ["217"]; // default question number
  const questionQuery: string = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/api/question?${questionNum.map((id) => `id=${id}`).join("&")}`;
  let qData = {} as QData;
  let qSaved: boolean = false;
  const questionPromise = fetch(questionQuery, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
    cache: "no-store",
  }).then((res) => res.json());

  // user data
  const session = await getServerSession();
  let savedList: string[] = [];
  let completedList: string[] = [];
  let userPromise;
  if (session?.user?.email) {
    const userQuery: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user.email}`;
    userPromise = fetch(userQuery, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    }).then((res) => res.json());
  }

  try {
    const [questionData, userData] = await Promise.all([
      questionPromise,
      userPromise,
    ]);

    qData = questionData.response[0];
    if (userData) {
      savedList = userData.response.saved;
      completedList = userData.response.completed;
      qSaved = savedList.includes(questionNum[0]);
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="flex flex-col bg-neutral-700 bg-cover w-full h-full min-h-screen">
      <Header showBackground={true} />
      <QuizWindow
        savedList={savedList}
        completedList={completedList}
        qSaved={qSaved}
        qData={qData}
      />
    </main>
  );
}
