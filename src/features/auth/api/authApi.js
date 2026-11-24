import { apiRequest } from '../../../helpers/apiHelper'

export const login = ({ username, password }) =>
  apiRequest('/api/auth/login', { method: 'POST', body: { username, password } })

export const register = ({ username, email, password }) =>
  apiRequest('/api/auth/register', { method: 'POST', body: { username, email, password } })

export const logout = () => apiRequest('/api/auth/logout', { method: 'POST' })

export const getProfile = () => apiRequest('/api/auth/profile')
