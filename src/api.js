const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export async function sendOTP(mobile) {
  const r = await fetch(`${API_BASE}/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile })
  })
  if (!r.ok) throw new Error('Failed to send OTP')
  return r.json()
}

export async function verifyOTP(mobile, code) {
  const r = await fetch(`${API_BASE}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile, code })
  })
  if (!r.ok) throw new Error('Invalid OTP')
  return r.json()
}

export async function createVehicle(data) {
  const r = await fetch(`${API_BASE}/vehicles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!r.ok) throw new Error('Failed to create vehicle')
  return r.json()
}

export async function listVehicles(owner_mobile) {
  const q = owner_mobile ? `?owner_mobile=${encodeURIComponent(owner_mobile)}` : ''
  const r = await fetch(`${API_BASE}/vehicles${q}`)
  if (!r.ok) throw new Error('Failed to load vehicles')
  return r.json()
}

export async function createBooking(data) {
  const r = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!r.ok) throw new Error('Failed to create booking')
  return r.json()
}

export async function sendSupportMessage(mobile, text) {
  const r = await fetch(`${API_BASE}/support/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile, text })
  })
  if (!r.ok) throw new Error('Failed to send message')
  return r.json()
}
