import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function UserDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('tutorial3LoggedIn') === 'true'
    if (!isLoggedIn) {
      navigate('/login', { replace: true })
      return
    }

    const controller = new AbortController()

    async function loadUser() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(
          `https://express-t4.onrender.com/api/users/${id}`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('Failed to fetch user profile.')
        }

        const data = await response.json()
        setUser(data)
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unexpected error while fetching profile.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()

    return () => controller.abort()
  }, [id, navigate])

  return (
    <main className="page">
      <section className="panel detail-panel">
        <Link to="/users" className="back-link">
          Back to users
        </Link>

        {isLoading && <p className="message">Loading profile...</p>}
        {error && <p className="message message-error">{error}</p>}

        {!isLoading && !error && user && (
          <article>
            <img className="avatar" src={user.picture} alt={user.name} />
            <h1>{user.name}</h1>
            <p className="subtext">{user.email}</p>

            <div className="detail-grid">
              <p><strong>Company:</strong> {user.company}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Eye Color:</strong> {user.eyeColor}</p>
              <p><strong>Balance:</strong> {user.balance}</p>
            </div>

            <p className="about">{user.about}</p>
          </article>
        )}
      </section>
    </main>
  )
}

export default UserDetailPage