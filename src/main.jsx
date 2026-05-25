import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{ padding: "40px", background: "#0a0907", minHeight: "100vh", color: "white" }}>
      <h1 style={{ color: "#c8a96e" }}>KingdomShift Marketplace Platform</h1>
      <p>Your platform is connected to Vercel.</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
