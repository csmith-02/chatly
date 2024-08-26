"use client"

import { useState } from "react"
import { createUser } from "../actions"
import { CircularProgress } from "@mui/joy"

export default function SignupForm() {

    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

    const [message, setMessage] = useState("placeholder")

    const [error, setError] = useState("invisible")
    const [submitted, setSubmitted] = useState(false)

    return <form action={createUser} name="signupForm" id="signupForm" className="h-full flex flex-col w-1/2 gap-3 p-4 text-2xl justify-center items-center">
        <h1 className="font-bold text-4xl text-center p-3">Welcome aboard!</h1>
        <input placeholder="Full Name" name="fullname" className="p-2" onChange={e => setName(e.target.value)}/>
        <input placeholder="Email" type="email" name="email" className="p-2" onChange={e => setEmail(e.target.value)}/>
        <input placeholder="Password" type="password" name="passwd" className="p-2" onChange={(e) => {
            setPassword(e.target.value)
        }}/>
        <input placeholder="Confirm Password" type="password" name="confpasswd" className="p-2" onChange={(e) => {
            setConfPassword(e.target.value)
        }}/>
        <h1 className={`text-red-500 font-bold text-xl ${error}`}>{message}</h1>
        <button type="submit" className="p-3 px-6 min-w-[200px] min-h-[75px] bg-blue-200 font-bold rounded-lg text-center" onClick={async (e) => {
            e.preventDefault()

            const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

            setSubmitted(true)
            await sleep(2000)

            if (confPassword !== password) {
                setError("visible")
                setMessage("Passwords must match.")
                setSubmitted(false)
            } else if (name.length == 0) {
                setError("visible")
                setMessage("Please enter a valid name.")
                setSubmitted(false)
            } else if (email.length == 0) {
                setError("visible")
                setMessage("Please enter a valid email address.")
                setSubmitted(false)
            } else if (password.length == 0 || confPassword.length == 0) {
                setError("visible")
                setMessage("Please enter a valid password.")
                setSubmitted(false)
            } else {
                document.signupForm.requestSubmit()
            }
        }}>{ submitted ? <CircularProgress size={"md"} color="neutral" variant={"plain"} /> : "Submit"}</button>
    </form>
}