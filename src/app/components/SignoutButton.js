'use client'

import { signOut } from "next-auth/react"

export default function SignoutButton() {
    return <button className="text-red-500 p-2 border-2 rounded-lg border-black" onClick={signOut}>Logout</button>
}