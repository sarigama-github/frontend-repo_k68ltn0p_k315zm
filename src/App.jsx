import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Splash from './components/Splash'
import Auth from './components/Auth'
import Home from './components/Home'
import ListVehicle from './components/ListVehicle'
import Booking from './components/Booking'
import Support from './components/Support'
import { motion } from 'framer-motion'

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900 via-blue-800 to-orange-600">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-white/10 to-transparent" />
      <div className="max-w-md mx-auto py-4">
        <header className="px-6 py-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Ride+</h1>
        </header>
        <main className="px-2">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            {children}
          </motion.div>
        </main>
        <footer className="text-center text-white/60 py-6">© {new Date().getFullYear()} Ride+</footer>
      </div>
    </div>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2200)
    return () => clearTimeout(t)
  }, [])

  const onAuthenticated = (mobile, token) => {
    setUser({ mobile, token })
  }

  if (!ready) return <Splash onDone={() => setReady(true)} />

  return (
    <Shell>
      {!user ? (
        <Auth onAuthenticated={onAuthenticated} />
      ) : (
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/list" element={<ListVehicle user={user} />} />
          <Route path="/booking" element={<Booking user={user} />} />
          <Route path="/support" element={<Support user={user} />} />
          <Route path="*" element={<Home user={user} />} />
        </Routes>
      )}
    </Shell>
  )
}
