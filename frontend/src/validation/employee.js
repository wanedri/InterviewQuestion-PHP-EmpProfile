const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const emptyEmployee = {
  name: '',
  gender: '',
  marital_status: '',
  phone: '',
  email: '',
  address: '',
  date_of_birth: '',
  nationality: '',
  hire_date: '',
  department: '',
}

function yearsAgo(years) {
  const date = new Date()
  date.setFullYear(date.getFullYear() - years)
  return date
}

export function validateEmployee(values, options) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Name is required.'
  else if (values.name.length > 255) errors.name = 'Name must be 255 characters or fewer.'

  if (!values.gender) errors.gender = 'Gender is required.'
  else if (!options.genders.includes(values.gender)) errors.gender = 'Select a valid gender.'

  if (!values.marital_status) errors.marital_status = 'Marital status is required.'
  else if (!options.marital_statuses.includes(values.marital_status)) {
    errors.marital_status = 'Select a valid marital status.'
  }

  if (!values.phone.trim()) errors.phone = 'Phone number is required.'
  else if (!PHONE_REGEX.test(values.phone)) errors.phone = 'Enter a valid phone number.'

  if (!values.email.trim()) errors.email = 'Email is required.'
  else if (!EMAIL_REGEX.test(values.email)) errors.email = 'Enter a valid email address.'

  if (!values.address.trim()) errors.address = 'Address is required.'
  else if (values.address.length > 500) errors.address = 'Address must be 500 characters or fewer.'

  if (!values.date_of_birth) {
    errors.date_of_birth = 'Date of birth is required.'
  } else if (new Date(values.date_of_birth) > yearsAgo(16)) {
    errors.date_of_birth = 'Employee must be at least 16 years old.'
  }

  if (!values.nationality.trim()) errors.nationality = 'Nationality is required.'
  else if (values.nationality.length > 100) errors.nationality = 'Nationality must be 100 characters or fewer.'

  if (!values.hire_date) {
    errors.hire_date = 'Hire date is required.'
  } else if (values.date_of_birth && new Date(values.hire_date) <= new Date(values.date_of_birth)) {
    errors.hire_date = 'Hire date must be after the date of birth.'
  }

  if (!values.department) errors.department = 'Department is required.'
  else if (!options.departments.includes(values.department)) errors.department = 'Select a valid department.'

  return errors
}
