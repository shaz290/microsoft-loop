"use client"
import React, { useEffect } from 'react'
import SideNav from '../../_components/SideNav'

const Workspacedocument = ({ params }) => {

    // useEffect(() => {
    //     console.log(params)
    // }, [params])

    return (
        <div>
            {/* Side Nav */}
            <div className=''>
                <SideNav params={params} />

            </div>
            {/* Document */}
            <div className='md:ml-72'>
                Document
            </div>
        </div>
    )
}

export default Workspacedocument