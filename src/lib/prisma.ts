import { PrismaClient } from "@prisma/client"
import { PrismaD1 } from "@prisma/adapter-d1"

declare global {
  var prismaGlobal: PrismaClient | undefined
  var mockDbPosts: any[] | undefined
}

function getActiveClient(): PrismaClient {
  // If we already successfully created and cached the real D1 client, use it.
  if (globalThis.prismaGlobal) {
    return globalThis.prismaGlobal;
  }

  // Try to get D1 binding from the live Cloudflare context
  try {
    const { getCloudflareContext } = require("@opennextjs/cloudflare");
    const ctx = getCloudflareContext();
    if (ctx?.env?.DB) {
      console.log("[Prisma] Found D1 DB binding in Cloudflare Context. Creating PrismaClient with PrismaD1.");
      const adapter = new PrismaD1(ctx.env.DB);
      const client = new PrismaClient({ adapter });
      
      // Cache it globally so we don't recreate it on subsequent requests
      globalThis.prismaGlobal = client;
      return client;
    }
  } catch (error) {
    // Context not ready/available yet (e.g. during build or cold start init)
  }

  // Local development fallback (non-edge)
  const isCloudflare = typeof globalThis.caches !== "undefined" || process.env.NEXT_RUNTIME === "edge";
  if (!isCloudflare) {
    console.log("[Prisma] Local development detected. Creating standard PrismaClient.");
    const client = new PrismaClient();
    globalThis.prismaGlobal = client;
    return client;
  }

  // Deployed on edge, but D1 not bound/configured yet (e.g. during build/static generation)
  return getMockClient();
}

// ─── Mock client (Cloudflare fallback or local in-memory) ────────────────────

function getMockClient(): PrismaClient {
  if (!globalThis.mockDbPosts) globalThis.mockDbPosts = [];

  const mockModelHandler = (modelName: string) => {
    return new Proxy({}, {
      get(_target, method) {
        return async (args: any) => {
          console.log(`[Prisma Mock] ${modelName}.${String(method)} called`, args);

          if (method === "findMany") {
            if (modelName === "post") {
              const statusFilter = args?.where?.status;
              const posts = globalThis.mockDbPosts || [];
              return statusFilter ? posts.filter((p: any) => p.status === statusFilter) : posts;
            }
            return [];
          }

          if (method === "findUnique" || method === "findFirst") {
            if (modelName === "user") {
              return { id: "admin-system-id", name: "Admin System", email: "admin@fortresspreservation.com", role: "ADMIN" };
            }
            if (modelName === "post") {
              const slug = args?.where?.slug;
              const id = args?.where?.id;
              const posts = globalThis.mockDbPosts || [];
              return posts.find((p: any) => (slug && p.slug === slug) || (id && p.id === id)) || null;
            }
            return null;
          }

          if (method === "create" || method === "upsert" || method === "update") {
            const data = args?.data || args?.create || args?.update || {};
            const id = args?.where?.id || data.id || "mock-id-" + Date.now();
            const posts = globalThis.mockDbPosts || [];
            const existingIdx = posts.findIndex((p: any) => p.id === id);
            const postObj = {
              id, createdAt: new Date(), updatedAt: new Date(),
              slug: data.slug || (data.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now()),
              title: data.title || "Mock Title",
              content: data.content || "",
              excerpt: data.excerpt || "",
              status: data.status || "PUBLISHED",
              featuredImage: data.featuredImage || "",
              author: { id: "admin-system-id", name: "Admin System" },
              ...data,
            };
            if (existingIdx > -1) posts[existingIdx] = { ...posts[existingIdx], ...postObj };
            else posts.unshift(postObj);
            globalThis.mockDbPosts = posts;
            return postObj;
          }

          if (method === "delete") {
            const id = args?.where?.id;
            if (modelName === "post" && id) {
              const posts = globalThis.mockDbPosts || [];
              const deleted = posts.find((p: any) => p.id === id);
              globalThis.mockDbPosts = posts.filter((p: any) => p.id !== id);
              return deleted || { id };
            }
            return { id: id || "mock-id" };
          }

          if (method === "count") return 0;
          return null;
        };
      }
    });
  };

  return new Proxy({}, {
    get(_target, prop) {
      if (prop === "$connect" || prop === "$disconnect") return async () => {};
      return mockModelHandler(String(prop));
    }
  }) as unknown as PrismaClient;
}

// ─── Exported proxy ───────────────────────────────────────────────────────────

/**
 * A proxy that forwards all property accesses to the active client.
 * This guarantees we resolve the client dynamically inside request context.
 */
const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getActiveClient();
    const value = (client as any)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  }
});

export default prisma;
