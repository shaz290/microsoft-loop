"use client"
import { Logo } from '@/app/_components/Logo'
import { db } from '@/config/firebaseConfig'
import { OrganizationSwitcher, useAuth, UserButton, useUser } from '@clerk/nextjs'
import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'

const Header = () => {
  const { orgId } = useAuth();
  console.log(orgId);
  const { user } = useUser();

  useEffect(() => {
    user && saveUserData();
  }, [user])

  // Save UserData

  const saveUserData = async () => {
    const docID = user?.primaryEmailAddress?.emailAddress;
    try {
      await setDoc(doc(db, 'LoppUsers', docID), {
        name: user?.firstName,
        avatar: user?.imageUrl,
        email: user?.primaryEmailAddress?.emailAddress
      })
    } catch (e) {

    }
  }
  return (
    <div className='flex justify-between items-center p-3
    shadow-sm '>
      <Logo />
      <OrganizationSwitcher
        afterLeaveOrganizationUrl={'/dashboard'}
        afterCreateOrganizationUrl={'/dashboard'} />
      <UserButton />
    </div>
  )
}

export default Header