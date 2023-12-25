"use client";
import { QData } from "@/types/Question";

export default function QuizAnswer(props: {
  data: QData;
  questionPart: number;
  onSubmitAnswer: any;
  handleSubmitAnswer: any;
  registerAnswer: any;
  questionCompleted: any;
  nextQuestionPart: any;
  questionPartCompleted: any;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2>{props.data.questions[props.questionPart].questionText}</h2>
      <form
        id="answer"
        onSubmit={props.handleSubmitAnswer(props.onSubmitAnswer)}
        className="flex flex-col"
      >
        {props.data.questions[props.questionPart].options.map(
          (option, index) => (
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
          )
        )}
      </form>
      <div className="flex flex-row gap-3">
        <button
          type="submit"
          form="answer"
          className={`${
            props.questionCompleted ? "hidden" : ""
          } w-20 checkbox-unchecked text-black py-1 text-sm rounded-md`}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => props.nextQuestionPart()}
          className={`${
            props.questionPartCompleted ? "" : "hidden"
          } w-20 checkbox-unchecked text-black py-1 px-5 text-sm rounded-md`}
        >
          Next
        </button>
        <button
          type="submit"
          onClick={() => console.log("next question")}
          className={`${
            props.questionCompleted ? "" : "hidden"
          } w-40 checkbox-unchecked text-black py-1 px-5 text-sm rounded-md`}
        >
          Next Question
        </button>
      </div>
    </div>
  );
}
