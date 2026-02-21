import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import UserDetailPage from './pages/UserDetailPage.jsx'
import UsersPage from './pages/UsersPage.jsx'
import './App.css'

function HomeRedirect() {
  const isLoggedIn = localStorage.getItem('tutorial3LoggedIn') === 'true'
  return <Navigate to={isLoggedIn ? '/users' : '/login'} replace />
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App