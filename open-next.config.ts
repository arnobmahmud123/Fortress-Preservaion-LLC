import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
    // Mark native Node.js packages that can't run in Cloudflare Workers as external.
    // The Prisma proxy fallback in src/lib/prisma.ts handles this gracefully at runtime.
    esbuildOptions: {
      external: [
        "pg",
        "pg-native",
        "pg-cloudflare",
        "@prisma/adapter-pg",
        "bcrypt",
      ],
    },
  },
  edgeExternals: ["node:crypto"],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
    },
  },
};

export default config;
