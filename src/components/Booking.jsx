import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard, GradientButton, PulseButton } from './ui'
import { createBooking, listVehicles } from '../api'

export default function Booking({ user }) {
  const [vehicles, setVehicles] = useState([])
  const [vehicleId, setVehicleId] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  useEffect(() => {
    listVehicles().then(setVehicles)
  }, [])

  const submit = async () => {
    const res = await createBooking({ user_mobile: user.mobile, vehicle_id: vehicleId, start_date: start, end_date: end, instant_delivery: true })
    alert('Booking created with id ' + res.id)
  }

  return (
    <div className="px-6 py-8 space-y-4">
      <GlassCard className="p-6">
        <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-orange-400/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">Ride+ Subscription</div>
              <div className="text-white/70 text-sm">Save up to 20% on weekly rentals</div>
            </div>
            <motion.div animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 4, repeat: Infinity }} className="px-3 py-1 rounded-xl text-white text-sm bg-gradient-to-r from-blue-500 to-orange-400">Upgrade</motion.div>
          </div>
        </div>

        <div className="grid gap-3">
          <select value={vehicleId} onChange={e => setVehicleId(e.target.value)} className="rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white">
            <option value="">Select vehicle</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>{v.title}</option>
            ))}
          </select>

          <label className="text-white/80">Start date</label>
          <motion.input type="date" value={start} onChange={e => setStart(e.target.value)} whileFocus={{ scale: 1.02 }} className="rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white" />
          <label className="text-white/80">End date</label>
          <motion.input type="date" value={end} onChange={e => setEnd(e.target.value)} whileFocus={{ scale: 1.02 }} className="rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white" />

          <PulseButton onClick={submit} className="mt-2">Instant Delivery</PulseButton>
        </div>
      </GlassCard>
    </div>
  )
}
