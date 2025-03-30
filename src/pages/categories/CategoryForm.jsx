//frontend/src/pages/categories/CategoryForm.jsx

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCategoryById, saveCategory } from '../../services/categoryService'

const CategoryForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    if (id) {
      const existingCategory = getCategoryById(id)
      if (existingCategory) {
        setCategory(existingCategory)
      }
    }
  }, [id])

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    saveCategory(category)
    navigate('/categories')
  }

  return (
    <div>
      <div className="card-header">
        <i className="fas fa-tags icon"></i>
        <h2>{id ? 'Editar Categoria' : 'Nova Categoria'}</h2>
      </div>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={category.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              name="description"
              className="form-control"
              value={category.description}
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
              onClick={() => navigate('/categories')}
            >
              <i className="fas fa-times"></i> Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoryForm