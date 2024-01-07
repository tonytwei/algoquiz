"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { QFilter, QAnswer, QData, QListElem } from "@/types/Question";
import { diffs, diffMap, topics, topicMap, sets, setMap } from "@/types/Filter";
import QuizFilter from "@/components/QuizFilter";
import QuizHeader from "@/components/QuizHeader";
import QuizQuestion from "@/components/QuizQuestion";
import QuizAnswer from "@/components/QuizAnswer";
import QuizButtons from "@/components/QuizButtons";
import QuizList from "@/components/QuizList";

import { SessionProvider, useSession } from "next-auth/react";

function QuizWindowSession(props: {
  savedList: string[];
  completedList: string[];
  qSaved: boolean;
  qData: QData;
}) {
  const { data: session } = useSession();

  const [qData, setQData] = useState<QData>(props.qData);
  const [error, setError] = useState(() => "");

  const [qPart, setQPart] = useState<number>(0);
  const [qPartCompleted, setQPartCompleted] = useState<boolean>(false);

  const [qSaved, setQSaved] = useState<boolean>(props.qSaved);
  const [qCompleted, setQCompleted] = useState<boolean>(false);

  const [savedList, setSavedList] = useState<string[]>(props.savedList);
  const [completedList, setCompletedList] = useState<string[]>(
    props.completedList
  );

  const [filterQuery, setFilterQuery] = useState<string>("?");
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [qList, setQList] = useState<QListElem[]>([]);
  const [showList, setShowList] = useState<boolean>(false);

  // filter form
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

  // answer form
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
    if (answerData.answer != qData!.questions[qPart].answer) {
      console.log("wrong answer" + answerData.answer); // TODO: remove
      return;
    }
    console.log("correct answer" + answerData.answer); // TODO: remove
    if (qPart + 1 == qData!.questions.length) {
      setQCompleted(true);
      // TODO: continue from here, update user completed
      updateUserCompleted(true, qData.id.toString());
    } else {
      setQPartCompleted(true);
    }
  };

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
        let res: QListElem[] = [];
        data.response.map(
          (question: { id: string; title: string; difficulty: string }) => {
            let isSaved = savedList.includes(question.id);
            let isCompleted = completedList.includes(question.id);
            res.push({
              id: question.id,
              title: question.title,
              difficulty: question.difficulty,
              saved: isSaved,
              completed: isCompleted,
            });
          }
        );
        setQList(res);
      })
      .catch((error) => {
        console.log(error);
        setError(error.toString());
      });
  }, [filterQuery, savedList, completedList]);

  const updateUserSaved = (
    saved: boolean,
    qNum: string = qData.id.toString()
  ) => {
    if (qNum === qData.id.toString()) {
      setQSaved(saved);
    }
    if (saved) {
      setSavedList([...savedList, qNum]);
    } else {
      setSavedList(savedList.filter((id) => id != qNum));
    }

    if (session) {
      let query: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user?.email}`;
      if (saved) {
        query += `?savedAdd=${qNum}`;
      } else {
        query += `?savedRemove=${qNum}`;
      }
      fetch(query, {
        method: "PUT",
        headers: {
          accept: "application/json",
        },
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
          setError(error.toString());
        });
    }
  };

  const updateUserCompleted = (
    completed: boolean,
    qNum: string = qData.id.toString(),
    updateState: boolean = true
  ) => {
    if (updateState && qNum === qData.id.toString()) {
      setQCompleted(completed);
    }
    if (completed) {
      setCompletedList([...completedList, qNum]);
    } else {
      setCompletedList(completedList.filter((id) => id != qNum));
    }

    if (session) {
      let query: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user?.email}`;
      if (completed) {
        query += `?completedAdd=${qNum}`;
      } else {
        query += `?completedRemove=${qNum}`;
      }
      fetch(query, {
        method: "PUT",
        headers: {
          accept: "application/json",
        },
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
          setError(error.toString());
        });
    }
  };

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

  const nextQuestionPart = () => {
    setQPart(qPart + 1);
    resetAnswer();
    setQPartCompleted(false);
  };

  if (!qData) return <p>Question not found</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full max-w-[1000px] justify-center px-5 py-8 h-max md:gap-5">
        {showList && (
          <QuizList
            qList={qList}
            useOverlay={true}
            setShowList={setShowList}
            updateUserSaved={updateUserSaved}
            updateUserCompleted={updateUserCompleted}
          />
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
          <QuizHeader qData={qData} />
          <div className="flex flex-row w-full gap-3">
            <QuizQuestion qData={qData} />

            {/* answer */}
            <div className="flex flex-col w-1/2 place-content-between">
              <QuizAnswer
                qData={qData}
                qPart={qPart}
                onSubmitAnswer={onSubmitAnswer}
                handleSubmitAnswer={handleSubmitAnswer}
                registerAnswer={registerAnswer}
                qCompleted={qCompleted}
                nextQuestionPart={nextQuestionPart}
                qPartCompleted={qPartCompleted}
                setShowFilter={setShowFilter}
              />
              <QuizButtons
                setShowFilter={setShowFilter}
                qSaved={qSaved}
                setQSaved={setQSaved}
                updateUserSaved={updateUserSaved}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuizWindow(props: {
  savedList: string[];
  completedList: string[];
  qSaved: boolean;
  qData: QData;
}) {
  return (
    <div>
      <SessionProvider>
        <QuizWindowSession
          savedList={props.savedList}
          completedList={props.completedList}
          qSaved={props.qSaved}
          qData={props.qData}
        />
      </SessionProvider>
    </div>
  );
}
