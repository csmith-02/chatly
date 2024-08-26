'use client'

import { getMessagesById } from "../actions"

export default function List(props) {

    const { conversations, setMessagesShowing, user, selectedConversation, setSelectedConversation, setMessages, setIsDisabled } = props

    return <ul>
        {conversations.map((conversation, index) => {
            return <li key={index} onClick={async(e) => {
                if (!selectedConversation || selectedConversation != conversation) {
                    setSelectedConversation(conversation)
                    setMessages(await getMessagesById(conversation._id))
                    setIsDisabled(false)
                }
            }} className={selectedConversation._id == conversation._id ? "bg-blue-200 font-bold pl-2 w-4/5 rounded-lg" : ""}>{ conversation.members[0] == user.email ? conversation.members[1] : conversation.members[0] }</li>
        })}
    </ul>
}