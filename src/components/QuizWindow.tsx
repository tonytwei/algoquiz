"use client";
import { useState } from "react";
import Image from 'next/image'
import { useForm, SubmitHandler } from "react-hook-form";

interface QFilter {
  easy: Boolean;
  medium: Boolean;
  hard: Boolean;
  array: Boolean;
  twoPointers: Boolean;
  slidingWindow: Boolean;
  stack: Boolean;
  binarySearch: Boolean;
  linkedList: Boolean;
  trees: Boolean;
  heap: Boolean;
  backtracking: Boolean;
  graphs: Boolean;
  dynamicProgramming: Boolean;
  greedy: Boolean;
  set: String;
}

interface QAnswer {
  answer: Number
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

const diffs: Array<string> = [
"easy",
"medium",
"hard"
];
const diffMap = new Map<String, String>([
["easy", "Easy"],
["medium", "Medium"],
["hard", "Hard"],
]);
const topics: Array<string> = [
"array",
"twoPointers",
"slidingWindow",
"stack",
"binarySearch",
"linkedList",
"trees",
"heap",
"backtracking",
"graphs",
"dynamicProgramming",
"greedy"
];
const topicMap = new Map<String, String>([
["array", "Array"],
["twoPointers", "Two Pointers"],
["slidingWindow", "Sliding Window"],
["stack", "Stack"],
["binarySearch", "Binary Search"],
["linkedList", "Linked List"],
["trees", "Trees"],
["heap", "Heap"],
["backtracking", "Backtracking"],
["graphs", "Graphs"],
["dynamicProgramming", "DP"],
["greedy", "Greedy"]
]);
const sets: Array<string> = [
"all",
"custom",
"saved",
"completed",
"gdsc-array"
];
const setMap = new Map<String, String>([
["all", "All"],
["custom", "Custom"],
["saved", "Saved"],
["completed", "Completed"],
["gdsc-array", "GDSC: Array"],
]);

const diffColorMap = new Map<string, string>([
  ["easy", "text-[#89ff8d]"],
  ["medium", "text-[#ffd23e]"],
  ["hard", "text-[#F44336]"],
])

export default function QuizWindow(question: QData) {
  // console.log(question)
  const questionPartLen = question.questions.length;
  const [questionPart, setQuestionPart] = useState<number>(0)
  const [questionPartCompleted, setQuestionPartCompleted] = useState<boolean>(false)
  const [questionCompleted, setQuestionCompleted] = useState<boolean>(false)
  const [filterOverlay, setFilterOverlay] = useState<boolean>(false)

  const {
    register: registerFilter,
    handleSubmit: handleSubmitFilter,
    reset: resetFilter
  } = useForm<QFilter>({
  defaultValues: {
    set: "all"
  }
  });
  const onSubmitFilter: SubmitHandler<QFilter> = data => console.log(data);
  
  const {
    register: registerAnswer,
    handleSubmit: handleSubmitAnswer,
    reset: resetAnswer
  } = useForm<QAnswer>({
  defaultValues: {
    answer: -1
  }
  });
  const onSubmitAnswer: SubmitHandler<QAnswer> = (data) => {
    if (data.answer != question.questions[questionPart].answer) {
      console.log("wrong answer" + data.answer); // TODO: remove
      return;
    }
    console.log("correct answer" + data.answer); // TODO: remove
    if (questionPart + 1 == questionPartLen) {
      setQuestionCompleted(true);
      // setQuestionPartCompleted(true);
    } else {
      setQuestionPartCompleted(true);
    }
  };

  const nextQuestionPart = () => {
    setQuestionPart(questionPart + 1);
    resetAnswer();
    setQuestionPartCompleted(false);
  }
  
  return (
    <div className="flex flex-row w-full h-max px-10 py-8 md:gap-5">
      {/* quiz filter */}
      <div className={`${filterOverlay ? "absolute inset-0 bg-black/50 w-full h-full py-8 px-10" : ""}`}>
        <div className={`${filterOverlay ? "w-full h-full flex flex-col items-center gap-4" : "hidden md:block"}`}>
          <form id="filter" onSubmit={handleSubmitFilter(onSubmitFilter)} className={`flex flex-col bg-overlay rounded-md p-5 w-max h-min gap-4 text-white`}>
            <div>
              <h2 className="text-teal-300 text-xl">DIFFICULTY:</h2>
              {diffs.map((diff, index) => (
                <label key={index} htmlFor={diff} className="flex flex-row gap-3 items-center">
                  <input type="checkbox" {...registerFilter(`${diff}` as any)} id={diff} className="checkbox-square checkbox-unchecked checkbox-checked-green" /> 
                  <label htmlFor={diff}>{diffMap.get(diff)}</label>
                </label>
              ))}
            </div>
            <div>
              <h2 className="text-teal-300 text-xl">TOPICS:</h2>
              {topics.map((topic, index) => (
                <label key={index} htmlFor={topic} className="flex flex-row gap-3 items-center">
                  <input type="checkbox" {...registerFilter(`${topic}` as any)} id={topic} className="checkbox-square checkbox-unchecked checkbox-checked-green" /> 
                  <label htmlFor={topic}>{topicMap.get(topic)}</label>
                </label>
              ))}
            </div>
            <div>
              <h2 className="text-teal-300 text-xl">SET:</h2>
              <select {...registerFilter("set")} className="text-black w-full">
                {sets.map((set, index) => (
                  <option key={index} value={set}>{setMap.get(set)}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center">
              <button type="button" onClick={() => resetFilter()} className="checkbox-unchecked w-full text-black py-1 px-2 text-sm rounded-md">CLEAR FILTERS</button>
            </div>
          </form>
          <div className="flex flex-col items-center">
            <button type="button" onClick={() => setFilterOverlay(false)} className={`${filterOverlay ? "": "hidden"} checkbox-unchecked w-min text-black py-1 px-2 text-sm rounded-md`}>CLOSE</button>
          </div>
        </div>
      </div>

      {/* quiz window */}
      <div className="flex flex-col bg-overlay w-full h-min rounded-md p-6 gap-4 text-white">
        <div className="flex flex-row justify-between text-2xl">
          <h1>{ question.title }</h1>
          <h1 className={diffColorMap.get(question.difficulty)}>{ diffMap.get(question.difficulty) }</h1>
        </div>
        
        <div className="flex flex-row gap-3">
          { /* question */}
          <div className="flex flex-col min-w-[50%] gap-3">
            <h2>{ question.description }</h2>
            {question.examples.map((example, index) => (
              <div key={index} className="pl-2 border-l-2 border-teal-300">
                <h3>Example { index + 1 }:</h3>
                <h3>Input: { example.input }</h3>
                <h3>Output: { example.output }</h3>
              </div>
            ))}
            <ul className="flex flex-col gap-1">
              <h2>Constraints:</h2>
              {question.constraints.map((constraint, index) => (
                <li key={index} className="bg-stone-800 max-w-full w-max ml-5 py-1 px-3 rounded-md list-disc text-sm">{ constraint }</li>
              ))}
            </ul>
          </div>
          
          { /* answer */}
          <div className="flex flex-col min-w-[50%] place-content-between">
            <div className="flex flex-col gap-3">
              <h2>{ question.questions[questionPart].questionText }</h2>
              <form id="answer" onSubmit={handleSubmitAnswer(onSubmitAnswer)} className="flex flex-col">
                {question.questions[questionPart].options.map((option, index) => (
                  <label key={index} htmlFor={option} className="flex flex-row gap-2 items-center">
                    <input id={option} type="radio" value={index} {...registerAnswer("answer")} className="checkbox-round checkbox-unchecked checkbox-checked-green" />
                    <label htmlFor={option}>{ option }</label>
                  </label>
                ))}
              </form>
              <div className="flex flex-row gap-3">
                <button type="submit" form="answer" className={`${questionCompleted ? "hidden": ""} w-1/3 checkbox-unchecked text-black py-1 px-5 text-sm rounded-md`}>Submit</button>
                <button type="button" onClick={() => nextQuestionPart()} className={`${questionPartCompleted ? "": "hidden"} w-1/3 checkbox-unchecked text-black py-1 px-5 text-sm rounded-md`}>Next</button>
                <button type="submit" onClick={() => console.log("next question")} className={`${questionCompleted ? "": "hidden"} w-1/2 checkbox-unchecked text-black py-1 px-5 text-sm rounded-md`}>Next Question</button>
              </div>
            </div>
            <div className="flex place-content-end gap-2 px-3">
              <button type="submit" form="filter" className="checkbox-unchecked rounded-md py-1 px-3">
                <Image
                  src="/images/quiz/bookmark-false.png"
                  alt="Save Question"
                  width="24"
                  height="24"
                />
              </button>
              <button type="submit" form="filter" className="checkbox-unchecked rounded-md py-1 px-3">
                <Image
                  src="/images/quiz/bookmark-true.png"
                  alt="Unsave Question"
                  width="24"
                  height="24"
                />
              </button>
              <button type="submit" form="filter" className="checkbox-unchecked rounded-md py-1 px-3">
                <Image
                  src="/images/quiz/question-list.png"
                  alt="Open Question List"
                  width="24"
                  height="24"
                />
              </button>
              <button type="button" onClick={() => setFilterOverlay(true)} className="md:hidden checkbox-unchecked rounded-md py-1 px-3">
                <Image
                  src="/images/quiz/settings.png"
                  alt="Open Settings"
                  width="24"
                  height="24"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}