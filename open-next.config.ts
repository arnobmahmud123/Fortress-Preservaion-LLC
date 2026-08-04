import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      incrementalCache: async () => {
        const { r2IncrementalCache } = await import(
          "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache"
        );
        return r2IncrementalCache;
      },
      tagCache: "dummy",
      queue: "dummy",
    },
  },

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
