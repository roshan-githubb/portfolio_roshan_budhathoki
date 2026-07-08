import { db } from './firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

// Logs each chatbot exchange (visitor prompt + bot reply) so you can read
// what people actually asked, in the Firestore console under the "chats" collection.
export const logChatMessage = async (prompt: string, reply: string) => {
  if (!db) return
  try {
    await addDoc(collection(db, 'chats'), {
      prompt,
      reply,
      createdAt: serverTimestamp(),
      path: typeof window !== 'undefined' ? window.location.pathname : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    })
  } catch (error) {
    // Silent fail — logging should never break the chat experience
  }
}

// Logs each contact-form submission to the "contacts" collection as a
// browsable backup of the Web3Forms email.
export const logContactSubmission = async (data: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  if (!db) return
  try {
    await addDoc(collection(db, 'contacts'), {
      ...data,
      createdAt: serverTimestamp(),
      path: typeof window !== 'undefined' ? window.location.pathname : '',
    })
  } catch (error) {
    // Silent fail
  }
}
