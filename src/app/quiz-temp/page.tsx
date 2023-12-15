import Header from '../../components/Header'
import QuizWindow from '../../components/QuizWindow'

async function callQuestionApi(qNum: string) {
  const baseURL = process.env.BASE_URL?.toString() || ''
  const res = await fetch(baseURL + "/question/" + qNum, {
    method: 'GET',
    cache: 'no-store'
  })
  const question = await res.json()
  return question
}

type QData = {
  id: string
  title: string
  difficulty: string
  topcs: [string]
  sets: [string]
  description: string
  examples: [object]
  constraints: [string]
  questions: [object]
}

export default async function Home() {
  const qNum: string = "111"
  const question: QData = await callQuestionApi(qNum)
  return (
    <main className="flex flex-col bg-neutral-700 h-screen">
      <Header />
      <QuizWindow
        {...question}
      />
    </main>
  )
}
