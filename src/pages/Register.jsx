import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios.js'

export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/auth/register', { name, email, password })
      const login = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', login.data.token)
      localStorage.setItem('user', JSON.stringify(login.data.user))
      navigate('/')
    } catch (e) { setError(e.response?.data?.message || 'Register failed') }
  }

  return (
    <div className="max-w-md mx-auto card space-y-3">
      <h1 className="text-2xl font-bold">Create account</h1>
      {error && <div className="text-red-600">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <div><label className="label">Name</label><input className="input" value={name} onChange={e=>setName(e.target.value)} /></div>
        <div><label className="label">Email</label><input className="input" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><label className="label">Password</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button className="btn w-full">Register</button>
      </form>
      <div className="text-sm">Have an account? <Link to="/login" className="underline">Login</Link></div>
    </div>
  )
}
