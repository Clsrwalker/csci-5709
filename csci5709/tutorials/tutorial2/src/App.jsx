import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration.jsx'
import Profile from './pages/Profile.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1>Profile Registration</h1>
          <p className="subtitle">Tutorial 2 - Front-End Frameworks</p>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App