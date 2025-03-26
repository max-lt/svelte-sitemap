/// <reference types="@types/bun" />

type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
};

type SitemapOptions = {
  website: string;
  target: string;
};

export const sitemap = ({ website, target }: SitemapOptions) => ({
  name: "generate-sitemap",
  async closeBundle() {
    const pages = new Bun.Glob("**/+page.svelte");
    const urls: SitemapUrl[] = [];
    for await (const page of pages.scan("src/routes")) {
      const file = Bun.file("src/routes/" + page);

      const lastmod = new Date(file.lastModified).toISOString().split("T")[0];
      const pageName = page.replace(/\/?\+page.svelte$/, "");
      const loc = pageName ? website + "/" + pageName : website;

      urls.push({
        loc,
        lastmod,
        priority: loc === website ? "1.0" : undefined,
      });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `<url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority ? `<priority>${url.priority}</priority>` : ""}
  </url>`,
    )
    .join("")
    .replace(/ +\n/g, "")}
</urlset>`;

    await Bun.write(target, xml);
  },
});
