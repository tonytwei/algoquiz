"use client";
import { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Header from '../../components/Header'

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


async function GetData() {
  const res = await fetch("../api/hello")
  const data = await res.json()
  console.log(data)
  return 0;
}

export default function Home() {
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
    "gdsc-array"
  ];
  const setMap = new Map<String, String>([
    ["all", "All"],
    ["custom", "Custom"],
    ["gdsc-array", "GDSC: Array"],
  ]);

  return (
    <main className="flex flex-col bg-neutral-700 h-screen">
      <Header />
      
      {/* quiz container */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row w-screen h-max">
        {/* quiz filter */}
        <div className="flex flex-col bg-overlay rounded-md p-4 gap-4 text-white">
          <div>
            <h2 className="font-medium">DIFFICULTY:</h2>
            {diffs.map((diff) => (
              <div key={diff} className="flex flex-row gap-1 items-center">
                <input type="checkbox" {...register(`${diff}` as any)} id={diff} className="checkbox checkbox-unchecked checkbox-checked-green" /> 
                <label htmlFor={diff}>{diffMap.get(diff)}</label>
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-medium">TOPICS:</h2>
            {topics.map((topic) => (
              <div key={topic} className="flex flex-row gap-1 items-center">
                <input type="checkbox" {...register(`${topic}` as any)} id={topic} className="checkbox checkbox-unchecked checkbox-checked-green" /> 
                <label htmlFor={topic}>{topicMap.get(topic)}</label>
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-medium">SET:</h2>
            <select {...register("set")} className="text-black w-full">
              {sets.map((set) => (
                <option key={set} value={set}>{setMap.get(set)}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center">
            <button type="button" onClick={() => reset()} className="checkbox-unchecked text-black py-1 px-2 text-sm">CLEAR FILTERS</button>
          </div>
          <input type="submit" /> {/* TODO: remove later */}
        </div>
        
        {/* quiz window */}
        <div>
          <button type="button" onClick={() => {
            console.log("API TEST")
            GetData()
          }}>asd</button>
        </div>
      </form>
    </main>
  )
}
