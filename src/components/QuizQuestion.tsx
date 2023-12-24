"use client";
import { QData } from "@/types/Question";

export default function QuizQuestion(props: { data: QData }) {
  return (
    <div className="flex flex-col w-1/2 gap-3">
      <h2>{props.data.description}</h2>
      {props.data.examples &&
        props.data.examples.map((example, index) => (
          <div key={index} className="pl-2 border-l-2 border-teal-300">
            <h3>Example {index + 1}:</h3>
            <h3>Input: {example.input}</h3>
            <h3>Output: {example.output}</h3>
          </div>
        ))}
      <ul className="flex flex-col gap-1">
        <h2>Constraints:</h2>
        {props.data.constraints &&
          props.data.constraints.map((constraint, index) => (
            <li
              key={index}
              className="bg-stone-800 w-max max-w-full ml-5 py-1 px-3 rounded-md list-disc text-sm"
            >
              {constraint}
            </li>
          ))}
      </ul>
    </div>
  );
}
