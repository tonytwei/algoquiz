"use client";
import AccountMenu from "@/components/AccountMenu";
import { useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { QListElem } from "@/types/Question";
import QuizList from "@/components/QuizList";

function AccountWindowSession(props: {
  savedList: string[];
  completedList: string[];
}) {
  const { data: session } = useSession();
  const [showSaved, setShowSaved] = useState<boolean>(false);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [qList, setQList] = useState<QListElem[]>();

  const [userSaved, setUserSaved] = useState<string[]>(props.savedList);
  const [userCompleted, setUserCompleted] = useState<string[]>(
    props.completedList
  );

  useEffect(() => {
    let uniqueIds: string[] = [];
    if (!showSaved && !showCompleted) {
      uniqueIds = [];
    } else if (showSaved && !showCompleted) {
      uniqueIds = userSaved;
    } else if (!showSaved && showCompleted) {
      uniqueIds = userCompleted;
    } else {
      uniqueIds = Array.from(new Set([...userSaved, ...userCompleted]));
    }

    const qListQuery = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/question?${uniqueIds.map((id) => `id=${id}`).join("&")}${
      uniqueIds.length == 0 ? "&all=true" : "&all=false"
    }`;

    fetch(qListQuery, {
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
            let isSaved = userSaved.includes(question.id);
            let isCompleted = userCompleted.includes(question.id);
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
      });
  }, [showSaved, showCompleted, session, userSaved, userCompleted]);

  const updateUserSaved = (completed: boolean, qNum: string) => {
    if (session) {
      let query: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user?.email}`;
      if (completed) {
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
          if (completed) {
            setUserSaved([...userSaved, qNum]);
          } else {
            setUserSaved(userSaved.filter((id) => id != qNum));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (completed) {
      setUserSaved([...userSaved, qNum]);
    } else {
      setUserSaved(userSaved.filter((id) => id != qNum));
    }
  };
  const updateUserCompleted = (completed: boolean, qNum: string) => {
    if (completed) {
      setUserCompleted([...userCompleted, qNum]);
    } else {
      setUserCompleted(userCompleted.filter((id) => id != qNum));
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
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <div className="w-full max-w-[1000px] pt-8">
      <AccountMenu
        inSession={session ? true : false}
        showSaved={showSaved}
        setShowSaved={setShowSaved}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
      />
      {qList && (
        <QuizList
          qList={qList}
          useOverlay={false}
          setShowList={undefined}
          updateUserSaved={updateUserSaved}
          updateUserCompleted={updateUserCompleted}
        />
      )}
    </div>
  );
}

export default function AccountWindow(props: {
  savedList: string[];
  completedList: string[];
}) {
  return (
    <SessionProvider>
      <AccountWindowSession
        savedList={props.savedList}
        completedList={props.completedList}
      />
    </SessionProvider>
  );
}
