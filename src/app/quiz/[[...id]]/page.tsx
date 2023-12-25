import Header from "@/components/Header";
import QuizWindow from "@/components/QuizWindow";
import User from "@/models/user";

import { getServerSession } from "next-auth";

export default async function Home({ params }: { params: { id: string[] } }) {
  const defaultQuestionNum: String = "217";
  const questionNum: String = params.id ? params.id[0] : defaultQuestionNum;

  let saved = [];
  let completed = [];
  const session = await getServerSession();
  if (session?.user?.email) {
    let user = await User.findOne({ email: session.user.email });
    saved = user?.saved;
    completed = user?.completed;
  }

  console.log("saved: " + saved);
  console.log("completed: " + completed);

  return (
    <main className="flex flex-col bg-neutral-700 bg-cover w-full h-screen">
      <Header />
      <QuizWindow
        questionNum={questionNum}
        saved={saved}
        completed={completed}
      />
    </main>
  );
}
