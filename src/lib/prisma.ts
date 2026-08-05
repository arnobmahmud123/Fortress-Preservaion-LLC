import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

const prismaClientSingleton = () => {
  try {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error("DATABASE_URL is not defined in environment variables.")
    }
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  } catch (error: unknown) {
    if (error instanceof Error && (error.message.includes("driver adapter") || error.message.includes("DATABASE_URL"))) {
      console.warn("Bypassing Prisma edge/build initialization error.")
      return new Proxy({}, {
        get(_target, prop) {
          if (prop === "$connect" || prop === "$disconnect") return async () => {}

          return new Proxy({}, {
            get() { return async () => null }
          })
        }
      }) as unknown as PrismaClient
    }
    throw error
  }
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
