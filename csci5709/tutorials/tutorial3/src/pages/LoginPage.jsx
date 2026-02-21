import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LOGIN_API = 'https://express-t4.onrender.com/api/login'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Email and password are required.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(LOGIN_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email.trim(),
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.')
      }

      localStorage.setItem('tutorial3LoggedIn', 'true')
      localStorage.setItem('tutorial3Email', email.trim())
      navigate('/users')
    } catch (submitError) {
      setError(submitError.message || 'Unexpected error while logging in.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page page-center">
      <section className="panel login-panel">
        <h1>Tutorial 3 Login</h1>


        <form className="form-grid" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="testemail@dal.ca"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Test@123"
          />

          {error && <p className="message message-error">{error}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage