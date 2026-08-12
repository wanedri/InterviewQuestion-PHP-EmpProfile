import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import { useToast } from '../components/ToastProvider.jsx'
import { ApiError } from '../api/client.js'
import { createEmployee, fetchEmployeeOptions } from '../api/employees.js'
import { emptyEmployee, validateEmployee } from '../validation/employee.js'

const todayIso = () => new Date().toISOString().slice(0, 10)

function maxDobIso() {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 16)
  return date.toISOString().slice(0, 10)
}

export default function EmployeeFormPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [options, setOptions] = useState(null)
  const [optionsError, setOptionsError] = useState('')
  const [values, setValues] = useState(emptyEmployee)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchEmployeeOptions()
      .then(setOptions)
      .catch(() => setOptionsError('Unable to load form options. Please refresh the page.'))
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleBlur(event) {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    if (options) {
      setErrors(validateEmployee(values, options))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!options) return

    const validationErrors = validateEmployee(values, options)
    setErrors(validationErrors)
    setTouched(Object.fromEntries(Object.keys(emptyEmployee).map((key) => [key, true])))

    if (Object.keys(validationErrors).length > 0) {
      showToast('Please fix the highlighted fields.', 'error')
      return
    }

    setSubmitting(true)
    try {
      await createEmployee(values)
      showToast('Employee added successfully.', 'success')
      setValues(emptyEmployee)
      setTouched({})
      setErrors({})
    } catch (error) {
      if (error instanceof ApiError && error.status === 422) {
        setErrors(Object.fromEntries(Object.entries(error.errors).map(([field, messages]) => [field, messages[0]])))
        showToast('Please fix the highlighted fields.', 'error')
      } else {
        showToast('Something went wrong while saving. Please try again.', 'error')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (optionsError) {
    return <p className="alert alert--error">{optionsError}</p>
  }

  if (!options) {
    return <p className="loading-text">Loading form…</p>
  }

  const errorFor = (field) => (touched[field] ? errors[field] : undefined)

  return (
    <section className="card">
      <h1>Add New Employee</h1>
      <p className="card__subtitle">Fill in the details below to create a new employee profile.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <FormField id="name" label="Employee Name" required error={errorFor('name')}>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errorFor('name'))}
              maxLength={255}
            />
          </FormField>

          <FormField id="gender" label="Gender" required error={errorFor('gender')}>
            <select
              id="gender"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errorFor('gender'))}
            >
              <option value="">Select gender</option>
              {options.genders.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="marital_status" label="Marital Status" required error={errorFor('marital_status')}>
            <select
              id="marital_status"
              name="marital_status"
              value={values.marital_status}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errorFor('marital_status'))}
            >
              <option value="">Select marital status</option>
              {options.marital_statuses.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="phone" label="Phone No." required error={errorFor('phone')}>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="e.g. +60 12-345 6789"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errorFor('phone'))}
              maxLength={20}
            />
          </FormField>

          <FormField id="email" label="Email" required error={errorFor('email')}>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errorFor('email'))}
              maxLength={255}
            />
          </FormField>

          <FormField id="nationality" label="Nationality" required error={errorFor('nationality')}>
            <input
              id="nationality"
              name="nationality"
              type="text"
              value={values.nationality}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errorFor('nationality'))}
              maxLength={100}
            />
          </FormField>

          <FormField id="date_of_birth" label="Date of Birth" required error={errorFor('date_of_birth')}>
            <input
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              value={values.date_of_birth}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errorFor('date_of_birth'))}
              max={maxDobIso()}
            />
          </FormField>

          <FormField id="hire_date" label="Hire Date" required error={errorFor('hire_date')}>
            <input
              id="hire_date"
              name="hire_date"
              type="date"
              value={values.hire_date}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errorFor('hire_date'))}
              min={values.date_of_birth || undefined}
              max={todayIso()}
            />
          </FormField>

          <FormField id="department" label="Department" required error={errorFor('department')}>
            <select
              id="department"
              name="department"
              value={values.department}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errorFor('department'))}
            >
              <option value="">Select department</option>
              {options.departments.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="address" label="Address" required error={errorFor('address')} fullWidth>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errorFor('address'))}
              maxLength={500}
            />
          </FormField>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={submitting}>
            {submitting ? 'Saving…' : 'Add Employee'}
          </button>
          <button type="button" className="button button--ghost" onClick={() => navigate('/employees')}>
            View Employee List
          </button>
        </div>
      </form>
    </section>
  )
}
