import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Header from './_components/Header'
import WorkSpaceList from './_components/WorkSpaceList'

const Dashboard = () => {
  return (
    <div>
      <Header />
      <WorkSpaceList />
    </div>
  )
}

export default Dashboard