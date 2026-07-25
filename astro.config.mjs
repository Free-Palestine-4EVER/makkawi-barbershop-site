// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://Free-Palestine-4EVER.github.io",
  base: "/makkawi-barbershop-site/",
  output: "static",
  trailingSlash: "always",
  build: {
    inlineStylesheets: "auto",
  },
  image: {
    // local sharp service, default — no remote/CDN image services
  },
});
