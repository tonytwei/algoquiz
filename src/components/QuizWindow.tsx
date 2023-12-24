"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { QFilter, QAnswer, QData } from "@/types/Question";
import QuizFilter from "@/components/QuizFilter";
import QuizHeader from "@/components/QuizHeader";
import QuizQuestion from "@/components/QuizQuestion";
import QuizAnswer from "@/components/QuizAnswer";
import QuizButtons from "@/components/QuizButtons";

export default function QuizWindow(props: { questionNum: String }) {
  const [data, setData] = useState<QData>();
  const [isLoading, setLoading] = useState(() => true);
  const [error, setError] = useState(() => "");

  const [questionPart, setQuestionPart] = useState<number>(0);
  const [questionPartCompleted, setQuestionPartCompleted] =
    useState<boolean>(false);
  const [questionCompleted, setQuestionCompleted] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const {
    register: registerFilter,
    handleSubmit: handleSubmitFilter,
    reset: resetFilter,
  } = useForm<QFilter>({
    defaultValues: {
      set: "all",
    },
  });
  const onSubmitFilter: SubmitHandler<QFilter> = (filterData) =>
    console.log(filterData);

  const {
    register: registerAnswer,
    handleSubmit: handleSubmitAnswer,
    reset: resetAnswer,
  } = useForm<QAnswer>({
    defaultValues: {
      answer: -1,
    },
  });
  const onSubmitAnswer: SubmitHandler<QAnswer> = (answerData) => {
    if (answerData.answer != data!.questions[questionPart].answer) {
      console.log("wrong answer" + answerData.answer); // TODO: remove
      return;
    }
    console.log("correct answer" + answerData.answer); // TODO: remove
    if (questionPart + 1 == data!.questions.length) {
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
  };

  const query = `${process.env.NEXT_PUBLIC_BASE_URL}/question/${props.questionNum}`;
  useEffect(() => {
    if (data == undefined) {
      setLoading(true);
      fetch(query, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.response);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error.toString());
          setLoading(false);
        });
    }
  }, [data, query]);

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>Question not found</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full max-w-[1000px] justify-center px-5 py-8 h-max md:gap-5">
        <QuizFilter
          showFilter={showFilter}
          registerFilter={registerFilter}
          onSubmitFilter={onSubmitFilter}
          handleSubmitFilter={handleSubmitFilter}
          resetFilter={resetFilter}
          setShowFilter={setShowFilter}
        />

        {/* quiz window */}
        <div className="flex flex-col bg-overlay h-min rounded-md p-6 gap-4 text-white">
          <QuizHeader data={data} />
          <div className="flex flex-row w-full gap-3">
            <QuizQuestion data={data} />

            {/* answer */}
            <div className="flex flex-col w-1/2 place-content-between">
              <QuizAnswer
                data={data}
                questionPart={questionPart}
                onSubmitAnswer={onSubmitAnswer}
                handleSubmitAnswer={handleSubmitAnswer}
                registerAnswer={registerAnswer}
                questionCompleted={questionCompleted}
                nextQuestionPart={nextQuestionPart}
                questionPartCompleted={questionPartCompleted}
              />
              <QuizButtons setShowFilter={setShowFilter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
