import Header from "@/components/Header";
import QuizWindow from "@/components/QuizWindow";

import { getServerSession } from "next-auth";

export default async function Home({ params }: { params: { id: string[] } }) {
  const questionNum: string = params.id ? params.id[0] : "217"; // default question number

  // use getServerSideProps or getStaticProps instead
  // const [saved, setSaved] = useState<string[]>([]);
  // const [completed, setCompleted] = useState<string[]>([]);

  let saved: string[] = [];
  let completed: string[] = [];

  const session = await getServerSession();
  if (session?.user?.email) {
    let query = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user.email}`;
    await fetch(query, {
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
