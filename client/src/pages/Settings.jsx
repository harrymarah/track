import React from 'react'
import LogoutBtn from 'components/LogoutBtn'
import ApiTestBtn from 'components/ApiTestBtn'
import { PageHead } from 'layouts'

const Settings = () => {
  return (
    <>
      <PageHead heading={'Settings'} />
      <LogoutBtn />
      <ApiTestBtn />
    </>
  )
}

export default Settings
