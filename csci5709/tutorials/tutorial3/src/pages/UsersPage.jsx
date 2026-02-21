import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const USERS_API = 'https://express-t4.onrender.com/api/users'

function getNameParts(fullName) {
  const parts = (fullName || '').trim().split(/\s+/)
  const firstName = parts[0] || ''
  const lastName = parts.slice(1).join(' ')
  return { firstName, lastName }
}

function UsersPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('tutorial3LoggedIn') === 'true'
    if (!isLoggedIn) {
      navigate('/login', { replace: true })
      return
    }

    const controller = new AbortController()

    async function loadUsers() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(USERS_API, { signal: controller.signal })
        if (!response.ok) {
          throw new Error('Failed to fetch users.')
        }

        const data = await response.json()
        setUsers(Array.isArray(data) ? data : [])
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unexpected error while fetching users.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()

    return () => controller.abort()
  }, [navigate])

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    if (!keyword) {
      return users
    }

    return users.filter((user) => {
      const { firstName, lastName } = getNameParts(user.name)
      return (
        firstName.toLowerCase().includes(keyword) ||
        lastName.toLowerCase().includes(keyword)
      )
    })
  }, [search, users])

  const handleLogout = () => {
    localStorage.removeItem('tutorial3LoggedIn')
    localStorage.removeItem('tutorial3Email')
    navigate('/login', { replace: true })
  }

  return (
    <main className="page">
      <section className="panel">
        <div className="header-row">
          <h1>Profile Listing</h1>
          <button className="button-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <input
          className="search-input"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by first name or last name"
        />

        {isLoading && <p className="message">Loading users...</p>}
        {error && <p className="message message-error">{error}</p>}

        {!isLoading && !error && (
          <div className="user-grid">
            {filteredUsers.map((user) => (
              <Link className="user-card" key={user._id} to={`/users/${user._id}`}>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </Link>
            ))}

            {filteredUsers.length === 0 && (
              <p className="message">No users match your search.</p>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export default UsersPage