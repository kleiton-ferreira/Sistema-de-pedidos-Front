//Frontend/src/services/clientService.js

const STORAGE_KEY = 'clients'

export const getClients = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

export const getClientById = (id) => {
  const clients = getClients()
  return clients.find(client => client.id === id)
}

export const saveClient = (client) => {
  const clients = getClients()
  
  if (client.id) {
    // Update existing client
    const index = clients.findIndex(c => c.id === client.id)
    if (index !== -1) {
      clients[index] = client
    }
  } else {
    // Add new client
    client.id = Date.now().toString()
    clients.push(client)
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
  return client
}

export const deleteClient = (id) => {
  const clients = getClients().filter(client => client.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
}