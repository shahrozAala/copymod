export const siteConfig = {
  name: 'CopyMod',
  description: 'Link-in-bio platform for car creators',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002',
} as const

export type SiteConfig = typeof siteConfig
