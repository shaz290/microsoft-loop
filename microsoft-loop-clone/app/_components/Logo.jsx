import Image from 'next/image'
import React from 'react'

export const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
        <Image src={'/logo.svg'}
        alt='logo'
        width={30} height={30}/>
        <h2 className='font-bold text-xl'>Loop</h2>
    </div>
  )
}
