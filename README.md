# svelte-sitemap

This is a module to generate a sitemap.xml file for your SvelteKit project.

## Requirements

- Bun
- SvelteKit 
- Vite

## Usage

1. Install the module:

```bash
bun add -S github:max-lt/svelte-sitemap
```

2. Add the plugin to your `svelte.config.ts`:

```ts
import { sitemap } from "./vite.sitemap";

export default defineConfig({
  plugins: [
    sveltekit(),
    sitemap({
      website: "https://example.com",
      target: ".svelte-kit/output/client/sitemap.xml",
    }),
  ],
});
```
