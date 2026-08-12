import { apiFetch } from './client.js'

export function fetchEmployees() {
  return apiFetch('/employees').then((body) => body.data)
}

export function fetchEmployeeOptions() {
  return apiFetch('/employee-options')
}

export function createEmployee(payload) {
  return apiFetch('/employees', {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then((body) => body.data)
}
