"use client"; // nextjs makes this a client component
import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
    const [showOverlay, setShowOverlay] = useState(() => false)

    const openOverlay = () => {
        console.log("openOverlay")
        setShowOverlay(true)
    }

    const closeOverlay = () => {
        console.log("closeOverlay")
        setShowOverlay(false)
    }

    return (
        <header className="h-max w-screen flex flex-row align-middle justify-evenly p-5 bg-stone-700">
            {/* logo icon, logo text */}
            <a>
                <div className="flex flex-row marker items-center gap-3">
                    <Image 
                        src="/images/header/logo.png"
                        alt="Algoquiz Logo"
                        width={60}
                        height={60}
                    />
                    <h1 className="text-4xl text-stone-300">AlgoQuiz</h1>
                </div>
            </a>

            {/* nav bar */}
            <ul className="flex flex-row items-center gap-2 sm:invisible md:visible">
                <li>
                    <a>HOME</a>
                </li>
                <li>
                    <a>PRACTICE</a>
                </li>
                <li>
                    <a>ACCOUNT</a>
                </li>
            </ul>

            {/* nav menu */}
            <button onClick={openOverlay}>
                <Image
                    src="/images/header/open.png"
                    alt="overlay close"
                    width={60}
                    height={60}
                />
            </button>

            {/* nav overlay */}
        </header>
    )
}