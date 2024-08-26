import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToMongoDB } from "@/app/db"
import User from "@/app/models/user"

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email: ",
                    type: "text",
                    placeholder: "e.g. example@example.com"
                },
                password: {
                    label: "Password: ",
                    type: "password",
                    placeholder: "my-complex-password" 
                }
            },
            async authorize(credentials) {

                await connectToMongoDB()

                const user = await User.findOne({ email: credentials.email, password: credentials.password })

                if (user != null) {
                    return user
                } else {
                    null
                }
            }
        })
    ],
})

export { handler as GET, handler as POST }