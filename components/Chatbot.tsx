'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { getChatResponse } from '@/app/actions/gemini'
import { trackChatbotOpen, trackChatbotMessage } from '@/lib/analytics'
import { logChatMessage } from '@/lib/firestore'

interface Message {
  text: string
  isBot: boolean
  timestamp: Date
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm Roshan's AI assistant. Ask me anything about his experience, skills, or projects!",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setIsLoading(true)

    trackChatbotMessage(currentInput)

    try {
      const response = await getChatResponse(currentInput)

      const botResponse: Message = {
        text: response,
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])

      // Save the full exchange so you can read what visitors actually asked
      logChatMessage(currentInput, response)
    } catch (error) {
      const errorMessage: Message = {
        text: "Sorry, I encountered an error. Please try again or contact Roshan directly at roshanbc9860@gmail.com",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickQuestions = [
    'Tell me about your experience',
    'What are your key skills?',
    'Show me your projects',
    'How can I contact you?',
  ]

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => {
          if (!isOpen) trackChatbotOpen()
          setIsOpen(!isOpen)
        }}
        className="fixed bottom-8 right-6 md:bottom-10 md:right-8 z-50 p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        {/* Attention pulse ring (only when closed) */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping" />
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex items-center gap-2"
            >
              <MessageCircle size={24} className="text-white" />
              <span className="text-white text-sm font-semibold pr-1 whitespace-nowrap">
                Ask about me
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] glass-effect rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">AI Assistant</h3>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-white/10 text-gray-200'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <Loader2 size={20} className="animate-spin text-blue-400" />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInput(question)
                      }}
                      className="text-xs px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="text-white animate-spin" />
                  ) : (
                    <Send size={18} className="text-white" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
