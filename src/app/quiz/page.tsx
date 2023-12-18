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

type QExample = {
  input: string
  output: string
}

type QQuestion = {
  questionText: string
  answer: number
  options: [string]
}

type QData = {
  id: number
  title: string
  difficulty: string
  topcs: [string]
  sets: [string]
  description: string
  examples: [QExample]
  constraints: [string]
  questions: [QQuestion]
}

export default async function Home() {
  const qNum: string = "111"
  const question: QData = await callQuestionApi(qNum)
  return (
    <main className="flex flex-col bg-neutral-700 w-full h-full">
      <Header />
      <QuizWindow
        {...question}
      />
    </main>
  )
}
