//Frontend/src/pages/orders/OrderList.jsx

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOrders, deleteOrder } from '../../services/orderService'
import { getClients } from '../../services/clientService'
import { getCategories } from '../../services/categoryService'
import { getSellers } from '../../services/sellerService'

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [clients, setClients] = useState([])
  const [categories, setCategories] = useState([])
  const [sellers, setSellers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const ordersData = getOrders()
        setOrders(ordersData)
        setClients(getClients())
        setCategories(getCategories())
        setSellers(getSellers())
      } catch (err) {
        setError('Falha ao carregar pedidos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      try {
        deleteOrder(id)
        setOrders(getOrders())
      } catch (err) {
        setError('Falha ao excluir pedido')
        console.error(err)
      }
    }
  }

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId)
    return client ? client.name : 'Desconhecido'
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.name : 'Desconhecida'
  }

  const getSellerName = (sellerId) => {
    const seller = sellers.find(s => s.id === sellerId)
    return seller ? seller.name : 'Desconhecido'
  }

  const filteredOrders = orders.filter(order => 
    getClientName(order.clientId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.includes(searchTerm) ||
    getCategoryName(order.categoryId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.description && order.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    order.amount?.toString().includes(searchTerm) ||
    getSellerName(order.sellerId).toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="text-center py-8">Carregando...</div>
  if (error) return <div className="alert alert-error">{error}</div>

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <div className="card-header">
          <i className="fas fa-shopping-cart icon"></i>
          <h2>Pedidos</h2>
        </div>
        <Link to="/orders/new" className="btn btn-success">
          <i className="fas fa-plus"></i> <span className="sm-hidden">Novo</span> Pedido
        </Link>
      </div>
      
      <div className="card">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Pesquisar por cliente, ID, categoria, descrição, valor ou vendedor..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Vendedor</th>
                <th>Valor</th>
                <th className="hidden sm:table-cell">Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td className="font-mono text-sm">{order.id.slice(0, 6)}...</td>
                    <td>{getClientName(order.clientId)}</td>
                    <td>{getCategoryName(order.categoryId)}</td>
                    <td className="text-sm">{order.description || '-'}</td>
                    <td>{getSellerName(order.sellerId)}</td>
                    <td>R$ {order.amount?.toFixed(2).replace('.', ',')}</td>
                    <td className="hidden sm:table-cell">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td>
                      <div className="table-actions">
                        <Link 
                          to={`/orders/edit/${order.id}`} 
                          className="btn-icon warning"
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button 
                          onClick={() => handleDelete(order.id)} 
                          className="btn-icon danger"
                          title="Excluir"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Nenhum pedido encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrderList