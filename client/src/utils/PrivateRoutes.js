import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../context/AuthContext'

const PrivateRoutes = () => {
  const { isLoggedIn, token } = useAuth()

  return isLoggedIn || token ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
