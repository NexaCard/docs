import { defineConfigWithTheme } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import type { DujiaoThemeConfig } from './theme/sponsor'

type ConfigWithSponsor = DefaultTheme.Config & DujiaoThemeConfig

const head = [
  ['link', { rel: 'icon', href: '/nx.svg' }],
] as const

const socialLinks: DefaultTheme.SocialLink[] = [{ icon: 'github', link: 'https://github.com/NexaCard' }]

const rootSidebar: DefaultTheme.Sidebar = [
  {
    text: '简介',
    items: [
      { text: '关于 NexaCard', link: '/intro/about' },
      { text: '环境要求', link: '/intro/requirements' },
      { text: '更新日志', link: '/intro/changelog' },
      { text: '术语统一表', link: '/intro/terminology' },
      { text: '开源仓库与贡献', link: '/intro/open-source' },
    ],
  },
  {
    text: '配置',
    items: [{ text: 'config.yml 详细说明', link: '/config/config-yml' }],
  },
  {
    text: '部署',
    items: [
      { text: '部署总览', link: '/deploy/' },
      { text: '单二进制部署', link: '/deploy/binary' },
      { text: '手动部署', link: '/deploy/manual' },
      { text: 'Docker Compose 部署', link: '/deploy/docker-compose' },
      { text: 'Nginx Proxy Manager', link: '/deploy/nginx-proxy-manager' },
      { text: 'aaPanel 手动部署', link: '/deploy/aapanel' },
    ],
  },
  {
    text: '支付',
    items: [{ text: '支付配置与回调指南', link: '/payment/guide' }],
  },
  {
    text: 'API 集成',
    items: [
      { text: 'User 前台 API 文档', link: '/api/frontend-api' },
      { text: '站点对接说明', link: '/api/integration-guide' },
      { text: '站点对接 API 文档', link: '/api/integration-open-api' },
    ],
  },
  {
    text: '运营指南',
    items: [
      { text: '后台管理指南', link: '/guide/admin-guide' },
      { text: '卡密管理', link: '/guide/card-secrets' },
      { text: '会员等级', link: '/guide/member-level' },
      { text: '钱包系统', link: '/guide/wallet' },
      { text: '安全配置', link: '/guide/security' },
    ],
  },
  {
    text: '社区',
    items: [
      { text: '社区共享项目', link: '/community/projects' },
      { text: '成为赞助商', link: '/sponsor/become-sponsor' },
    ],
  },
]

const zhHantSidebar: DefaultTheme.Sidebar = [
  {
    text: '簡介',
    items: [
      { text: '關於 NexaCard', link: '/zh-hant/intro/about' },
      { text: '環境要求', link: '/zh-hant/intro/requirements' },
      { text: '更新日誌', link: '/zh-hant/intro/changelog' },
      { text: '術語統一表', link: '/zh-hant/intro/terminology' },
      { text: '開源倉庫與貢獻', link: '/zh-hant/intro/open-source' },
    ],
  },
  {
    text: '配置',
    items: [{ text: 'config.yml 詳細說明', link: '/zh-hant/config/config-yml' }],
  },
  {
    text: '部署',
    items: [
      { text: '部署總覽', link: '/zh-hant/deploy/' },
      { text: '單二進位部署', link: '/zh-hant/deploy/binary' },
      { text: '手動部署', link: '/zh-hant/deploy/manual' },
      { text: 'Docker Compose 部署', link: '/zh-hant/deploy/docker-compose' },
      { text: 'Nginx Proxy Manager', link: '/zh-hant/deploy/nginx-proxy-manager' },
      { text: 'aaPanel 手動部署', link: '/zh-hant/deploy/aapanel' },
    ],
  },
  {
    text: '支付',
    items: [{ text: '支付配置與回調指南', link: '/zh-hant/payment/guide' }],
  },
  {
    text: 'API 整合',
    items: [
      { text: 'User 前台 API 文件', link: '/zh-hant/api/frontend-api' },
      { text: '站點對接說明', link: '/zh-hant/api/integration-guide' },
      { text: '站點對接 API 文件', link: '/zh-hant/api/integration-open-api' },
    ],
  },
  {
    text: '營運指南',
    items: [
      { text: '後台管理指南', link: '/zh-hant/guide/admin-guide' },
      { text: '卡密管理', link: '/zh-hant/guide/card-secrets' },
      { text: '會員等級', link: '/zh-hant/guide/member-level' },
      { text: '錢包系統', link: '/zh-hant/guide/wallet' },
      { text: '安全配置', link: '/zh-hant/guide/security' },
    ],
  },
  {
    text: '社群',
    items: [
      { text: '社群共享專案', link: '/zh-hant/community/projects' },
      { text: '成為贊助商', link: '/zh-hant/sponsor/become-sponsor' },
    ],
  },
]

const enSidebar: DefaultTheme.Sidebar = [
  {
    text: 'Introduction',
    items: [
      { text: 'About NexaCard', link: '/en/intro/about' },
      { text: 'Requirements', link: '/en/intro/requirements' },
      { text: 'Changelog', link: '/en/intro/changelog' },
      { text: 'Terminology Glossary', link: '/en/intro/terminology' },
      { text: 'Open Source & Contribution', link: '/en/intro/open-source' },
    ],
  },
  {
    text: 'Configuration',
    items: [{ text: 'config.yml Reference', link: '/en/config/config-yml' }],
  },
  {
    text: 'Deployment',
    items: [
      { text: 'Deployment Overview', link: '/en/deploy/' },
      { text: 'Single Binary Deployment', link: '/en/deploy/binary' },
      { text: 'Manual Deployment', link: '/en/deploy/manual' },
      { text: 'Docker Compose Deployment', link: '/en/deploy/docker-compose' },
      { text: 'Nginx Proxy Manager', link: '/en/deploy/nginx-proxy-manager' },
      { text: 'aaPanel Deployment', link: '/en/deploy/aapanel' },
    ],
  },
  {
    text: 'Payments',
    items: [{ text: 'Payment Configuration & Callback Guide', link: '/en/payment/guide' }],
  },
  {
    text: 'API Integration',
    items: [
      { text: 'User Frontend API Docs', link: '/en/api/frontend-api' },
      { text: 'Site Integration Guide', link: '/en/api/integration-guide' },
      { text: 'Site Integration Open API', link: '/en/api/integration-open-api' },
    ],
  },
  {
    text: 'Operations Guide',
    items: [
      { text: 'Admin Guide', link: '/en/guide/admin-guide' },
      { text: 'Card Secrets', link: '/en/guide/card-secrets' },
      { text: 'Member Levels', link: '/en/guide/member-level' },
      { text: 'Wallet', link: '/en/guide/wallet' },
      { text: 'Security', link: '/en/guide/security' },
    ],
  },
  {
    text: 'Community',
    items: [
      { text: 'Community Shared Projects', link: '/en/community/projects' },
      { text: 'Become a Sponsor', link: '/en/sponsor/become-sponsor' },
    ],
  },
]

export default defineConfigWithTheme<ConfigWithSponsor>({
  lang: 'zh-CN',
  title: 'NexaCard 文档中心',
  description: 'NexaCard 部署、配置与 API 集成文档',
  lastUpdated: true,
  cleanUrls: true,
  head: head as unknown as [string, Record<string, string>][],

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      title: 'NexaCard 文档中心',
      description: 'NexaCard 部署、配置与 API 集成文档',
    },
    'zh-hant': {
      label: '繁體中文',
      lang: 'zh-Hant',
      link: '/zh-hant/',
      title: 'NexaCard 文件中心',
      description: 'NexaCard 部署、設定與 API 整合文件',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh-hant/intro/about' },
          { text: '部署', link: '/zh-hant/deploy/' },
          { text: 'API', link: '/zh-hant/api/frontend-api' },
          { text: 'GitHub', link: 'https://github.com/NexaCard' },
        ],
        sidebar: zhHantSidebar,
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'NexaCard Documentation',
      description: 'Deployment, configuration, and API integration docs for NexaCard',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/intro/about' },
          { text: 'Deployment', link: '/en/deploy/' },
          { text: 'API', link: '/en/api/frontend-api' },
          { text: 'GitHub', link: 'https://github.com/NexaCard' },
        ],
        sidebar: enSidebar,
      },
    },
  },

  themeConfig: {
    logo: '/nx.svg',
    nav: [
      { text: '指南', link: '/intro/about' },
      { text: '部署', link: '/deploy/' },
      { text: 'API', link: '/api/frontend-api' },
      { text: 'GitHub', link: 'https://github.com/NexaCard' },
    ],
    sidebar: rootSidebar,
    socialLinks,
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © NexaCard',
    },
  },
})
