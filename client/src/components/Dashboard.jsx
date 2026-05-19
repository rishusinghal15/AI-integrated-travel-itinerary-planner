import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Dashboard({ onLoadItinerary, onNewTrip }) {
    const { user, token, logout } = useAuth()
    const [itineraries, setItineraries] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState(null)

    useEffect(() => {
        fetchItineraries()
    }, [])

    const fetchItineraries = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/itineraries/my-itineraries', {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await res.json()
            if (data.success) setItineraries(data.itineraries)
        } catch (err) {
            console.error('Failed to fetch itineraries')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this itinerary?')) return
        setDeleting(id)
        try {
            const res = await fetch(`http://localhost:5000/api/itineraries/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await res.json()
            if (data.success) {
                setItineraries(itineraries.filter(i => i._id !== id))
            }
        } catch (err) {
            console.error('Delete failed')
        } finally {
            setDeleting(null)
        }
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
        })
    }

    return (
        <div className="app">
            {/* Top navbar */}
            <div className="dashboard-nav">
                <div className="nav-logo">✈️ AI Travel Planner</div>
                <div className="nav-right">
                    <span className="nav-user">👤 {user?.name}</span>
                    <button className="nav-logout-btn" onClick={logout}>Logout</button>
                </div>
            </div>

            <div className="dashboard-content">
                {/* Welcome + New Trip */}
                <div className="dashboard-welcome">
                    <div>
                        <h2>Welcome, {user?.name?.split(' ')[0]}! 🌍</h2>
                        <p>Plan a new adventure or revisit your saved itineraries</p>
                    </div>
                    <button className="new-trip-btn" onClick={onNewTrip}>
                        ✈️ Plan New Trip
                    </button>
                </div>

                {/* Saved Itineraries */}
                <div className="saved-section">
                    <h3 className="saved-title">
                        🗂️ My Saved Itineraries
                        <span className="saved-count">{itineraries.length}</span>
                    </h3>

                    {loading && (
                        <div className="dashboard-loading">
                            <div className="spinner"></div>
                            <p>Loading your itineraries...</p>
                        </div>
                    )}

                    {!loading && itineraries.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">🗺️</div>
                            <h4>No saved itineraries yet</h4>
                            <p>Generate your first AI-powered travel plan and save it here!</p>
                            <button className="new-trip-btn" onClick={onNewTrip}>
                                Plan Your First Trip
                            </button>
                        </div>
                    )}

                    <div className="itinerary-grid">
                        {itineraries.map(item => (
                            <div className="itinerary-card" key={item._id}>
                                <div className="icard-header">
                                    <h4>📍 {item.destination}</h4>
                                    <span className="icard-date">{formatDate(item.createdAt)}</span>
                                </div>
                                <div className="icard-meta">
                                    <span>📅 {item.duration} Days</span>
                                    <span>💰 ₹{Number(item.budget).toLocaleString()}</span>
                                    <span>🎒 {item.travelStyle}</span>
                                </div>
                                <div className="icard-actions">
                                    <button
                                        className="icard-btn view"
                                        onClick={() => onLoadItinerary(item.itineraryData)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="icard-btn delete"
                                        onClick={() => handleDelete(item._id)}
                                        disabled={deleting === item._id}
                                    >
                                        {deleting === item._id ? '⏳' : '🗑️ Delete'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}