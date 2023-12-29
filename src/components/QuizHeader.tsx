"use client";
import { diffMap, diffColorMap } from "@/types/Filter";
import { QData } from "@/types/Question";

export default function QuizFilter(props: { data: QData }) {
  let diffColor: string = diffColorMap.get(props.data.difficulty)!;
  return (
    <div className="flex flex-row justify-between text-2xl">
      <h1>{props.data.id + ". " + props.data.title}</h1>
      <h1 className={diffColor}>{diffMap.get(props.data.difficulty)}</h1>
    </div>
  );
}
