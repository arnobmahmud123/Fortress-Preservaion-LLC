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
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET || "fortress-preservation-super-secret-key-12345",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const email = credentials.email as string
        const password = credentials.password as string

        // Support demo admin credentials auto-login & dynamic database seeding
        if (email === "admin@fortresspreservation.com" && password === "admin123") {
          let user = await prisma.user.findUnique({
            where: { email }
          })
          
          if (!user) {
            try {
              user = await prisma.user.create({
                data: {
                  id: "admin-system-id",
                  name: "Admin System",
                  email: email,
                  role: "ADMIN"
                }
              })
              console.log("[Auth] Dynamically seeded admin user in database.");
            } catch (err) {
              console.error("[Auth] Failed to seed admin user:", err);
            }
          }
          
          return user
        }

        const user = await prisma.user.findUnique({
          where: { email }
        })
        
        if (!user || user.role !== "ADMIN") {
            return null // Only allow ADMIN to login
        }
        
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
        if (token.sub) {
          session.user.id = token.sub
        }
        session.user.role = token.role
      }
      return session
    }
  }
})
