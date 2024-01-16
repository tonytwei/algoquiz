"use client";
import { QData } from "@/types/Question";

export default function QuizQuestion(props: { qData: QData }) {
  return (
    <div className="flex flex-col gap-3">
      <h2>{props.qData.description}</h2>
      {props.qData.examples &&
        props.qData.examples.map((example, index) => (
          <div key={index} className="pl-2 border-l-2 border-teal-300">
            <h3>Example {index + 1}:</h3>
            <h3>Input: {example.input}</h3>
            <h3>Output: {example.output}</h3>
          </div>
        ))}
      <ul className="hidden sm:flex flex-col gap-1">
        <h2>Constraints:</h2>
        {props.qData.constraints &&
          props.qData.constraints.map((constraint, index) => (
            <li
              key={index}
              className="bg-stone-800 ml-5 py-1 px-3 rounded-md list-disc text-sm w-max"
            >
              {constraint}
            </li>
          ))}
      </ul>
    </div>
  );
}
