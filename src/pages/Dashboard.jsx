//frontend/src/pages/dashboard

import { useEffect, useState } from 'react'
import { 
  getCategories, 
  getClients, 
  getOrders, 
  getSellers 
} from '../services'

const Dashboard = () => {
  const [stats, setStats] = useState({
    categories: 0,
    clients: 0,
    orders: 0,
    sellers: 0
  })

  useEffect(() => {
    const categories = getCategories().length
    const clients = getClients().length
    const orders = getOrders().length
    const sellers = getSellers().length
    
    setStats({ categories, clients, orders, sellers })
  }, [])

  return (
    <div className="dashboard-container">
      <div className="card">
        <div className="card-header">
          <i className="fas fa-chart-line icon"></i>
          <h2>Dashboard</h2>
        </div>
        
        <div className="grid-container">
          <div className="stat-card">
            <i className="fas fa-shopping-cart stat-icon"></i>
            <h3>Pedidos</h3>
            <p className="stat-value">{stats.orders}</p>
          </div>

          <div className="stat-card">
            <i className="fas fa-tags stat-icon"></i>
            <h3>Categorias</h3>
            <p className="stat-value">{stats.categories}</p>
          </div>
          
          <div className="stat-card">
            <i className="fas fa-users stat-icon"></i>
            <h3>Clientes</h3>
            <p className="stat-value">{stats.clients}</p>
          </div>
          
          <div className="stat-card">
            <i className="fas fa-user-tie stat-icon"></i>
            <h3>Vendedores</h3>
            <p className="stat-value">{stats.sellers}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard