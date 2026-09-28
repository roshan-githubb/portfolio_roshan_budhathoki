// Public URL of the live site, used for SEO metadata, sitemap.xml and robots.txt.
// Set NEXT_PUBLIC_SITE_URL in Vercel if you move to a custom domain.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-roshan-budhathoki.vercel.app'
).replace(/\/$/, '')
