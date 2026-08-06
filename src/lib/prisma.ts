import { PrismaClient } from "@prisma/client"
import { PrismaD1 } from "@prisma/adapter-d1"

/**
 * Get a Prisma client instance backed by D1.
 * Called fresh on every request so getRequestContext() works correctly.
 * Falls back to local SQLite for local dev.
 */
function getPrismaClient(): PrismaClient {
  // Try to get D1 binding from the live request context (Cloudflare Workers)
  try {
    const { getRequestContext } = require("@opennextjs/cloudflare");
    const ctx = getRequestContext();
    if (ctx?.env?.DB) {
      const adapter = new PrismaD1(ctx.env.DB);
      return new PrismaClient({ adapter });
    }
  } catch {
    // getRequestContext unavailable outside live request (build time, local dev)
  }

  // Local dev: use the SQLite file
  if (process.env.NODE_ENV !== "production") {
    return new PrismaClient();
  }

  // Production Cloudflare without D1: return mock to avoid crashes
  return getMockClient();
}

// ─── Mock client (Cloudflare fallback or local in-memory) ────────────────────

declare global {
  var mockDbPosts: any[] | undefined;
}

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
 * A proxy that creates a fresh D1-backed PrismaClient on every property access.
 * This ensures getRequestContext() is called during the actual request, not at module init.
 */
const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = (client as any)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  }
});

export default prisma;
