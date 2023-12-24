"use client";
import { diffMap } from "@/types/Filter";
import { QData } from "@/types/Question";

export default function QuizFilter(props: { data: QData }) {
  const diffColorMap: { [key: string]: string } = {
    easy: "text-[#89ff8d]",
    medium: "text-[#ffd23e]",
    hard: "text-red-800",
  };
  const diffColor: string = diffColorMap[props.data.difficulty];

  return (
    <div className="flex flex-row justify-between text-2xl">
      <h1>{props.data.title}</h1>
      <h1 className={diffColor}>{diffMap.get(props.data.difficulty)}</h1>
    </div>
  );
}
