# Property Preservation CMS

Modern Next.js application deployed to Cloudflare Workers with the OpenNext Cloudflare adapter.

## Getting Started

Install dependencies and run the local Next.js development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build And Deploy

This project uses `@opennextjs/cloudflare`, so production deploys must build the `.open-next` output before publishing the Worker.

Use these commands from the project root:

```bash
npm run build
npm run build:cloudflare
npm run preview
npm run deploy
```

Production builds intentionally use `next build --webpack` because the current Next.js 16/Turbopack build path can panic while processing the global CSS/PostCSS pipeline in this project. Development still uses the default `next dev` workflow.

For Cloudflare Workers Builds, configure the build with:

```text
Root directory: Untitled
Deploy command: npm run deploy
```

If the Cloudflare project is already rooted at this directory, leave the root directory blank.

Do not use `npx wrangler deploy` as the CI deploy command for this manually configured OpenNext project. That command can reach the deploy step before `.open-next` has been compiled and fail with:

```text
ERROR Could not find compiled Open Next config, did you run the build command?
```

`npm run deploy` runs `opennextjs-cloudflare build` first, then deploys the generated Worker and assets.

Cloudflare Workers Builds must also have the same environment variables/secrets needed by `next build`, such as `DATABASE_URL`, auth secrets, and any required API keys.

References:

- [Cloudflare Next.js guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- [OpenNext Cloudflare CLI](https://opennext.js.org/cloudflare/cli)
