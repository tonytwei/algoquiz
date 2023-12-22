import Header from '../../../components/Header'
import QuizWindow from '../../../components/QuizWindow'

// async function callQuestionApi(qNum: string) {
//   const baseURL = process.env.BASE_URL?.toString() || '';
//   const res = await fetch(baseURL + "/question/" + qNum, {
//     method: 'GET',
//     cache: 'no-store'
//   });
//   const question = await res.json();
//   return question;
// }

export default function Home(
  { params }: { params: { id: string[] }}
) {
  const defaultQuestionNum: String = "111";
  const questionNum: String = params.id? params.id[0]: defaultQuestionNum;
  
  return (
    <main className="flex flex-col bg-neutral-700 bg-cover w-full h-screen">
      <Header />
      <QuizWindow
        questionNum={questionNum}
      />
    </main>
  )
}
