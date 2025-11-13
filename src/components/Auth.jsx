import { useState } from 'react'
import { motion } from 'framer-motion'
import { sendOTP, verifyOTP } from '../api'
import { GlassCard, GradientButton } from './ui'

export default function Auth({ onAuthenticated }) {
  const [mobile, setMobile] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState('mobile')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    setLoading(true)
    try {
      await sendOTP(mobile)
      setStep('otp')
    } catch (e) {
      alert(e.message)
    } finally { setLoading(false) }
  }

  const handleVerify = async () => {
    setLoading(true)
    try {
      const res = await verifyOTP(mobile, code)
      onAuthenticated(res.mobile, res.token)
    } catch (e) {
      alert(e.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="px-6 py-10">
      <GlassCard className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-orange-400 bg-clip-text text-transparent">Welcome to Ride+</h2>
          <p className="text-white/70 mt-1">OTP-based sign in</p>
        </div>

        {step === 'mobile' && (
          <div>
            <motion.label initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="block text-white/80 mb-2">Mobile number</motion.label>
            <motion.input
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              type="tel"
              placeholder="e.g. +15551234567"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
            />
            <GradientButton onClick={handleSend} className="w-full mt-4">
              {loading ? 'Sending…' : 'Send OTP'}
            </GradientButton>
          </div>
        )}

        {step === 'otp' && (
          <div>
            <motion.label initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="block text-white/80 mb-2">Enter OTP</motion.label>
            <motion.input
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              type="text"
              placeholder="6-digit code"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full tracking-widest text-center text-2xl rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400/60"
            />
            <GradientButton onClick={handleVerify} className="w-full mt-4">
              {loading ? 'Verifying…' : 'Verify & Continue'}
            </GradientButton>
          </div>
        )}
      </GlassCard>
    </div>
  )
}
