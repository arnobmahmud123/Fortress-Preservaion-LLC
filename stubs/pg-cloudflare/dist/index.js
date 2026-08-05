'use strict';
/**
 * Stub implementation of pg-cloudflare.
 *
 * The real pg-cloudflare uses Cloudflare Workers' cloudflare:sockets API,
 * which requires the full Workers runtime and cannot be bundled by esbuild
 * in the standard Cloudflare Pages build environment.
 *
 * This stub satisfies esbuild's module resolution. It is never actually called
 * at runtime because:
 *  1. On Cloudflare Pages, DATABASE_URL is undefined so the Prisma proxy
 *     fallback intercepts all queries before any pg connection is made.
 *  2. Even if pg is imported, new Pool() only stores config — no socket
 *     is opened until pool.connect() or pool.query() is called.
 */
class CloudflareSocket {
  constructor() {
    throw new Error(
      'pg-cloudflare stub: CloudflareSocket is not available in this build context. ' +
      'Database connections should go through the Prisma adapter, not directly via pg-cloudflare.'
    );
  }
}

module.exports = { CloudflareSocket };
