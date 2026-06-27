module.exports = {
  title: 'Discuz SDK',
  tagline: '',
  url: '/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Discuz SDK',
      logo: {
        alt: 'Discuz SDK Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/api/README',
          activeBasePath: 'API',
          label: 'API',
          position: 'left',
        },
        {
          to: 'docs/utils/README',
          activeBasePath: 'Utils',
          label: 'Utils',
          position: 'left',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://gitee.com/Discuz/discuz-core',
          label: 'Gitee',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discuz! Q',
              href: 'https://discuz.chat/',
            },
          ],
        },
        {
          title: '更多',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'Gitee',
              href: 'https://gitee.com/Discuz/discuz-core',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Discuz SDK, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
