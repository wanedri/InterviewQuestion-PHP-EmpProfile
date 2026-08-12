import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchEmployees } from '../api/employees.js'

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchEmployees()
      .then((data) => {
        setEmployees(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') {
    return <p className="loading-text">Loading employees…</p>
  }

  if (status === 'error') {
    return <p className="alert alert--error">Unable to load employees. Please try again later.</p>
  }

  return (
    <section className="card">
      <div className="card__header">
        <div>
          <h1>Employee Profiles</h1>
          <p className="card__subtitle">
            {employees.length} employee{employees.length === 1 ? '' : 's'} on record.
          </p>
        </div>
        <Link to="/" className="button">
          Add Employee
        </Link>
      </div>

      {employees.length === 0 ? (
        <p className="empty-state">No employees yet. Add your first employee to get started.</p>
      ) : (
        <div className="table-scroll">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Marital Status</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Nationality</th>
                <th>Date of Birth</th>
                <th>Hire Date</th>
                <th>Department</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td data-label="Name">{employee.name}</td>
                  <td data-label="Gender">{employee.gender}</td>
                  <td data-label="Marital Status">{employee.marital_status}</td>
                  <td data-label="Phone">{employee.phone}</td>
                  <td data-label="Email">{employee.email}</td>
                  <td data-label="Nationality">{employee.nationality}</td>
                  <td data-label="Date of Birth">{formatDate(employee.date_of_birth)}</td>
                  <td data-label="Hire Date">{formatDate(employee.hire_date)}</td>
                  <td data-label="Department">{employee.department}</td>
                  <td data-label="Address">{employee.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
