import { defineConfig } from "astro/config";
import shirones from "shirones";

// Site-level settings (site URL, base, title, theme colour, fonts, …) live in
// `shirones/config/` so they stay typed and version-controlled with your
// content. This file only wires the theme in.
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  redirects: {
    "/blog/": "/archive/",
    "/blog/hello-world/": "/posts/hello-world/",
  },
  integrations: [
    {
      name: "blog-styles",
      hooks: {
        "astro:config:setup": ({ injectScript }) => {
          injectScript("page-ssr", 'import "/src/styles/profile.css";');
          injectScript("page-ssr", 'import "/src/styles/navigation.css";');
          injectScript("page-ssr", 'import "/src/styles/calendar.css";');
        },
      },
    },
    shirones({
      // Override individual components by mirroring the theme's structure in
      // `src/components/`, or point at them explicitly:
      // components: { "atoms/blog/PostCard": "./src/components/PostCard.astro" },
    }),
  ],
});
