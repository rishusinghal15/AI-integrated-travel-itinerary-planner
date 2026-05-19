import { useState, useRef, useEffect } from 'react'

const SUGGESTIONS = [
    "Make Day 1 more budget friendly",
    "Add more adventure activities on Day 2",
    "Replace accommodation with better hotels",
    "Suggest only vegetarian food options",
    "Make the trip more family friendly",
    "Add a local shopping experience",
    "Replace Day 1 morning activity with something cultural",
    "Suggest outdoor activities for the last day",
]

export default function ReplanChat({ onReplan, replanning, chatHistory }) {
    const [input, setInput] = useState('')
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatHistory, replanning])

    const handleSend = () => {
        if (!input.trim() || replanning) return
        onReplan(input.trim())
        setInput('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleChipClick = (suggestion) => {
        setInput(suggestion)
    }

    return (
        <div className="replan-container">
            <div className="replan-header">
                <h3>🤖 AI Re-Planner</h3>
                <p>Not happy with something? Ask AI to modify your itinerary!</p>
            </div>

            {/* Suggestion chips */}
            <div className="suggestion-chips">
                {SUGGESTIONS.map((s, i) => (
                    <button
                        key={i}
                        className="chip"
                        onClick={() => handleChipClick(s)}
                        disabled={replanning}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Chat history */}
            {chatHistory.length > 0 && (
                <div className="chat-history">
                    {chatHistory.map((msg, i) => (
                        <div key={i} className={`chat-bubble ${msg.role}`}>
                            <span className="bubble-label">
                                {msg.role === 'user' ? '👤 You' : '🤖 AI Planner'}
                            </span>
                            <p>{msg.text}</p>
                        </div>
                    ))}

                    {replanning && (
                        <div className="chat-bubble ai">
                            <span className="bubble-label">🤖 AI Planner</span>
                            <p className="typing">
                                <span></span><span></span><span></span>
                            </p>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
            )}

            {/* Input area */}
            <div className="replan-input-row">
                <textarea
                    className="replan-input"
                    placeholder='e.g. "Make Day 2 more budget friendly" or "Add a beach activity on Day 1 morning"...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={2}
                    disabled={replanning}
                />
                <button
                    className="replan-send-btn"
                    onClick={handleSend}
                    disabled={replanning || !input.trim()}
                >
                    {replanning ? '⏳' : 'Update'}
                </button>
            </div>
        </div>
    )
}