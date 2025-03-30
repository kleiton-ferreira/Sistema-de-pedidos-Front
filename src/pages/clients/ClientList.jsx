//Frontend/src/pages/clients/ClientList.jsx

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getClients, deleteClient } from '../../services/clientService'

const ClientList = () => {
  const [clients, setClients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadClients = async () => {
      try {
        const clientsData = await getClients()
        setClients(clientsData)
      } catch (err) {
        setError('Falha ao carregar clientes')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadClients()
  }, [])

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        deleteClient(id)
        setClients(getClients())
      } catch (err) {
        setError('Falha ao excluir cliente')
        console.error(err)
      }
    }
  }

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.cpf && client.cpf.includes(searchTerm)) ||
    client.id.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="text-center py-8">Carregando...</div>
  if (error) return <div className="alert alert-error">{error}</div>

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <div className="card-header">
          <i className="fas fa-users icon"></i>
          <h2>Clientes</h2>
        </div>
        <Link to="/clients/new" className="btn btn-success">
          <i className="fas fa-plus"></i> <span className="sm-hidden">Novo</span> Cliente
        </Link>
      </div>
      
      <div className="card">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Pesquisar por nome, CPF, ID ou email..."
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
                <th>Nome</th>
                <th>CPF</th>
                <th>Email</th>
                <th className="hidden sm:table-cell">Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length > 0 ? (
                filteredClients.map(client => (
                  <tr key={client.id}>
                    <td>{client.id}</td>
                    <td>{client.name}</td>
                    <td>
                      {client.cpf ? client.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '-'}
                    </td>
                    <td>{client.email}</td>
                    <td className="hidden sm:table-cell">{client.phone || '-'}</td>
                    <td>
                      <div className="table-actions">
                        <Link 
                          to={`/clients/edit/${client.id}`} 
                          className="btn-icon warning"
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button 
                          onClick={() => handleDelete(client.id)} 
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
                  <td colSpan="6" className="text-center py-4">
                    Nenhum cliente encontrado
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

export default ClientList