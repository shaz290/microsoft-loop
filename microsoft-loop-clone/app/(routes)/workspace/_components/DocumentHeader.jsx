import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'

const DocumentHeader = () => {
    return (
        <div className='flex justify-between items-center p-4 px-7 shadow-md shadow-yellow'>
            <div>            </div>

            <OrganizationSwitcher />
            <div className='flex gap-2'>
                <Button>Share</Button>
                <UserButton />
            </div>
        </div>
    )
}

export default DocumentHeader