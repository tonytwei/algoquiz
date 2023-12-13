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
        <div>
            
        </div>
    )
}