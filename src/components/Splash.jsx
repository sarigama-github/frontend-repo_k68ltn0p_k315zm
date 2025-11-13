import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Splash({ onDone }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false)
      onDone?.()
    }, 2200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-blue-700 to-orange-500"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0">
            <Spline scene="https://prod.spline.design/8fw9Z-c-rqW3nWBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="absolute inset-0 backdrop-blur-sm bg-white/5" />
          <div className="relative h-full flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, filter: 'drop-shadow(0 0 30px rgba(59,130,246,0.8))' }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              className="px-10 py-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl"
            >
              <div className="text-center">
                <motion.div
                  className="text-5xl font-extrabold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #60A5FA 0%, #FB923C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                >
                  Ride+
                </motion.div>
                <motion.p className="mt-2 text-white/80">Move freer. Rent smarter.</motion.p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
