"use client";
import Image from "next/image";

export default function QuizAnswer(props: {
  setShowFilter: any;
  qSaved: boolean;
  setQSaved: any;
  updateUserSaved: any;
}) {
  return (
    <div className="flex place-content-end gap-2 px-3">
      {props.qSaved ? (
        <button
          type="button"
          onClick={() => {
            props.updateUserSaved(false);
          }}
          className="checkbox-unchecked rounded-md py-1 px-3"
        >
          <Image
            src="/images/quiz/bookmark-true.png"
            alt="Unsave Question"
            width="24"
            height="24"
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            props.updateUserSaved(true);
          }}
          className="checkbox-unchecked rounded-md py-1 px-3"
        >
          <Image
            src="/images/quiz/bookmark-false.png"
            alt="Save Question"
            width="24"
            height="24"
          />
        </button>
      )}
      <button
        type="submit"
        form="filter"
        className="checkbox-unchecked rounded-md py-1 px-3"
      >
        <Image
          src="/images/quiz/question-list.png"
          alt="Open Question List"
          width="24"
          height="24"
        />
      </button>
      <button
        type="button"
        onClick={() => props.setShowFilter(true)}
        className="md:hidden checkbox-unchecked rounded-md py-1 px-3"
      >
        <Image
          src="/images/quiz/settings.png"
          alt="Open Settings"
          width="24"
          height="24"
        />
      </button>
    </div>
  );
}
