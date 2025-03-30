//frontend/src/pages/orders/OrderForm.jsx

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOrderById, saveOrder } from '../../services/orderService'
import { getClients } from '../../services/clientService'
import { getCategories } from '../../services/categoryService'
import { getSellers } from '../../services/sellerService'

const OrderForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState({
    clientId: '',
    categoryId: '',
    sellerId: '',
    amount: 0,
    description: ''
  })
  const [clients, setClients] = useState([])
  const [categories, setCategories] = useState([])
  const [sellers, setSellers] = useState([])

  useEffect(() => {
    setClients(getClients())
    setCategories(getCategories())
    setSellers(getSellers())
    
    if (id) {
      const existingOrder = getOrderById(id)
      if (existingOrder) {
        setOrder(existingOrder)
      }
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setOrder({
      ...order,
      [name]: name === 'amount' ? parseFloat(value) : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    saveOrder(order)
    navigate('/orders')
  }

  return (
    <div>
      <div className="card-header">
        <i className="fas fa-shopping-cart icon"></i>
        <h2>{id ? 'Editar Pedido' : 'Novo Pedido'}</h2>
      </div>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Cliente</label>
            <select
              name="clientId"
              className="form-control"
              value={order.clientId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um cliente</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Categoria</label>
            <select
              name="categoryId"
              className="form-control"
              value={order.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma categoria</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Vendedor</label>
            <select
              name="sellerId"
              className="form-control"
              value={order.sellerId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um vendedor</option>
              {sellers.map(seller => (
                <option key={seller.id} value={seller.id}>{seller.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Valor</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              value={order.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              name="description"
              className="form-control"
              value={order.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-success">
              <i className="fas fa-save"></i> Salvar
            </button>
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => navigate('/orders')}
            >
              <i className="fas fa-times"></i> Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrderForm