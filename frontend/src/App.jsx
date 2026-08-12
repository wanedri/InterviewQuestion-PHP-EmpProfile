import { NavLink, Route, Routes } from 'react-router-dom'
import EmployeeFormPage from './pages/EmployeeFormPage.jsx'
import EmployeeListPage from './pages/EmployeeListPage.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <span className="app-brand">Employee Profiles</span>
          <nav className="app-nav">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Add Employee
            </NavLink>
            <NavLink to="/employees" className={({ isActive }) => (isActive ? 'active' : '')}>
              Employee List
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<EmployeeFormPage />} />
          <Route path="/employees" element={<EmployeeListPage />} />
        </Routes>
      </main>
    </div>
  )
}
