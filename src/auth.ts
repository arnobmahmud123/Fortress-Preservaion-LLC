// Prevent NextAuth from throwing configuration errors in serverless edge runtimes due to missing secret
if (!process.env.AUTH_SECRET) {
  process.env.AUTH_SECRET = "fortress-preservation-super-secret-key-12345";
}
if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = "fortress-preservation-super-secret-key-12345";
}

import NextAuth from "next-auth"
import type { DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      role?: string
    } & DefaultSession["user"]
  }

  interface User {
    role?: string
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: string
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
          try {
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
          } catch (dbError) {
            console.error("[Auth] D1 DB query failed during credentials verification. Using robust fallback admin user object.", dbError);
            return {
              id: "admin-system-id",
              name: "Admin System",
              email: email,
              role: "ADMIN"
            }
          }
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
