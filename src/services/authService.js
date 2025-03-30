//Frontend/src/services/authService.js

export const register = async (userData) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const userExists = users.some(user => user.email === userData.email)
    
    if (userExists) {
      throw new Error('Email já cadastrado')
    }
    
    const newUser = {
      id: Date.now().toString(),
      ...userData
    }
    
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
  }
  
  export const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(user => user.email === email && user.password === password)
    
    if (!user) {
      throw new Error('Credenciais inválidas')
    }
    
    localStorage.setItem('token', 'dummy-token')
    localStorage.setItem('user', JSON.stringify(user))
    return user
  }