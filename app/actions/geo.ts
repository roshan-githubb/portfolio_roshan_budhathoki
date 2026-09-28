'use server'

import { headers } from 'next/headers'

// Vercel adds these IP-based geo headers to every request. They're approximate
// (VPNs and cloud IPs skew them) and absent in local dev, so values may be ''.
export async function getVisitorLocation() {
  const h = await headers()
  const decode = (value: string | null) => {
    try {
      return value ? decodeURIComponent(value) : ''
    } catch {
      return value ?? ''
    }
  }

  return {
    country: decode(h.get('x-vercel-ip-country')),
    region: decode(h.get('x-vercel-ip-country-region')),
    city: decode(h.get('x-vercel-ip-city')),
  }
}
