import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Layout } from 'layouts'
import useAuth from 'context/AuthContext'

const PrivateRoutes = () => {
  const { isLoggedIn, token } = useAuth()

  return isLoggedIn || token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateRoutes
