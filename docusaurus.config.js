module.exports = {
  title: "Samundra Khatri",
  tagline: `Passionate Pragmatic Developer who loves JavaScript`,
  url: "https://samundrakc.com.np",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "samundrak", // Usually your GitHub org/user name.
  projectName: "website", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Samundra Khatri",
      logo: {
        alt: "FullStack Javascript Engineer, Nepal",
        src: "img/avataaars.svg",
      },
      links: [
        { to: "blog", label: "Blog", position: "left" },
        { to: "docs/experience", label: "Experience", position: "left" },
        { to: "docs/projects", label: "Works", position: "left" },

        {
          href: "https://github.com/samundrak",
          label: "GitHub",
          position: "right",
        },

        {
          to: "docs/",
          activeBasePath: "docs",
          label: "More",
          position: "left",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/samundrak",
            },
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/users/2488428/samundra-khatri",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/kardnumas",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/samundrak",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Samundra Khatri. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: "experience",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: "all",
            copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
          },
          // Please change this to your repo.
          // editUrl:
          // "https://github.com/facebook/docusaurus/edit/master/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
