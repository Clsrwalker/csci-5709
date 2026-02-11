import { Link, useLocation } from 'react-router-dom'

function Profile() {
  const { state } = useLocation()

  if (!state) {
    return (
      <section className="card">
        <h2>Profile</h2>
        <p className="helper">No profile data found.Please register first.</p>
        <Link to="/" className="link">Go to Registration</Link>
      </section>
    )
  }

  return (
    <section className="card">
      <h2>Profile</h2>
      <p className="helper">Your registration was successful.</p>
      <div className="profile-row">
        <span className="profile-label">First Name</span>
        <strong>{state.firstName}</strong>
      </div>
      <div className="profile-row">
        <span className="profile-label">Last Name</span>
        <strong>{state.lastName}</strong>
      </div>
      <div className="profile-row">
        <span className="profile-label">Email</span>
        <strong>{state.email}</strong>
      </div>
      <div className="button-row">
        <Link to="/" className="link">Back to Registration</Link>
      </div>
    </section>
  )
}

export default Profile