import { analytics } from './firebase'
import { logEvent } from 'firebase/analytics'

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, eventName, params)
  }
}

export const trackResumeDownload = () => {
  trackEvent('resume_download', {
    button_location: 'hero_section',
    timestamp: new Date().toISOString(),
  })
}

export const trackChatbotOpen = () => {
  trackEvent('chatbot_opened', {
    timestamp: new Date().toISOString(),
  })
}

export const trackChatbotMessage = (message: string) => {
  trackEvent('chatbot_message_sent', {
    message_length: message.length,
    timestamp: new Date().toISOString(),
  })
}

export const trackSocialClick = (platform: string) => {
  trackEvent('social_link_click', {
    platform,
    timestamp: new Date().toISOString(),
  })
}

export const trackNavigationClick = (section: string) => {
  trackEvent('navigation_click', {
    section,
    timestamp: new Date().toISOString(),
  })
}

export const trackContactFormSubmit = () => {
  trackEvent('contact_form_submit', {
    timestamp: new Date().toISOString(),
  })
}
