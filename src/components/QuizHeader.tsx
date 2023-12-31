"use client";
import { diffMap, diffColorMap } from "@/types/Filter";
import { QData } from "@/types/Question";

export default function QuizFilter(props: { qData: QData }) {
  let diffColor: string = diffColorMap.get(props.qData.difficulty)!;
  return (
    <div className="flex flex-row justify-between text-2xl">
      <h1>{props.qData.id + ". " + props.qData.title}</h1>
      <h1 className={diffColor}>{diffMap.get(props.qData.difficulty)}</h1>
    </div>
  );
}
