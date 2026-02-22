'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/firebase'
import { logEvent, setAnalyticsCollectionEnabled } from 'firebase/analytics'

export default function FirebaseAnalytics() {
  useEffect(() => {
    if (analytics) {
      setAnalyticsCollectionEnabled(analytics, true)
      
      logEvent(analytics, 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
      })
      
      logEvent(analytics, 'portfolio_visit', {
        timestamp: new Date().toISOString(),
      })
    }
  }, [])

  return null
}
