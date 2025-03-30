//Frontend/src/services/orderService.js

const STORAGE_KEY = 'orders'

export const getOrders = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

export const getOrderById = (id) => {
  const orders = getOrders()
  return orders.find(order => order.id === id)
}

export const saveOrder = (order) => {
  const orders = getOrders()
  
  if (order.id) {
    // Update existing order
    const index = orders.findIndex(o => o.id === order.id)
    if (index !== -1) {
      orders[index] = order
    }
  } else {
    // Add new order
    order.id = Date.now().toString()
    order.createdAt = new Date().toISOString()
    orders.push(order)
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  return order
}

export const deleteOrder = (id) => {
  const orders = getOrders().filter(order => order.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}