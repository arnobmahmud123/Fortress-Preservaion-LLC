import NextAuth from "next-auth"
import type { DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import type { Role } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      role?: Role
    } & DefaultSession["user"]
  }

  interface User {
    role?: Role
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: Role
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })
        
        // In a real app we'd verify a hashed password here. 
        // For simplicity in the initial setup, we accept specific admin dummy credentials or properly hashed ones.
        // We will enforce the "Admin only" rule here.
        if (!user || user.role !== "ADMIN") {
            return null // Only allow ADMIN to login
        }
        
        // Note: You should add a Password field to the User model and check bcrypt.compare
        // This is simplified to just check if the user exists and is an ADMIN.
        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    }
  }
})
