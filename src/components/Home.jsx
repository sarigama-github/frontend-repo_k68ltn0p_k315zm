import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from './ui'
import { Bike, Car } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Home({ user }) {
  const nav = useNavigate()
  const [hovered, setHovered] = useState(null)

  const Card = ({ title, icon: Icon, onClick }) => (
    <GlassCard
      className={`p-6 cursor-pointer ${hovered === title ? 'ring-2 ring-blue-400/60' : ''}`}
      onMouseEnter={() => setHovered(title)}
      onMouseLeave={() => setHovered(null)}
      onClick={onClick}
    >
      <motion.div initial={{ y: 4 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 160, damping: 14 }}>
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/30 to-orange-400/30">
            <Icon className="text-white" />
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold">{title}</h3>
            <p className="text-white/70 text-sm">Tap to proceed</p>
          </div>
        </div>
      </motion.div>
    </GlassCard>
  )

  return (
    <div className="px-6 py-8 space-y-4">
      <h2 className="text-white/90 text-lg">Hi {user?.mobile || 'there'} 👋</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 200 }}>
          <Card title="Rent a Vehicle" icon={Bike} onClick={() => nav('/booking')} />
        </motion.div>
        <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 200 }}>
          <Card title="List Your Vehicle" icon={Car} onClick={() => nav('/list')} />
        </motion.div>
      </div>
    </div>
  )
}
