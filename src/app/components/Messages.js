'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import MessageList from "./MessageList"
import { faClose } from "@fortawesome/free-solid-svg-icons"

export default function Messages(props) {

    const { setMessages, setSelectedConversation, user, setMessage, setEmail, selectedConversation, setIsDisabled, setErrorVisibility, setErrorMessage } = props

    return <div className="row-span-2 border-b-2 border-black flex flex-col items-center">
        <div className="grid grid-cols-3 w-full border-b-2 border-black">
            <input type="hidden" name="convoStatus" value={true} />
            <input type="hidden" name="userEmail" value={user.email} />
            <input type="hidden" name="email" value={user.email == selectedConversation.members[0] ? selectedConversation.members[1] : selectedConversation.members[0]} />
            <div className="col-start-2 flex justify-center items-center">
                <h1 className="text-2xl font-bold col-start-2">Messages</h1>
            </div>
            <div className="col-start-3 flex justify-center items-center">
                <button type="button" className="p-3 rounded-circle"><FontAwesomeIcon size={"2xl"} color="red" icon={faClose} onClick={(e) => {
                    setMessages([])
                    setSelectedConversation({})
                    setIsDisabled(true)
                    setMessage("")
                    setEmail("")
                    setErrorMessage("placeholder")
                    setErrorVisibility("invisible")
                }}/></button>
            </div>
        </div>
        <MessageList {...props}  />
    </div>
}