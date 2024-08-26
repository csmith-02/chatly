'use client'

import SignoutButton from "./SignoutButton"
import ConversationList from "./ConversationList"
import MessageSection from "./MessageSection"
import { useState, useRef } from "react"

export default function HomeScreen(props) {

    const { user } = props

    const [conversations, setConversations] = useState(props.conversations)

    const [selectedConversation, setSelectedConversation] = useState({})

    const [messages, setMessages] = useState([])

    const [isDisabled, setIsDisabled] = useState(true)

    return <>
        <div className="max-w-[1000px] h-full bg-[#F9ECAC] w-full flex flex-col items-center justify-center text-black grid grid-cols-3">
                <div className="h-full flex flex-col p-2 border-r-2 border-black">
                    <div className="flex items-center justify-between border-b-2 pb-3 border-black mb-4">
                        <h1 className="text-3xl font-bold">Chat.ly</h1>
                        <SignoutButton />
                    </div>
                    <h1 className="font-bold mb-3">Logged in as: {user.email}</h1>
                    <h1 className="text-xl font-bold inline border-b-2 border-black border-dotted">Conversations</h1>
                    <div className="flex flex-col flex-1 py-1 justify-between">
                        <ConversationList user={user} setIsDisabled={setIsDisabled} setMessages={setMessages} messages={messages} conversations={conversations} selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} />
                    </div>
                </div>
                <MessageSection conversations={conversations} isDisabled={isDisabled} setIsDisabled={setIsDisabled} setConversations={setConversations} user={user} messages={messages} setMessages={setMessages} selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} />
            </div>
    </>
}