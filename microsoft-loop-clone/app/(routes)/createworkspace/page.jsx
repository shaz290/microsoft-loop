"use client"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { SmilePlus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import CoverPicker from "@/app/_components/CoverPicker"

const CreateWorkspace = () => {

    const [coverImage, setCoverImage] = useState('/cover.png');
    const [workSpaceName, setWorkSpaceName] = useState();

    return (
        <div className='p-10 md:px-36 lg:px-52 xl:px-96 py-28'>
            <div className="shadow-2xl rounded-xl">
                {/*Cover Image*/}
                <CoverPicker setNewCover={(v) => setCoverImage(v)}>
                    <div className='relative group cursor-pointer'>
                        <h2 className='hidden absolute p-4 w-full h-full items-center justify-center 
                    group-hover:flex
                    '>
                            Change Cover</h2>
                        <div className='group-hover:opacity-40'>
                            <Image src={coverImage}
                                width={400} height={400}
                                className='w-full h-[160px] object-cover rounded-t-2xl'
                            />
                        </div>
                    </div>
                </CoverPicker>

                {/* Input Section */}
                <div className='p-12'>
                    <h2 className='font-medium text-xl'>Create a new workspace</h2>
                    <h2 className='text-sm mt-2'>This is shared space where you can collaborate with you team,
                        You can always rename it later.
                    </h2>
                    <div className='mt-8 flex gap-2 items-center'>
                        <Button variant="outline">
                            <SmilePlus />
                        </Button>
                        <Input placeholder="Workspace Name"
                            onChange={(e) => setWorkSpaceName(e.target.value)} />
                    </div>
                    <div className="mt-7 flex gap-6 justify-end ">
                        <Button disabled={!workSpaceName?.length}>Create</Button>
                        <Button variant="outline">Cancel</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateWorkspace