//Frontend/src/pages/categories/CatogoryList

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories, deleteCategory } from '../../services/categoryService'

const CategoryList = () => {
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setCategories(getCategories())
  }, [])

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      deleteCategory(id)
      setCategories(getCategories())
    }
  }

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.id.includes(searchTerm) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <div className="card-header">
          <i className="fas fa-tags icon"></i>
          <h2>Categorias</h2>
        </div>
        <Link to="/categories/new" className="btn btn-success">
          <i className="fas fa-plus"></i> <span className="sm-hidden">Nova</span> Categoria
        </Link>
      </div>
      
      <div className="card">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Pesquisar por nome, ID ou descrição..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table className="table category-list-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <div className="table-actions">
                      <Link 
                        to={`/categories/edit/${category.id}`} 
                        className="btn-icon warning"
                        title="Editar"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button 
                        onClick={() => handleDelete(category.id)} 
                        className="btn-icon danger"
                        title="Excluir"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CategoryList