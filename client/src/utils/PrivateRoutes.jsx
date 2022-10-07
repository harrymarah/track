import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const PrivateRoutes = () => {
  const auth = useContext(AuthContext)

  return auth.isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
