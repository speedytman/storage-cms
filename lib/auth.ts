import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import * as z from "zod"
import bcrypt from "bcryptjs"

import { db } from './db'

const loginUserSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, {
        message: "Password mush have at least 8 characters",
      })
      .max(50, {
        message: "Password mush have at most 50 characters",
      }),
  })

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const { email, password } = loginUserSchema.parse(credentials)

        const user = await db.user.findUnique({
          where: {
            email
          }
        })

        if(!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword!)

        if(!isPasswordValid) return null
        
        return user
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
  
      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })
  
      if (!dbUser) {
        token.id = user!.id
        return token
      }
  
      return {
        id: dbUser.id,
        email: dbUser.email,
        picture: dbUser.image,
        name: dbUser.name,
      }
    },

    redirect() {
      return '/'
    },
  },
}
 
export const auth = () => getServerSession(authOptions)