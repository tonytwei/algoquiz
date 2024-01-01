"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header(params: { showBackground: boolean }) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <header
      className={`h-max w-full flex flex-col items-center ${
        params.showBackground ? "bg-neutral-800" : ""
      }`}
    >
      <div className="flex flex-row align-middle justify-between h-full w-full py-5 px-5 max-w-[1000px]">
        {/* logo icon, logo text */}
        <Link href="/">
          <div className="flex flex-row marker items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Algoquiz Logo"
              width="48"
              height="48"
              priority={true}
            />
            <h1 className="text-4xl text-teal-300">AlgoQuiz</h1>
          </div>
        </Link>
        <div className="flex flex-row items-center">
          {/* nav bar */}
          <ul className="flex-row items-center gap-5 hidden md:flex">
            {/* <li>
              <Link href="/">
                <h1 className="text-xl text-stone-300 font-medium">HOME</h1>
              </Link>
            </li> */}
            <li>
              <Link href="/quiz">
                <h1 className="text-xl text-stone-300 font-medium">PRACTICE</h1>
              </Link>
            </li>
            <li>
              <Link href="/account">
                <h1 className="text-xl text-teal-300 mr-2 font-medium outline rounded-sm outline-offset-4 outline-2 outline-teal-300">
                  ACCOUNT
                </h1>
              </Link>
            </li>
          </ul>

          {/* nav menu */}
          <button
            onClick={() => setShowOverlay(true)}
            className="block md:hidden"
          >
            <Image
              src="/images/header/open.png"
              alt="overlay open"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* nav overlay */}
        <div
          className={`${
            showOverlay ? "absolute" : "hidden"
          } inset-0 bg-black/50 w-full h-full py-8 px-10`}
        >
          <ul className="flex flex-col items-end gap-5">
            <li>
              <button onClick={() => setShowOverlay(false)}>
                <Image
                  src="/images/header/close.png"
                  alt="overlay close"
                  width={24}
                  height={24}
                />
              </button>
            </li>
            <li>
              <Link href="/">
                <h1 className="text-xl text-stone-300 font-medium">HOME</h1>
              </Link>
            </li>
            <li>
              <Link href="/quiz">
                <h1 className="text-xl text-stone-300 font-medium">PRACTICE</h1>
              </Link>
            </li>
            <li>
              <Link href="/account">
                <h1 className="text-xl text-teal-300 font-medium outline rounded-sm outline-offset-4 outline-2 outline-teal-300">
                  ACCOUNT
                </h1>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
