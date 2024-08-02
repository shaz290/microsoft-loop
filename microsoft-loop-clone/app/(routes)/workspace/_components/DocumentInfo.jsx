"use client"
import CoverPicker from '@/app/_components/CoverPicker'
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { db } from '@/config/firebaseConfig';
import EmojiPicker from 'emoji-picker-react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { SmilePlus } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const DocumentInfo = ({ params }) => {

    const [coverImage, setCoverImage] = useState('/abstract.png');
    const [emoji, setEmoji] = useState();
    const [documentInfo, setDocumentInfo] = useState();

    useEffect(() => {
        params && GetDocumentInfo();
    }, [params])


    // USE TO GET DOC DETAIL
    const GetDocumentInfo = async () => {
        const docRef = doc(db, 'workspaceDocuments', params?.documentid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setDocumentInfo(docSnap.data());
            setEmoji(docSnap.data()?.emoji)
            docSnap.data()?.coverImage && setCoverImage(docSnap.data()?.coverImage)
        }
    }

    const updateDocumentInfo = async (key, value) => {
        const docRef = doc(db, 'workspaceDocuments', params?.documentid)
        await updateDoc(docRef, {
            [key]: value
        })
        toast("Document Updated!")
    }

    return (
        <div>
            {/* Cover */}
            <CoverPicker setNewCover={(cover) => {
                setCoverImage(cover);
                updateDocumentInfo('coverImage', cover)
            }}>
                <div className='relative group cursor-pointer'>
                    <h2 className='hidden absolute p-4 w-full h-full items-center justify-center 
                    group-hover:flex
                    '>
                        Change Cover</h2>
                    <div className='group-hover:opacity-40'>
                        <Image src={coverImage}
                            width={400} height={400}
                            className='w-full h-[200px] object-cover rounded-t-2xl'
                        />
                    </div>
                </div>
            </CoverPicker>

            {/* EmojiPicker */}
            <div className='absolute ml-10 mt-[-40px] cursor-pointer'>

                <EmojiPickerComponent setEmojiIcon={(emoji) => {
                    setEmoji(emoji);
                    updateDocumentInfo('emoji', emoji);
                }}>
                    <div className='bg-[#ffffffb0] p-4 rounded-md'>
                        {emoji ? <span className='text-5xl'>
                            {emoji}
                        </span> :
                            <SmilePlus className='h-10 w-10 text-gray' />}
                    </div>
                </EmojiPickerComponent>
            </div>
            {/* FileName */}

            <div className='mt-10 p-10'>
                <input type="text"
                    placeholder='Untitled Document'
                    defaultValue={documentInfo?.documentName}
                    className='font-bold text-4xl outline-none'
                    onBlur={(event) => updateDocumentInfo('documentName', event.target.value)}
                />
            </div>

        </div>
    )
}

export default DocumentInfo