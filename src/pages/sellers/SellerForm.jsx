//frontend/src/pages/sellers/SellerForm.jsx

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSellerById, saveSeller, getSellers } from '../../services/sellerService'

const SellerForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [seller, setSeller] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: ''
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (id) {
      const existingSeller = getSellerById(id)
      if (existingSeller) {
        setSeller(existingSeller)
      } else {
        navigate('/sellers', { replace: true })
      }
    }
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    // Formatação automática do CPF
    if (name === 'cpf') {
      const numericValue = value.replace(/\D/g, '')
      setSeller({
        ...seller,
        [name]: numericValue.slice(0, 11)
      })
    } else {
      setSeller({
        ...seller,
        [name]: value
      })
    }
  }

  const validateForm = () => {
    if (!seller.name.trim()) {
      setError('Nome é obrigatório')
      return false
    }
    if (!seller.email.trim()) {
      setError('Email é obrigatório')
      return false
    }
    if (!seller.cpf || seller.cpf.length !== 11) {
      setError('CPF deve ter 11 dígitos')
      return false
    }

    // Verifica se CPF já existe (exceto para edição)
    const sellers = getSellers()
    const cpfExists = sellers.some(s => s.cpf === seller.cpf && s.id !== seller.id)
    if (cpfExists) {
      setError('CPF já cadastrado')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    try {
      saveSeller(seller)
      navigate('/sellers')
    } catch (err) {
      setError('Erro ao salvar vendedor')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container">
      <div className="card-header">
        <i className="fas fa-user-tie icon"></i>
        <h2>{id ? 'Editar Vendedor' : 'Novo Vendedor'}</h2>
      </div>
      
      <div className="card">
        {error && (
          <div className="alert alert-error mb-4">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Nome *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={seller.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">CPF *</label>
              <input
                type="text"
                name="cpf"
                className="form-control"
                value={seller.cpf}
                onChange={handleChange}
                maxLength="14"
                placeholder="Somente números"
                required
              />
              <small className="text-gray-500">Formatado automaticamente</small>
            </div>
            
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={seller.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Telefone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={seller.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-actions mt-6">
            <button 
              type="submit" 
              className="btn btn-success"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Salvando...
                </>
              ) : (
                <>
                  <i className="fas fa-save mr-2"></i>
                  Salvar
                </>
              )}
            </button>
            
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => navigate('/sellers')}
              disabled={isSubmitting}
            >
              <i className="fas fa-times mr-2"></i>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SellerForm