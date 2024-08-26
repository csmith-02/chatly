"use server"

import User from "./models/user"
import Conversation from "./models/conversation"
import { connectToMongoDB } from "./db"
import { redirect } from "next/navigation"
import Message from "./models/message"

export async function createUser(formData) {

    await connectToMongoDB()

    const existingEmail = await User.findOne({ email: formData.get("email")}).exec()
    
    if (existingEmail) {
        return
    } else {
        (await User.create({
            fullname: formData.get('fullname'),
            email: formData.get('email'),
            password: formData.get('passwd')
        })).save()

        redirect('/api/auth/signin')
    }
}

export async function createConversation(email, currentUser, messageId) {

    await connectToMongoDB()

    const conversation = (await Conversation.create({
        messageIds: [messageId],
        members: [email, currentUser]
    })).save()

    return conversation
}

export async function getConversationByEmails(email, userEmail) {
    await connectToMongoDB()

    const conversation = await Conversation.findOne({ members: { "$all": [userEmail, email] }}).exec()

    return toConversationPOJO(conversation)
}

export async function getConversations(userEmail) {

    await connectToMongoDB()

    const conversations = await Conversation.find({ members: { "$in": [userEmail]}}).exec()

    let obj = conversations.map((conversation) => toConversationPOJO(conversation))
    if (obj.length != 0) {
        return obj
    }

    return []
}

/**
 * Helper function for getConversations conversion... _id field has to stringified and parsed
 */
function toConversationPOJO(conversation) {
    return {
        _id: JSON.parse(JSON.stringify(conversation._id)),
        messageIds: conversation.messageIds,
        members: conversation.members,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt
    }
}

/**
 * Helper function for Message conversion... _id field has to stringified and parsed
 */
function toMessagePOJO(message) {
    return {
        _id: JSON.parse(JSON.stringify(message._id)),
        message: message.message,
        sender: message.sender,
        receiver: message.receiver,
        convoId: message.convoId,
        createdAt: message.createdAt.toString()
    }
}

export async function createMessage(formData) {
    const convoExists = formData.get('convoStatus')

    if (convoExists == 'false') {
        await createMessageNoConvo(formData)
    } else {
        await createMessageExistingConvo(formData)
    }
}

export async function checkUser(email) {
    await connectToMongoDB()

    const existingEmail = await User.findOne({email: email}).exec()

    if (existingEmail) {
        return true
    } else {
        return false
    }
}

export async function checkConversation(email, user) {
    await connectToMongoDB()

    console.log(email, user)

    const existingConvo = await Conversation.findOne({ members: { "$all" : [email, user]}})

    console.log(existingConvo)

    if (existingConvo) {
        return true
    }
    return false
}

export async function getMessagesById(id) {

    await connectToMongoDB()

    const messages = await Message.find({ convoId: id }).sort({ createdAt: 1 }).exec()
    
    const list = messages.map((message) => toMessagePOJO(message))
    
    if (list.length != 0) {
        return list
    }

    return []
}

export async function createMessageExistingConvo(formData) {
    
    await connectToMongoDB()

    const userEmail = formData.get("userEmail")
    const email = formData.get("email")
    const formMessage = formData.get("message")

    const convoId = (await Conversation.findOne({ members: { "$all": [userEmail, email]}}))._id

    console.log(convoId)


    const message = await (await Message.create({
        message: formMessage,
        sender: userEmail,
        receiver: email,
        convoId: convoId
    })).save()
}

export async function createMessageNoConvo(formData) {
    await connectToMongoDB()

    const userEmail = formData.get("userEmail")
    const email = formData.get("email")
    const formMessage = formData.get("message")

    if (formMessage.length == 0) {
        return
    }

    // if the conversation doesn't exist
    const message = await (await Message.create({
        message: formMessage,
        sender: userEmail,
        receiver: email,
        convoId: "placeholder"
    })).save()

    const conversation = await createConversation(email, userEmail, toMessagePOJO(message)._id)

    await Message.findOneAndUpdate(message._id, { convoId: conversation._id })
    
}