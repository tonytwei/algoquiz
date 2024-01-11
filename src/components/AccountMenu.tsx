"use client";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

export default function NavMenu(props: {
  inSession: boolean;
  showSaved: boolean;
  setShowSaved: any;
  showCompleted: boolean;
  setShowCompleted: any;
}) {
  return (
    <div className="flex flex-row justify-center text-black gap-5 w-full max-w-[1000px]">
      <label
        htmlFor="saved"
        className={`flex flex-row items-center justify-center h-14 w-14 sm:w-[150px] gap-2 rounded-md border-4 border-solid cursor-pointer ${
          props.showSaved
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
        <h1 className="hidden sm:block">Saved</h1>
        <input
          type="checkbox"
          id="saved"
          className="hidden"
          onChange={(e) => props.setShowSaved(e.target.checked)}
        />
      </label>
      <label
        htmlFor="completed"
        className={`flex flex-row items-center justify-center h-14 w-14 sm:w-[150px] gap-2 rounded-md border-4 border-solid cursor-pointer ${
          props.showCompleted
            ? "bg-accent-lime border-accent-dark-lime"
            : "bg-white border-gray-400"
        }`}
      >
        <Image
          src="/images/quiz/completed.png"
          alt="show completed questions"
          width="24"
          height="24"
        />
        <h1 className="hidden sm:block">Completed</h1>
        <input
          type="checkbox"
          id="completed"
          className="hidden"
          onChange={(e) => props.setShowCompleted(e.target.checked)}
        />
      </label>
      {props.inSession ? (
        <label
          className="flex flex-row items-center justify-center h-14 w-14 sm:w-[150px] gap-2 rounded-md border-4 border-solid bg-white border-gray-400 cursor-pointer"
          onClick={() => signOut()}
        >
          <Image
            src="/images/quiz/logout.png"
            alt="account logout"
            width="24"
            height="24"
          />
          <h1 className="hidden sm:block">Sign Out</h1>
        </label>
      ) : (
        <label
          className="flex flex-row items-center justify-center h-14 w-14 sm:w-[150px] gap-2 rounded-md border-4 border-solid bg-white border-gray-400 cursor-pointer"
          onClick={() => signIn("google")}
        >
          <Image
            src="/images/quiz/login.png"
            alt="account login"
            width="24"
            height="24"
          />
          <h1 className="hidden sm:block">Sign In</h1>
        </label>
      )}
    </div>
  );
}
