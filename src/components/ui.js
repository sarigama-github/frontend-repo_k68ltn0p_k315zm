import { motion } from 'framer-motion'

export const GlassCard = ({ className = '', children, ...props }) => (
  <motion.div
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
    className={`rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl ${className}`}
    {...props}
  >
    {children}
  </motion.div>
)

export const GradientButton = ({ className = '', children, ...props }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    className={`px-4 py-3 rounded-2xl text-white font-semibold shadow-lg bg-gradient-to-r from-blue-500 to-orange-400 ${className}`}
    {...props}
  >
    {children}
  </motion.button>
)

export const PulseButton = ({ className = '', children, ...props }) => (
  <motion.button
    animate={{ boxShadow: [
      '0 0 0 0 rgba(59,130,246,0.6)',
      '0 0 0 14px rgba(59,130,246,0)',
    ]}}
    transition={{ duration: 1.8, repeat: Infinity }}
    className={`px-4 py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-blue-600 to-orange-500 ${className}`}
    {...props}
  >
    {children}
  </motion.button>
)
