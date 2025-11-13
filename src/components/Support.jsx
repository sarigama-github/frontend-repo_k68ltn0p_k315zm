import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard, GradientButton } from './ui'
import { sendSupportMessage } from '../api'

export default function Support({ user }) {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const typingRef = useRef(false)

  const send = async () => {
    if (!text.trim()) return
    const myMsg = { role: 'user', text }
    setMessages(prev => [...prev, myMsg])
    setText('')
    typingRef.current = true
    setTimeout(async () => {
      const res = await sendSupportMessage(user.mobile, myMsg.text)
      typingRef.current = false
      setMessages(prev => [...prev, { role: 'bot', text: res.reply }])
    }, 600)
  }

  return (
    <div className="px-6 py-8 space-y-4">
      <GlassCard className="p-6">
        <div className="h-72 overflow-y-auto space-y-3 mb-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl ${m.role === 'user' ? 'bg-blue-500 text-white rounded-br-sm' : 'bg-white/10 text-white rounded-bl-sm'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {typingRef.current && (
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-orange-400" />
              <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity }}>Bot is typing…</motion.div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <input value={text} onChange={e => setText(e.target.value)} placeholder="Ask something…" className="flex-1 rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:outline-none" />
          <GradientButton onClick={send}>Send</GradientButton>
        </div>
      </GlassCard>
    </div>
  )
}
