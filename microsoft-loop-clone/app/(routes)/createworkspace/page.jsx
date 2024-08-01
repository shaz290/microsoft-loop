"use client"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Loader2Icon, SmilePlus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import CoverPicker from "@/app/_components/CoverPicker"
import EmojiPicker from "emoji-picker-react"
import EmojiPickerComponent from "@/app/_components/EmojiPickerComponent"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/config/firebaseConfig"
import { useAuth, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const CreateWorkspace = () => {

    const [coverImage, setCoverImage] = useState('/cover.png');
    const [workSpaceName, setWorkSpaceName] = useState();
    const [emoji, setEmoji] = useState();
    const { user } = useUser();
    const { orgId } = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Used to Create new workspace and save in DB


    const OnCreateWorkSpace = async () => {
        setLoading(true);
        const docId = Date.now();

        const result = await setDoc(doc(db, 'Workspace', docId.toString()), {
            workSpaceName: workSpaceName,
            emoji: emoji,
            coverImage: coverImage,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            id: docId,
            orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress
        });
        setLoading(false);
        router.replace('/workspace/' + docId);
    }

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
                        <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
                            <Button variant="outline">
                                {emoji ? emoji :
                                    <SmilePlus />}
                            </Button>
                        </EmojiPickerComponent>

                        <Input placeholder="Workspace Name"
                            onChange={(e) => setWorkSpaceName(e.target.value)} />
                    </div>
                    <div className="mt-7 flex gap-6 justify-end ">
                        <Button disabled={!workSpaceName?.length || loading}
                            onClick={OnCreateWorkSpace}
                        >Create{loading && <Loader2Icon className='animate-spin ml=2' />}
                        </Button>
                        <Button variant="outline">Cancel</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateWorkspace