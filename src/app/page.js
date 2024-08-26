import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import TypingAnimation from "./components/TypingAnimation";

export default async function Landing() {

  const session = await getServerSession()
  if (session) {
    redirect('/home')
  }

  return (
    <>
      <div className="max-w-[1000px] h-full w-full rounded-lg flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl mobile font-bold">Chat.ly</h1>
        <div className="flex mobile flex-col mt-4 text-3xl">
          <h1>Realtime chatting made <TypingAnimation /></h1>
        </div>
        <div className="flex mt-4 gap-4 items-center justify-center">
          <Link href="/api/auth/signin"><button className="p-4 mt-4 w-[150px] text-2xl bg-[#F9ECAC] rounded-lg">Login</button></Link>
          <Link href="/signup"><button className="p-4 mt-4 w-[150px] text-2xl bg-[#F9ECAC] rounded-lg">Sign up</button></Link>
        </div>
      </div>
    </>
  );
}