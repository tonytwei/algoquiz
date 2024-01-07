"use client";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function NavMenu(params: {
  // session: any;
  // saved: any;
  // completed: any;
}) {
  const [showSaved, setShowSaved] = useState<boolean>(false);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  return (
    <div className="flex flex-row">
      <label
        htmlFor="saved"
        className={`flex flex-row gap-2 py-3 px-6 rounded-md border-4 border-solid ${
          showSaved
            ? "bg-accent-yellow border-accent-dark-yellow"
            : "bg-white border-gray-400"
        }`}
      >
        <Image
          src="/images/quiz/bookmark-true.png"
          alt="show saved questions"
          width="24"
          height="24"
        />
        <h1>Saved</h1>
      </label>
      <input
        type="checkbox"
        id="saved"
        className="hidden"
        onChange={(e) => {
          console.log(e.target.checked);
          setShowSaved(e.target.checked);
        }}
      />
      <label
        htmlFor="completed"
        className={`flex flex-row gap-2 py-3 px-6 rounded-md border-4 border-solid ${
          showCompleted
            ? "bg-accent-lime border-accent-dark-lime"
            : "bg-white border-gray-400"
        }`}
      >
        // TODO: update image
        <Image
          src="/images/quiz/bookmark-true.png"
          alt="show completed questions"
          width="24"
          height="24"
        />
        <h1>Completed</h1>
      </label>
      <input
        type="checkbox"
        id="completed"
        className="hidden"
        onChange={(e) => {
          console.log(e.target.checked);
          setShowCompleted(e.target.checked);
        }}
      />
      {/* <label id="completed-box">
        <input type="checkbox" />
        <div>
          <img src="/images/quiz-ui/completed.png" alt="quiz question menu" />
          Completed
        </div>
      </label> */}

      {/* <label htmlFor="saved" className="flex flex-row gap-3 items-center">
        <input  
          type="checkbox"
          id="saved"
          className="checkbox-square checkbox-unchecked checkbox-checked-green"
        />
        <label htmlFor="saved">Saved</label>
      </label> */}

      {/* <div>
        <h1>{params.session?.user?.name}</h1>
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div> */}
    </div>
  );
}
