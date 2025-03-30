//Frontend/src/services/sellerService.js

const STORAGE_KEY = 'sellers'

export const getSellers = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

export const getSellerById = (id) => {
  const sellers = getSellers()
  return sellers.find(seller => seller.id === id)
}

export const saveSeller = (seller) => {
  const sellers = getSellers()
  
  if (seller.id) {
    // Update existing seller
    const index = sellers.findIndex(s => s.id === seller.id)
    if (index !== -1) {
      sellers[index] = seller
    }
  } else {
    // Add new seller
    seller.id = Date.now().toString()
    sellers.push(seller)
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sellers))
  return seller
}

export const deleteSeller = (id) => {
  const sellers = getSellers().filter(seller => seller.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sellers))
}