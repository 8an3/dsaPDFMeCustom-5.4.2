// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require('path');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'pdfme',
  url: 'https://pdfme.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'pdfme',
  projectName: 'pdfme',
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/hand-dot/pdfme/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    function myPlugin() {
      return {
        name: 'custom-docusaurus-plugin',
        configureWebpack(config) {
          const r = config.module.rules.find(
            (r) => r.test.toString() === /\.(woff|woff2|eot|ttf|otf)$/.toString()
          );
          // Remove ttf rule
          r.test = /\.(woff|woff2|eot|otf)$/;

          // Remove existing sass rule
          config.module.rules = config.module.rules.filter(
            (r) => r.test.toString() !== /\.s[ca]ss$/.toString()
          );

          return {
            module: {
              rules: [
                // Add ttf rule. Because we use Helvetica.ttf as data from src/libs/helper #getDefaultFont.
                {
                  test: /\.ttf$/,
                  use: ['url-loader'],
                },
                // Add sass rule for src/
                {
                  test: /\.module\.scss$/,
                  include: path.resolve(__dirname, '../src'),
                  use: [
                    { loader: 'style-loader' },
                    {
                      loader: 'css-loader',
                      options: { modules: { namedExport: true } },
                    },
                    { loader: 'sass-loader' },
                  ],
                },
                {
                  test: /\.scss$/,
                  exclude: /\.module\.scss$/,
                  include: path.resolve(__dirname, '../src'),
                  use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                // Add svg rule for src/
                {
                  test: /\.svg$/,
                  use: ['url-loader'],
                },
              ],
            },
          };
        },
      };
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'pdfme',
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: 'Docs',
          },
          {
            href: 'https://github.com/hand-dot/pdfme',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Github',
                href: 'https://github.com/hand-dot/pdfme',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} pdfme`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
