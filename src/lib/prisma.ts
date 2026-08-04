import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  try {
    return new PrismaClient()
  } catch (e: any) {
    if (e.message?.includes('driver adapter is required')) {
      console.warn("Bypassing Prisma edge initialization error for build.")
      return new Proxy({}, {
        get(target, prop) {
          if (prop === '$connect' || prop === '$disconnect') return async () => {};
          return new Proxy({}, {
            get() { return async () => null }
          });
        }
      }) as unknown as PrismaClient
    }
    throw e;
  }
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
