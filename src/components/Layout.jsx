//Frontend/src/components/Layout.jsx

import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Layout = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid var(--gray-200)' }}>
        <h1><i className="fas fa-store"></i> Gestão de Pedidos</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span><i className="fas fa-user"></i> {user?.name}</span>
          <button onClick={handleLogout} className="btn-logout">
            <i className="fas fa-sign-out-alt"></i> Sair
          </button>
        </div>
      </header>

      <nav className="navbar">
        <Link to="/" className="nav-link">
          <i className="fas fa-chart-line icon"></i>
          <span>Dashboard</span>
        </Link>
        <Link to="/orders" className="nav-link">
          <i className="fas fa-shopping-cart icon"></i>
          <span>Pedidos</span>
        </Link>
        <Link to="/categories" className="nav-link">
          <i className="fas fa-tags icon"></i>
          <span>Categorias</span>
        </Link>
        <Link to="/clients" className="nav-link">
          <i className="fas fa-users icon"></i>
          <span>Clientes</span>
        </Link>
        <Link to="/sellers" className="nav-link">
          <i className="fas fa-user-tie icon"></i>
          <span>Vendedores</span>
        </Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout