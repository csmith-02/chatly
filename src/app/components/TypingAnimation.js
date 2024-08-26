"use client"

import { ReactTyped } from "react-typed"

export default function TypingAnimation() {
    return <ReactTyped strings={["easy.", "simple.", "better."]} loop cursorChar="|" typeSpeed={75} className="text-center font-bold underline" backSpeed={25} backDelay={3000}/>
}