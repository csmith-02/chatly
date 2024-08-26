"use client"

import { useState } from "react"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { checkConversation, checkUser, createMessage, getConversationByEmails, getConversations, getMessagesById } from "../actions"
import StartConversation from "./StartConversation"
import Messages from "./Messages"

export default function MessageSection(props) {

    const [email, setEmail] = useState("")

    const [message, setMessage] = useState("")

    const [errorMessage, setErrorMessage] = useState("placeholder")

    const { selectedConversation, setConversations, setSelectedConversation, user, messages, setMessages, isDisabled, setIsDisabled } = props

    const [errorVisibility, setErrorVisibility] = useState("invisible")

    const [convoExists, setConvoExists] = useState(false)

    

    const handler = async(e) => {
        e.preventDefault()
        if (selectedConversation._id) {
            setConvoExists(true)
            document.messageForm.requestSubmit()
            setMessage("")
        } else {
            const userExists = await checkUser(email)

            const convoCheck = await checkConversation(email, user.email)

            if (userExists && !convoCheck) {
                setErrorVisibility("invisible")
                setConvoExists(true)
                
                document.messageForm.requestSubmit()
    
                setMessage("")
                setEmail("")
                setConversations(await getConversations(user.email))
                setSelectedConversation(await getConversationByEmails(email, user.email))

            } else if (convoCheck) {
                setErrorVisibility("visible")
                setErrorMessage("You already have an ongoing conversation with this user.")
                setMessage("")
                setEmail("")
            } else {
                setErrorVisibility("visible")
                setErrorMessage("This user does not exist.")
                setConvoExists(false)
                setMessage("")
                setEmail("")
            }
        }
    }

    return <form name="messageForm" action={async(formData) => {
            await createMessage(formData)
            if (selectedConversation._id) {
                setMessages(await getMessagesById((await getConversationByEmails(selectedConversation.members[0], selectedConversation.members[1]))._id))
            } else {
                setMessages(await getMessagesById((await getConversationByEmails(user.email, email))._id))
            }
        }
    } className="h-full col-span-2 grid grid-rows-3">
        { !selectedConversation._id
            ?
            <StartConversation 
                convoExists={convoExists} 
                setIsDisabled={setIsDisabled} 
                setEmail={setEmail} 
                email={email} 
                user={user} 
                errorMessage={errorMessage} 
                errorVisibility={errorVisibility} 
            />
            :
            <Messages messages={messages} 
                setConvoExists={setConvoExists} 
                setMessage={setMessage} 
                setEmail={setEmail}
                user={user}
                setErrorMessage={setErrorMessage}
                setErrorVisibility={setErrorVisibility}
                selectedConversation={selectedConversation}
                setIsDisabled={setIsDisabled}
                setSelectedConversation={setSelectedConversation}
                setMessages={setMessages} 
            />
        }
        <div className="flex justify-center gap-3 items-center">
            <textarea disabled={isDisabled ? true : false} value={message} name="message" placeholder="Message..." 
                className="w-5/6 h-5/6 p-3 resize-none disabled:opacity-100 scroll-auto" 
                onChange={e => {
                    setMessage(e.target.value)
                }
            }></textarea>
            <button type="submit" disabled={isDisabled || message.length == 0 ? true : false} className="bg-blue-200 p-4 h-5/6 rounded-lg disabled:opacity-75" onClick={(e) => {
                handler(e)
            }}><FontAwesomeIcon size={"xl"} icon={faPaperPlane}/> </button>
        </div>
    </form> 
}