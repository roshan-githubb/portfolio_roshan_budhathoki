'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/firebase'
import { logEvent, setAnalyticsCollectionEnabled } from 'firebase/analytics'

export default function FirebaseAnalytics() {
  useEffect(() => {
    if (analytics) {
      console.log('Firebase Analytics initialized successfully')
      
      // Enable analytics collection
      setAnalyticsCollectionEnabled(analytics, true)
      
      // Log page view
      logEvent(analytics, 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
      })
      
      // Log a test event to verify it's working
      logEvent(analytics, 'portfolio_visit', {
        timestamp: new Date().toISOString(),
      })
      
      console.log('Analytics events logged')
    } else {
      console.warn('Firebase Analytics not initialized - check your .env.local file')
    }
  }, [])

  return null
}
