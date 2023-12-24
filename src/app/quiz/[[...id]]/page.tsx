import Header from "@/components/Header";
import QuizWindow from "@/components/QuizWindow";

export default async function Home({ params }: { params: { id: string[] } }) {
  const defaultQuestionNum: String = "217";
  const questionNum: String = params.id ? params.id[0] : defaultQuestionNum;

  return (
    <main className="flex flex-col bg-neutral-700 bg-cover w-full h-screen">
      <Header />
      <QuizWindow questionNum={questionNum} />
    </main>
  );
}
