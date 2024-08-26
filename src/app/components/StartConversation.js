'use client'

export default function StartConversation(props) {

    const { setIsDisabled, setEmail, email, errorVisibility, user, convoExists, errorMessage } = props

    return <>
        <div className="row-span-2 border-b-2 border-black flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-2">Start a Conversation!</h1>
            <input type="email" name="email" placeholder="example@example.com" value={email} className="p-3 w-2/3 border-black border-2 rounded-full" onChange={e => {
                if (e.target.value != "") {
                    setIsDisabled(false)
                } else {
                    setIsDisabled(true)
                }
                setEmail(e.target.value)
            }}/>
            <input type="hidden" value={user.email} name="userEmail" />
            <input type="hidden" value={convoExists} name="convoStatus" />
            <h1 className={`font-bold text-red-500 text-center text-xl mt-2 ${errorVisibility}`}>{errorMessage}</h1>
        </div>
    </>
}