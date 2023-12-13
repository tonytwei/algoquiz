"use client";
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    const [showOverlay, setShowOverlay] = useState(false)

    const openOverlay = () => {
        setShowOverlay(true)
    }

    const closeOverlay = () => {
        setShowOverlay(false)
    }

    return (
        <header className="h-max w-screen flex flex-row align-middle justify-between py-5 px-10 bg-neutral-800">
            {/* logo icon, logo text */}
            <Link href="/">
                <div className="flex flex-row marker items-center gap-3">
                    <Image 
                        src="/images/header/logo.png"
                        alt="Algoquiz Logo"
                        width={48}
                        height={48}
                        priority={true}
                    />
                    <h1 className="text-4xl text-stone-300">AlgoQuiz</h1>
                </div>
            </Link>
            <div className="flex flex-row items-center">
                {/* nav bar */}
                <ul className="flex-row items-center gap-5 hidden md:flex">
                    <li>
                        <Link href="/"><h1 className="text-xl text-stone-300 font-medium">HOME</h1></Link>
                    </li>
                    <li>
                        <Link href="/quiz"><h1 className="text-xl text-stone-300 font-medium">PRACTICE</h1></Link>
                    </li>
                    <li>
                        <Link href="/account"><h1 className="text-xl text-teal-300 font-medium outline rounded-sm outline-offset-4 outline-2 outline-teal-300">ACCOUNT</h1></Link>
                    </li>
                </ul>

                {/* nav menu */}
                <button onClick={openOverlay} className="block md:hidden">
                    <Image
                        src="/images/header/open.png"
                        alt="overlay open"
                        width={24}
                        height={24}
                    />
                </button>
            </div>

            {/* nav overlay */}
            <div className={`${showOverlay ? "absolute" : "hidden"} inset-0 bg-black/50 w-screen h-screen py-8 px-10`}>
                <ul className="flex flex-col items-end gap-5">
                    <li>
                        <button onClick={closeOverlay}>
                            <Image 
                                src="/images/header/close.png"
                                alt="overlay close"
                                width={24}
                                height={24}
                            />
                        </button>
                    </li>
                    <li>
                        <Link href="/"><h1 className="text-xl text-stone-300">HOME</h1></Link>
                    </li>
                    <li>
                        <Link href="/quiz"><h1 className="text-xl text-stone-300">PRACTICE</h1></Link>
                    </li>
                    <li>
                        <Link href="/account"><h1 className="text-xl text-teal-300 outline rounded-sm outline-offset-4 outline-2 outline-teal-300">ACCOUNT</h1></Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}