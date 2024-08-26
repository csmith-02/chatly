import { getServerSession } from "next-auth";
import { getConversations } from "../actions";
import HomeScreen from "../components/HomeScreen";

export default async function Home() {

    const session = await getServerSession()

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    await sleep(1500)

    const conversations = await getConversations(session.user.email)

    return <>
        <HomeScreen user={session.user} conversations={conversations} />
    </>
}