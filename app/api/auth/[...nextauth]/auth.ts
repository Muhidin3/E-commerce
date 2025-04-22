import NextAuth, { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../models/users.model"
import connectDb from '../../config/db'
import bcrypt from "bcrypt"

export const authOptions:NextAuthConfig = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
   
        await connectDb()
        // console.log(credentials)
        const user = await User.findOne({name:credentials.username})

        if (user) {
          const passwordMatch = await bcrypt.compare(credentials.password, user.password)
          if(passwordMatch){
            // If no error and we have user data, return it
            return user
          }
          else{
            return false
          }
        }
        return user
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  // Optional: Add custom pages
  pages: {
    signIn: '/auth/signin',
  },
  // Optional: Add callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      return session
    }
  }
}

export const {handlers,auth,signIn,signOut,unstable_update} =  NextAuth(authOptions)