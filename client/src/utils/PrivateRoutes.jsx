import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Layout } from 'layouts'
import useAuth from 'context/AuthContext'

const PrivateRoutes = () => {
  const { isLoggedIn, isLoading, setIsLoading } = useAuth()
  let pageRedirect
  if (isLoggedIn !== false || isLoading) {
    pageRedirect = (
      <Layout>
        <Outlet />
      </Layout>
    )
  } else {
    pageRedirect = <Navigate to="/login" />
  }
  setIsLoading(false)

  return <>{pageRedirect}</>
}

export default PrivateRoutes
