import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard, GradientButton } from './ui'
import { createVehicle } from '../api'

export default function ListVehicle({ user }) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('bike')
  const [price, setPrice] = useState('')
  const [images, setImages] = useState([])
  const [insurance, setInsurance] = useState(true)
  const [progress, setProgress] = useState(20)

  const handleImages = (e) => {
    const files = Array.from(e.target.files || [])
    setImages(files.map(f => URL.createObjectURL(f)))
    setProgress(80)
  }

  const submit = async () => {
    const data = {
      owner_mobile: user.mobile,
      title,
      type,
      price_per_day: Number(price || 0),
      images,
      insurance_active: insurance,
    }
    const res = await createVehicle(data)
    alert('Vehicle created with id ' + res.id)
    setProgress(100)
  }

  return (
    <div className="px-6 py-8 space-y-4">
      <GlassCard className="p-6">
        <div className="mb-4">
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-blue-500 to-orange-400" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8 }} />
          </div>
        </div>

        <div className="grid gap-4">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Vehicle title" className="rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:outline-none" />

          <select value={type} onChange={e => setType(e.target.value)} className="rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white focus:outline-none">
            <option value="bike">Bike</option>
            <option value="car">Car</option>
          </select>

          <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="Price per day" className="rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:outline-none" />

          <div>
            <label className="block text-white/80 mb-2">Upload images</label>
            <input type="file" multiple onChange={handleImages} className="text-white" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              {images.map((src, i) => (
                <img key={i} src={src} alt="preview" className="w-full h-24 object-cover rounded-xl" />
              ))}
            </div>
          </div>

          <label className="inline-flex items-center gap-3">
            <input type="checkbox" checked={insurance} onChange={e => setInsurance(e.target.checked)} className="accent-orange-400" />
            <span className="text-white/90">Insurance active</span>
            <span className="ml-2 px-2 py-1 rounded-full text-xs bg-orange-500/20 text-orange-200 animate-pulse">glow</span>
          </label>

          <GradientButton onClick={submit} className="mt-2">Submit</GradientButton>
        </div>
      </GlassCard>
    </div>
  )
}
