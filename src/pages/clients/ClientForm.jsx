//frontend/src/pages/client/ClientForm.jsx

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getClientById, saveClient, getClients } from '../../services/clientService'

const ClientForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cpf: ''
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (id) {
      const existingClient = getClientById(id)
      if (existingClient) {
        setClient(existingClient)
      } else {
        navigate('/clients', { replace: true })
      }
    }
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    // Formatação automática do CPF
    if (name === 'cpf') {
      const numericValue = value.replace(/\D/g, '')
      setClient({
        ...client,
        [name]: numericValue.slice(0, 11)
      })
    } else {
      setClient({
        ...client,
        [name]: value
      })
    }
  }

  const validateForm = () => {
    if (!client.name.trim()) {
      setError('Nome é obrigatório')
      return false
    }
    if (!client.email.trim()) {
      setError('Email é obrigatório')
      return false
    }
    if (!client.cpf || client.cpf.length !== 11) {
      setError('CPF deve ter 11 dígitos')
      return false
    }

    // Verifica se CPF já existe (exceto para edição)
    const clients = getClients()
    const cpfExists = clients.some(c => c.cpf === client.cpf && c.id !== client.id)
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
      saveClient(client)
      navigate('/clients')
    } catch (err) {
      setError('Erro ao salvar cliente')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container">
      <div className="card-header">
        <i className="fas fa-users icon"></i>
        <h2>{id ? 'Editar Cliente' : 'Novo Cliente'}</h2>
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
                value={client.name}
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
                value={client.cpf}
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
                value={client.email}
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
                value={client.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-group mt-4">
            <label className="form-label">Endereço</label>
            <textarea
              name="address"
              className="form-control"
              value={client.address}
              onChange={handleChange}
              rows="3"
              style={{ minHeight: '100px', maxHeight: '200px', resize: 'vertical' }}
            />
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
              onClick={() => navigate('/clients')}
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

export default ClientForm