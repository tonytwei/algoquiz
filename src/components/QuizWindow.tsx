"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { QFilter, QAnswer, QData } from "@/types/Question";
import { diffs, diffMap, topics, topicMap, sets, setMap } from "@/types/Filter";
import QuizFilter from "@/components/QuizFilter";
import QuizHeader from "@/components/QuizHeader";
import QuizQuestion from "@/components/QuizQuestion";
import QuizAnswer from "@/components/QuizAnswer";
import QuizButtons from "@/components/QuizButtons";
import QuizList from "@/components/QuizList";

interface questionListElement {
  id: string;
  title: string;
  difficulty: string;
  saved: boolean;
  completed: boolean;
}

export default function QuizWindow(props: {
  questionNum: string;
  saved: string[];
  completed: string[];
}) {
  const [data, setData] = useState<QData>();
  const [isLoading, setLoading] = useState(() => true);
  const [error, setError] = useState(() => "");

  const [questionPart, setQuestionPart] = useState<number>(0);
  const [questionPartCompleted, setQuestionPartCompleted] =
    useState<boolean>(false);

  const [questionSaved, setQuestionSaved] = useState<boolean>(false);
  const [questionCompleted, setQuestionCompleted] = useState<boolean>(false);

  const [filterQuery, setFilterQuery] = useState<string>("?");
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [questionList, setQuestionList] = useState<questionListElement[]>([]);
  const [showList, setShowList] = useState<boolean>(false);

  const getFilterQuery = (filterData: QFilter) => {
    let f_diffs: string[] = [];
    let f_topics: string[] = [];
    diffs.forEach((diff) => {
      if (filterData[diff] === true) {
        f_diffs.push(diff);
      }
    });
    topics.forEach((topic) => {
      if (filterData[topic] === true) {
        f_topics.push(topic);
      }
    });

    let res = "?";
    if (f_diffs.length > 0) res += `difficulty=${f_diffs.join(",")}&`;
    if (f_topics.length > 0) res += `topics=${f_topics.join(",")}&`;
    if (
      !["all", "custom", "saved", "completed"].includes(
        filterData.set.toString()
      )
    ) {
      res += `sets=${filterData.set}&`;
    }

    return res;
  };

  const {
    register: registerFilter,
    handleSubmit: handleSubmitFilter,
    reset: resetFilter,
  } = useForm<QFilter>({
    defaultValues: {
      set: "all",
    },
  });
  const onSubmitFilter: SubmitHandler<QFilter> = (filterData) => {
    let filterQuery = getFilterQuery(filterData);
    setFilterQuery(filterQuery);
    setShowList(true);
  };

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
    } else {
      setQuestionPartCompleted(true);
    }
  };

  useEffect(() => {
    if (data == undefined) {
      setLoading(true);
      let query = `${process.env.NEXT_PUBLIC_BASE_URL}/api/question/${props.questionNum}`;
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
  }, [props.questionNum]);

  useEffect(() => {
    let query: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/question/filter/${filterQuery}`;
    fetch(query, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        let res: questionListElement[] = [];
        data.response.map(
          (question: { id: string; title: string; difficulty: string }) => {
            let isSaved = props.saved.includes(question.id);
            let isCompleted = props.completed.includes(question.id);
            res.push({
              id: question.id,
              title: question.title,
              difficulty: question.difficulty,
              saved: isSaved,
              completed: isCompleted,
            });
          }
        );
        setQuestionList(res);
      })
      .catch((error) => {
        console.log(error);
        setError(error.toString());
      });
  }, [filterQuery]);

  // TODO: used for debugging, remove later
  // useEffect(() => {
  //   console.log(questionList);
  // }, [questionList]);

  const nextQuestionPart = () => {
    setQuestionPart(questionPart + 1);
    resetAnswer();
    setQuestionPartCompleted(false);
  };

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>Question not found</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full max-w-[1000px] justify-center px-5 py-8 h-max md:gap-5">
        {showList && (
          <QuizList questionList={questionList} setShowList={setShowList} />
        )}
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
                setShowFilter={setShowFilter}
              />
              <QuizButtons setShowFilter={setShowFilter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
