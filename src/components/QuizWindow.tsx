"use client";
import { useForm, SubmitHandler } from "react-hook-form";

interface QuestionFilter {
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

export default function QuizWindow(question: QData) {
  // console.log(question)
  const { register, handleSubmit, reset } = useForm<QuestionFilter>({
  defaultValues: {
      set: "all"
  }
  });
  const onSubmit: SubmitHandler<QuestionFilter> = data => console.log(data);

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
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row w-full h-max px-10 py-8 gap-5">
      {/* quiz filter */}
      <div className="flex flex-col bg-overlay rounded-md p-5 min-w-[190px] gap-4 text-white">
        <div>
          <h2 className="text-teal-300 text-xl">DIFFICULTY:</h2>
          {diffs.map((diff) => (
            <label key={diff} htmlFor={diff} className="flex flex-row gap-3 items-center">
              <input type="checkbox" {...register(`${diff}` as any)} id={diff} className="checkbox checkbox-unchecked checkbox-checked-green" /> 
              <label htmlFor={diff}>{diffMap.get(diff)}</label>
            </label>
          ))}
        </div>
        <div>
          <h2 className="text-teal-300 text-xl">TOPICS:</h2>
          {topics.map((topic) => (
            <label key={topic} htmlFor={topic} className="flex flex-row gap-3 items-center">
              <input type="checkbox" {...register(`${topic}` as any)} id={topic} className="checkbox checkbox-unchecked checkbox-checked-green" /> 
              <label htmlFor={topic}>{topicMap.get(topic)}</label>
            </label>
          ))}
        </div>
        <div>
          <h2 className="text-teal-300 text-xl">SET:</h2>
          <select {...register("set")} className="text-black w-full">
            {sets.map((set) => (
              <option key={set} value={set}>{setMap.get(set)}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-center">
          <button type="button" onClick={() => reset()} className="checkbox-unchecked text-black py-1 px-2 text-sm">CLEAR FILTERS</button>
        </div>
      </div>
      
      {/* quiz window */}
      <div className="flex flex-col bg-overlay w-4/5 h-min rounded-md p-4 gap-4 text-white">
        <div className="flex flex-row justify-between">
          <h1>{ question.title }</h1>
          <h1>{ question.difficulty }</h1>
        </div>

        { /* question */}
        <div>
          <h2>{ question.description }</h2>
          
        </div>
        
        { /* answer */}
        <div>
        </div>
        <input type="submit" /> {/* TODO: remove later */}
      </div>
    </form>
  )
}