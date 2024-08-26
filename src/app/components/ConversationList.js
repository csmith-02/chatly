'use client'

import List from "./List"

export default function ConversationList(props) {
    return <>
            <div className="scroll-auto flex-1 mb-2">
                <List {...props} />
            </div>
    </>
}