"use client";
import { QData } from "@/types/Question";

export default function QuizAnswer(props: {
  qData: QData;
  qPart: number;
  onSubmitAnswer: any;
  handleSubmitAnswer: any;
  registerAnswer: any;
  qCompleted: any;
  nextQuestionPart: any;
  qPartCompleted: any;
  setShowFilter: any;
}) {
  return (
    <div className="flex flex-col gap-1 sm:gap-3">
      <h2>{props.qData.questions[props.qPart].questionText}</h2>
      <form
        id="answer"
        onSubmit={props.handleSubmitAnswer(props.onSubmitAnswer)}
        className="flex flex-col"
      >
        {props.qData.questions[props.qPart].options.map((option, index) => (
          <label
            key={index}
            htmlFor={option}
            className="flex flex-row gap-2 items-center"
          >
            <input
              id={option}
              type="radio"
              value={index}
              {...props.registerAnswer("answer")}
              className="checkbox-round checkbox-unchecked checkbox-checked-green"
            />
            <label htmlFor={option}>{option}</label>
          </label>
        ))}
      </form>
      <div className="flex flex-row gap-3">
        <button
          type="submit"
          form="answer"
          className={`${
            props.qCompleted ? "hidden" : ""
          } w-20 checkbox-unchecked text-black py-1 text-sm rounded-md`}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => props.nextQuestionPart()}
          className={`${
            props.qPartCompleted ? "" : "hidden"
          } w-20 checkbox-unchecked text-black py-1 px-5 text-sm rounded-md`}
        >
          Next
        </button>
        <button
          type="submit"
          form="filter"
          className={`${
            props.qCompleted ? "" : "hidden"
          } w-40 checkbox-unchecked text-black py-1 px-5 text-sm rounded-md`}
        >
          Next Question
        </button>
      </div>
    </div>
  );
}
