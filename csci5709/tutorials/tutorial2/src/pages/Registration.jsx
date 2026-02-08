import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const nameRegex = /^[A-Za-z]+$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/

function Registration() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.firstName.trim()) {
      nextErrors.firstName = 'First name is required.'
    } else if (!nameRegex.test(form.firstName.trim())) {
      nextErrors.firstName = 'First name must contain only letters.'
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName = 'Last name is required.'
    } else if (!nameRegex.test(form.lastName.trim())) {
      nextErrors.lastName = 'Last name must contain only letters.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Email must be a valid format (e.g., jon_snow@westeros.com).'
    }

    if (!form.password) {
      nextErrors.password = 'Password is required.'
    } else if (form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    } else if (!passwordRegex.test(form.password)) {
      nextErrors.password = 'Password can include letters, numbers, and special characters only.'
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm password is required.'
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      navigate('/profile', {
        state: {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
        },
      })
    }
  }

  return (
    <section className="card">
      <h2>Registration</h2>
      <p className="helper">Fill in the form to create your profile.</p>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Arya"
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        <div className="field">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Stark"
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={form.email}
            onChange={handleChange}
            placeholder="jon_snow@westeros.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Minimum 8 characters"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="button-row">
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  )
}

export default Registration