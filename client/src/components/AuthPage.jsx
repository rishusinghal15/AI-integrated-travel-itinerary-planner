import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async () => {
        if (!form.email || !form.password || (!isLogin && !form.name)) {
            setError('Please fill in all fields')
            return
        }

        setLoading(true)
        setError('')

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
        const body = isLogin
            ? { email: form.email, password: form.password }
            : { name: form.name, email: form.email, password: form.password }

        try {
            const res = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            const data = await res.json()

            if (data.success) {
                login(data.user, data.token)
            } else {
                setError(data.error || 'Something went wrong')
            }
        } catch {
            setError('Cannot connect to server. Make sure backend is running.')
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit()
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">✈️</div>
                <h1 className="auth-title">AI Integrated Travel Itinerary Planner</h1>
                <p className="auth-subtitle">A Smart Personalized Travel Planning System Powered by Artificial Intelligence</p>

                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => { setIsLogin(true); setError('') }}
                    >
                        Login
                    </button>
                    <button
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => { setIsLogin(false); setError('') }}
                    >
                        Register
                    </button>
                </div>

                <div className="auth-form">
                    {!isLogin && (
                        <div className="auth-field">
                            <label>Full Name</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="e.g. Rishu Singhal"
                                value={form.name}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    )}

                    <div className="auth-field">
                        <label>Email Address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className="auth-field">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder={isLogin ? "Your password" : "Minimum 6 characters"}
                            value={form.password}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    {error && (
                        <div className="auth-error">⚠️ {error}</div>
                    )}

                    <button
                        className="auth-submit-btn"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading
                            ? '⏳ Please wait...'
                            : isLogin ? '🔐 Login to My Account' : '🚀 Create My Account'
                        }
                    </button>

                    <p className="auth-switch">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span onClick={() => { setIsLogin(!isLogin); setError('') }}>
                            {isLogin ? 'Register here' : 'Login here'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}