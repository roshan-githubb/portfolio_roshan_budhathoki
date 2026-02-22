import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Check if Firebase config is complete
const isFirebaseConfigured = () => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  )
}

// Initialize Firebase only if configured
let app: FirebaseApp | null = null
let analytics: Analytics | null = null

const initializeFirebase = async () => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase is not configured. Add your Firebase credentials to .env.local')
    return
  }

  if (typeof window === 'undefined') return

  try {
    // Initialize app
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    
    // Check if analytics is supported
    const analyticsSupported = await isSupported()
    
    if (analyticsSupported && app) {
      analytics = getAnalytics(app)
      console.log('✅ Firebase Analytics initialized with Measurement ID:', firebaseConfig.measurementId)
    }
  } catch (error) {
    console.error('Firebase initialization error:', error)
  }
}

// Initialize on client side
if (typeof window !== 'undefined') {
  initializeFirebase()
}

export { app, analytics }
