import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios.js'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const r = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', r.data.token)
      localStorage.setItem('user', JSON.stringify(r.data.user))
      navigate('/')
    } catch (e) { setError(e.response?.data?.message || 'Login failed') }
  }

  return (
    <div className="max-w-md mx-auto card space-y-3">
      <h1 className="text-2xl font-bold">Login</h1>
      {error && <div className="text-red-600">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <div><label className="label">Email</label><input className="input" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><label className="label">Password</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button className="btn w-full">Login</button>
      </form>
      <div className="text-sm">No account? <Link to="/register" className="underline">Register</Link></div>
    </div>
  )
}
