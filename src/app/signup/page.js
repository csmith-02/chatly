import SignupForm from "../components/SignupForm"
import Link from "next/link"

export default function Signup() {
    return <>
        <div className="max-w-[1000px] h-4/5 bg-[#F9ECAC] w-full rounded-lg flex flex-col items-center justify-center gap-4 text-black">
            <Link href="/" className="text-3xl font-bold p-4 self-start"><button>{"<"}-</button></Link>
            <div className="w-4/5 h-full rounded-t-lg flex justify-center">
                <SignupForm />
            </div>
        </div>
    </>
}