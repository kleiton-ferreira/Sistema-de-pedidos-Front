//Frontend/src/services/categoryService.js

const STORAGE_KEY = 'categories'

export const getCategories = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

export const getCategoryById = (id) => {
  const categories = getCategories()
  return categories.find(category => category.id === id)
}

export const saveCategory = (category) => {
  const categories = getCategories()
  
  if (category.id) {
    // Update existing category
    const index = categories.findIndex(c => c.id === category.id)
    if (index !== -1) {
      categories[index] = category
    }
  } else {
    // Add new category
    category.id = Date.now().toString()
    categories.push(category)
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
  return category
}

export const deleteCategory = (id) => {
  const categories = getCategories().filter(category => category.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
}