"use client"

import moment from "moment-timezone"

export default function MessageList(props) {

    const { messages, user } = props

    function formatDate(dateString) {
        const date = moment.tz(dateString, 'America/New_York')
        return date.format("h:mm A M/D/YYYY") 
    }

    return <ul className="h-full w-full p-2">
        { messages.map((m, index) => {
            return <li key={index}>
                <div className={`flex flex-col w-full ${m.sender == user.email ? "items-end" : "items-start"}`}>
                    <div className={`p-2 max-w-[175px] mt-2 rounded-lg ${m.sender == user.email ? "bg-blue-200" : "bg-red-300"}`}>
                        <h2>{m.message}</h2>
                    </div>
                    <h1 className="text-slate-400 text-[12px]">Sent {formatDate((new Date(Date.parse(m.createdAt))).toUTCString())}</h1>
                </div>
            </li>
        })}
    </ul>
}