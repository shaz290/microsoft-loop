import { Logo } from '@/app/_components/Logo'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-3
    shadow-sm '>
      <Logo/>
      <OrganizationSwitcher/>
      <UserButton/>
    </div>
  )
}

export default Header